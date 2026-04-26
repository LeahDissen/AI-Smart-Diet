/**
 * Pure Node.js (CJS) schema attack harness.
 * Run: node tests/recipeAction.attack.cjs
 *
 * Replicates the exact GenerateRecipeSchema from services/recipeAction.ts
 * without requiring tsx, path aliases, or the Next.js runtime.
 */

const { z } = require("zod");
const fs = require("fs");
const path = require("path");

// ── Exact schema replica from services/recipeAction.ts ─────────────────────
const DIETARY_PREF_KEYS = [
  "vegan",
  "glutenFree",
  "dairyFree",
  "nutFree",
  "pescatarian",
  "highProtein",
  "heartHealthy",
  "lowCarb",
];

const GenerateRecipeSchema = z.object({
  ingredients: z
    .array(
      z.string().trim()
        .min(1, "Ingredient name cannot be blank.")
        .max(80, "Ingredient name is too long (max 80 characters)."),
    )
    .min(1, "Add at least one ingredient before generating a recipe.")
    .max(30, "Too many ingredients — keep the list under 30 items."),
  preferences: z
    .array(z.enum(DIETARY_PREF_KEYS))
    .max(DIETARY_PREF_KEYS.length)
    .default([]),
});

// ── Attack cases ────────────────────────────────────────────────────────────
const cases = [
  // 1. Empty ingredient array
  {
    label: "1. empty ingredients []",
    input: { ingredients: [], preferences: [] },
    expectSuccess: false,
    expectErrorContaining: "at least one ingredient",
  },
  // 2. Missing ingredients field
  {
    label: "2. missing ingredients field",
    input: { preferences: ["vegan"] },
    expectSuccess: false,
    expectErrorContaining: "at least one ingredient",
  },
  // 3. Non-existent preference 'keto'
  {
    label: "3. unknown preference 'keto'",
    input: { ingredients: ["chicken"], preferences: ["keto"] },
    expectSuccess: false,
    expectErrorContaining: "invalid",
  },
  // 4. Multiple unknown preferences
  {
    label: "4. multiple unknown preferences",
    input: { ingredients: ["tofu"], preferences: ["rawFood", "carnivore", "VEGAN"] },
    expectSuccess: false,
    expectErrorContaining: "invalid",
  },
  // 5. Blank string inside array (becomes empty after trim + min(1))
  {
    label: "5. blank ingredient string '   '",
    input: { ingredients: ["   ", "onion"], preferences: [] },
    expectSuccess: false,
    expectErrorContaining: "blank",
  },
  // 6. Ingredient > 80 chars
  {
    label: "6. ingredient > 80 chars",
    input: { ingredients: ["a".repeat(81)], preferences: [] },
    expectSuccess: false,
    expectErrorContaining: "too long",
  },
  // 7. 31 ingredients (over 30 limit)
  {
    label: "7. 31 ingredients (over limit)",
    input: {
      ingredients: Array.from({ length: 31 }, (_, i) => `ingredient-${i + 1}`),
      preferences: [],
    },
    expectSuccess: false,
    expectErrorContaining: "30",
  },
  // 8. Null payload
  {
    label: "8. null payload",
    input: null,
    expectSuccess: false,
  },
  // 9. Numbers as ingredients
  {
    label: "9. ingredients as numbers [1,2,3]",
    input: { ingredients: [1, 2, 3], preferences: [] },
    expectSuccess: false,
  },
  // 10. Preference with wrong case 'Vegan' (enum is case-sensitive)
  {
    label: "10. preference wrong case 'Vegan'",
    input: { ingredients: ["lentils"], preferences: ["Vegan"] },
    expectSuccess: false,
    expectErrorContaining: "invalid",
  },
  // 11. XSS payload — Zod accepts it (plain string); UI must sanitise
  {
    label: "11. XSS in ingredient (should PASS schema)",
    input: { ingredients: ['<script>alert("xss")</script>'], preferences: [] },
    expectSuccess: true,
  },
  // 12. SQL-injection-style string — same: schema accepts, no DB query exists
  {
    label: "12. SQL injection string (should PASS schema)",
    input: { ingredients: ["'; DROP TABLE recipes; --"], preferences: [] },
    expectSuccess: true,
  },
  // 13. Happy path — valid vegan input
  {
    label: "13. valid vegan input (happy path)",
    input: { ingredients: ["lentils", "sweet potato"], preferences: ["vegan"] },
    expectSuccess: true,
  },
  // 14. Happy path — no preferences
  {
    label: "14. valid, no preferences",
    input: { ingredients: ["salmon", "quinoa"], preferences: [] },
    expectSuccess: true,
  },
  // 15. preferences field omitted (relies on .default([]))
  {
    label: "15. preferences field omitted",
    input: { ingredients: ["tomato", "onion"] },
    expectSuccess: true,
  },
];

// ── Runner ───────────────────────────────────────────────────────────────────
const LINE = "═".repeat(62);
const lines = [];
const log = (s) => { lines.push(s); process.stdout.write(s + "\n"); };

log(LINE);
log("  SmartPlate — GenerateRecipeSchema  Attack Test Suite");
log(LINE);
log("");

let passed = 0;
let failed = 0;

for (const tc of cases) {
  const result = GenerateRecipeSchema.safeParse(tc.input);

  // Collect error messages
  const errorText = !result.success
    ? result.error.issues.map((i) => i.message).join(" · ")
    : "";

  const successMatch = result.success === tc.expectSuccess;
  const errorMatch = tc.expectErrorContaining
    ? errorText.toLowerCase().includes(tc.expectErrorContaining.toLowerCase())
    : true;
  const ok = successMatch && errorMatch;

  const icon = ok ? "✅ PASS" : "❌ FAIL";
  const successLabel = `success=${result.success}`;
  const errLabel = errorText ? `  error → "${errorText}"` : "";

  log(`${icon}  ${tc.label}`);
  log(`       ${successLabel}${errLabel}`);

  if (!ok) {
    if (!successMatch)
      log(`       ⚠ Expected success=${tc.expectSuccess}`);
    if (!errorMatch)
      log(`       ⚠ Expected error to contain "${tc.expectErrorContaining}"`);
    failed++;
  } else {
    passed++;
  }
  log("");
}

log(LINE);
log(`  Result: ${passed} / ${cases.length} passed   ${failed > 0 ? `(${failed} FAILED)` : "✅ All passed"}`);
log(LINE);

// Write results to file so they're readable via the editor
const outPath = path.join(__dirname, "attack-results.txt");
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
process.stdout.write(`\nResults written to ${outPath}\n`);

if (failed > 0) process.exit(1);
