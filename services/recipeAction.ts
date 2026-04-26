"use server";

import { z } from "zod";
import { seedRecipes } from "@/lib/seed-recipes";
import type { DietaryCompatibility, Recipe, RecipeResult } from "@/types/recipe";

// ---------------------------------------------------------------------------
// 1. Validation schema
// ---------------------------------------------------------------------------

/**
 * Exact set of dietary preference IDs used by the SmartPlate UI
 * (app/page.tsx → dietaryOptions[].id). Must stay in sync with that list.
 */
const DIETARY_PREF_KEYS = [
  "vegan",
  "glutenFree",
  "dairyFree",
  "nutFree",
  "pescatarian",
  "highProtein",
  "heartHealthy",
  "lowCarb",
] as const satisfies readonly (keyof DietaryCompatibility)[];

type DietaryPrefKey = (typeof DIETARY_PREF_KEYS)[number];

/**
 * Minimum compatibility score (0–1) a recipe must meet for each selected
 * preference before it is considered a valid candidate.
 */
const COMPATIBILITY_THRESHOLD = 0.8;

const GenerateRecipeSchema = z.object({
  /** At least one ingredient is required; each item is trimmed and size-capped. */
  ingredients: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Ingredient name cannot be blank.")
        .max(80, "Ingredient name is too long (max 80 characters)."),
    )
    .min(1, "Add at least one ingredient before generating a recipe.")
    .max(30, "Too many ingredients — keep the list under 30 items."),

  /** Preferences are optional; each value must be a known dietary option ID. */
  preferences: z
    .array(z.enum(DIETARY_PREF_KEYS))
    .max(DIETARY_PREF_KEYS.length)
    .default([]),
});

export type GenerateRecipeInput = z.infer<typeof GenerateRecipeSchema>;

// ---------------------------------------------------------------------------
// 2. Scoring helpers
// ---------------------------------------------------------------------------

/**
 * Returns true when a recipe meets the compatibility threshold for every
 * selected preference. A recipe with no preferences selected always passes.
 */
function isCompatible(recipe: Recipe, prefs: DietaryPrefKey[]): boolean {
  return prefs.every(
    (pref) => recipe.dietaryCompatibility[pref] >= COMPATIBILITY_THRESHOLD,
  );
}

/**
 * Composite score — higher is better:
 *  - 60 % weight: fraction of the user's ingredients found in the recipe
 *  - 40 % weight: average dietary compatibility across selected preferences
 *
 * Both components are normalised to [0, 1] before weighting so that a recipe
 * with zero ingredient matches cannot win purely on dietary score, and vice versa.
 */
function scoreRecipe(recipe: Recipe, normalisedIngredients: string[], prefs: DietaryPrefKey[]): number {
  const recipeText = recipe.ingredients.join(" ").toLowerCase();

  const ingredientScore =
    normalisedIngredients.length > 0
      ? normalisedIngredients.filter((ing) => recipeText.includes(ing)).length /
        normalisedIngredients.length
      : 0;

  const compatibilityScore =
    prefs.length > 0
      ? prefs.reduce((sum, pref) => sum + recipe.dietaryCompatibility[pref], 0) / prefs.length
      : 1; // No preferences = full marks for this component

  return 0.6 * ingredientScore + 0.4 * compatibilityScore;
}

// ---------------------------------------------------------------------------
// 3. Server Action
// ---------------------------------------------------------------------------

/**
 * generateRecipeAction — Next.js Server Action (`"use server"`).
 *
 * Flow:
 *  1. Validate raw input with Zod → return structured error on failure.
 *  2. Filter seed recipes to those that are compatible with all selected prefs.
 *  3. Score each candidate with a weighted ingredient + compatibility formula.
 *  4. Return the highest-scoring recipe, or a graceful fallback error.
 *
 * Drop-in for a real AI call: replace step 2–3 with an OpenAI / Gemini call
 * and keep the validated `ingredients` and `preferences` as the prompt payload.
 */
export async function generateRecipeAction(
  rawInput: GenerateRecipeInput,
): Promise<RecipeResult> {
  // Step 1 — Validate
  const parsed = GenerateRecipeSchema.safeParse(rawInput);

  if (!parsed.success) {
    const message = parsed.error.issues.map((issue) => issue.message).join(" · ");
    return { success: false, error: message };
  }

  const { ingredients, preferences } = parsed.data;

  try {
    const normalisedIngredients = ingredients.map((i) => i.toLowerCase());

    // Step 2 — Filter to compatible candidates; fall back to all recipes if none qualify.
    const candidates = seedRecipes.filter((r) => isCompatible(r, preferences));
    const pool = candidates.length > 0 ? candidates : seedRecipes;

    // Step 3 — Rank by composite score.
    const best: Recipe | undefined = pool
      .map((recipe) => ({
        recipe,
        score: scoreRecipe(recipe, normalisedIngredients, preferences),
      }))
      .sort((a, b) => b.score - a.score)[0]?.recipe;

    // Step 4 — Return result.
    if (!best) {
      return {
        success: false,
        error: "No matching recipe found. Try adding more ingredients.",
      };
    }

    return { success: true, recipe: best };
  } catch (err) {
    console.error("[generateRecipeAction]", err);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}