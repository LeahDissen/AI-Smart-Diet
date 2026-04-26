/**
 * Attack / fuzz tests for generateRecipeAction Zod validation layer.
 *
 * Run without a test framework:
 *   npx tsx tests/recipeAction.attack.ts
 *
 * No "use server" side-effects are triggered because we exercise the exported
 * async function as a plain async call. The "use server" directive is a
 * compile-time Next.js annotation — it does not alter runtime behaviour when
 * the module is imported outside the Next.js edge/server runtime.
 */

import { generateRecipeAction } from "@/services/recipeAction";

// ─── tiny test harness ────────────────────────────────────────────────────────

type Case = {
  label: string;
  input: unknown;
  expectSuccess: boolean;
  expectErrorContaining?: string;
};

let passed = 0;
let failed = 0;

async function run(cases: Case[]) {
  const width = Math.max(...cases.map((c) => c.label.length)) + 2;

  for (const tc of cases) {
    // We deliberately cast to `any` here so we can pass illegal shapes to
    // the action and let Zod catch them, mirroring a real attacker who sends
    // arbitrary JSON to the server endpoint.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await generateRecipeAction(tc.input as any);

    const successMatch = result.success === tc.expectSuccess;
    const errorMatch = tc.expectErrorContaining
      ? (result.error ?? "").toLowerCase().includes(tc.expectErrorContaining.toLowerCase())
      : true;
    const ok = successMatch && errorMatch;

    const icon = ok ? "✅ PASS" : "❌ FAIL";
    const label = tc.label.padEnd(width);
    console.log(`${icon}  ${label}  →  success=${result.success}  |  error="${result.error ?? "—"}"`);

    if (ok) passed++;
    else {
      failed++;
      if (!successMatch)
        console.log(`       Expected success=${tc.expectSuccess}, got success=${result.success}`);
      if (!errorMatch)
        console.log(`       Expected error to contain "${tc.expectErrorContaining}", got "${result.error}"`);
    }
  }

  console.log(`\n── Result: ${passed} passed, ${failed} failed ──`);
  if (failed > 0) process.exit(1);
}

// ─── attack cases ─────────────────────────────────────────────────────────────

const cases: Case[] = [
  // ── 1. Empty ingredient array ──────────────────────────────────────────────
  {
    label: "empty ingredients array",
    input: { ingredients: [], preferences: [] },
    expectSuccess: false,
    expectErrorContaining: "at least one ingredient",
  },

  // ── 2. Ingredients field missing entirely ──────────────────────────────────
  {
    label: "missing ingredients field",
    input: { preferences: ["vegan"] },
    expectSuccess: false,
    expectErrorContaining: "at least one ingredient",
  },

  // ── 3. Non-existent / typo'd dietary preference ────────────────────────────
  {
    label: "unknown preference 'keto'",
    input: { ingredients: ["chicken"], preferences: ["keto"] },
    expectSuccess: false,
    expectErrorContaining: "invalid",
  },

  // ── 4. Multiple unknown preferences ───────────────────────────────────────
  {
    label: "multiple unknown preferences",
    input: { ingredients: ["tofu"], preferences: ["rawFood", "carnivore", "VEGAN"] },
    expectSuccess: false,
    expectErrorContaining: "invalid",
  },

  // ── 5. Blank string inside ingredient array ────────────────────────────────
  {
    label: "blank ingredient string",
    input: { ingredients: ["   ", "onion"], preferences: [] },
    expectSuccess: false,
    expectErrorContaining: "blank",
  },

  // ── 6. Ingredient string exceeding 80-char limit ───────────────────────────
  {
    label: "ingredient > 80 chars",
    input: { ingredients: ["a".repeat(81)], preferences: [] },
    expectSuccess: false,
    expectErrorContaining: "too long",
  },

  // ── 7. Ingredient list exceeding 30-item limit ────────────────────────────
  {
    label: "31 ingredients (over limit)",
    input: {
      ingredients: Array.from({ length: 31 }, (_, i) => `ingredient-${i + 1}`),
      preferences: [],
    },
    expectSuccess: false,
    expectErrorContaining: "30",
  },

  // ── 8. Null payload ────────────────────────────────────────────────────────
  {
    label: "null payload",
    input: null,
    expectSuccess: false,
  },

  // ── 9. Completely wrong types (number array) ───────────────────────────────
  {
    label: "ingredients as numbers",
    input: { ingredients: [1, 2, 3], preferences: [] },
    expectSuccess: false,
  },

  // ── 10. Preference as uppercase (case-sensitive enum) ─────────────────────
  {
    label: "preference wrong case ('Vegan')",
    input: { ingredients: ["lentils"], preferences: ["Vegan"] },
    expectSuccess: false,
    expectErrorContaining: "invalid",
  },

  // ── 11. XSS attempt in ingredient string ─────────────────────────────────
  //   The server action does not render HTML, so this is a data-layer test.
  //   Zod should accept the string (length < 80, non-blank) — the recipe
  //   engine should return success without executing any script.
  {
    label: "XSS payload in ingredient",
    input: { ingredients: ['<script>alert("xss")</script>'], preferences: [] },
    expectSuccess: true, // Zod passes it; sanitisation is the UI's responsibility
  },

  // ── 12. SQL-injection-style string ───────────────────────────────────────
  //   Same principle: validated as a plain string, no DB query involved.
  {
    label: "SQL injection string",
    input: { ingredients: ["'; DROP TABLE recipes; --"], preferences: [] },
    expectSuccess: true,
  },

  // ── 13. Happy path — valid vegan input ────────────────────────────────────
  {
    label: "valid vegan input (happy path)",
    input: { ingredients: ["lentils", "coconut milk", "sweet potato"], preferences: ["vegan"] },
    expectSuccess: true,
  },

  // ── 14. Happy path — no preferences ──────────────────────────────────────
  {
    label: "valid input, no preferences",
    input: { ingredients: ["salmon", "quinoa", "asparagus"], preferences: [] },
    expectSuccess: true,
  },

  // ── 15. Preferences omitted entirely (relies on .default([])) ────────────
  {
    label: "preferences field omitted",
    input: { ingredients: ["tomato", "onion"] },
    expectSuccess: true,
  },
];

console.log("══════════════════════════════════════════════════════════");
console.log("  SmartPlate — generateRecipeAction  Attack Test Suite");
console.log("══════════════════════════════════════════════════════════\n");

await run(cases);
