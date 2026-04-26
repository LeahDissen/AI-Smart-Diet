// ---------------------------------------------------------------------------
// Core recipe types used across the SmartPlate application.
// ---------------------------------------------------------------------------

export interface Macros {
  /** Grams of protein per serving */
  protein: number;
  /** Grams of total carbohydrates per serving */
  carbs: number;
  /** Grams of total fat per serving */
  fat: number;
  /** Grams of dietary fibre per serving */
  fiber: number;
  /** Grams of sugar per serving */
  sugar: number;
  /** Milligrams of sodium per serving */
  sodium: number;
}

export interface RecipeMetadata {
  /** Active preparation time in minutes */
  prepTime: number;
  /** Passive cooking / baking time in minutes */
  cookTime: number;
  /** Number of servings the recipe yields */
  servings: number;
  /** Kcal per serving */
  calories: number;
  /** Macronutrient breakdown per serving */
  macros: Macros;
  /** Subjective difficulty level */
  difficulty: "easy" | "medium" | "hard";
  /** Cuisine origin label */
  cuisine: string;
}

/**
 * Compatibility score between 0 and 1 for each dietary preference
 * exposed in the SmartPlate UI.
 *  1.0 = fully compatible
 *  0.5 = compatible with a simple substitution
 *  0.0 = incompatible
 */
export interface DietaryCompatibility {
  vegan: number;
  glutenFree: number;
  dairyFree: number;
  nutFree: number;
  pescatarian: number;
  highProtein: number;
  heartHealthy: number;
  lowCarb: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  /** Flat list of required ingredients with quantity strings */
  ingredients: string[];
  /** Ordered, numbered cooking steps */
  instructions: string[];
  metadata: RecipeMetadata;
  dietaryCompatibility: DietaryCompatibility;
  /** Free-form search / filter tags */
  tags: string[];
}

/** Structured result returned from the generateRecipe server action */
export interface RecipeResult {
  success: boolean;
  recipe?: Recipe;
  error?: string;
}
