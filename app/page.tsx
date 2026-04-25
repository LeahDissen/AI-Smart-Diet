"use client";

import { useMemo, useState } from "react";
import Hero from "@/components/Hero";
import {
  ChefHat,
  CircleSlash,
  Fish,
  Flame,
  HeartPulse,
  Leaf,
  Milk,
  Nut,
  Plus,
  Sparkles,
  Wheat,
  X,
  type LucideIcon,
} from "lucide-react";

interface DietaryOption {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
}

const dietaryOptions: DietaryOption[] = [
  { id: "vegan", label: "Vegan", hint: "Plant-based only", icon: Leaf },
  { id: "glutenFree", label: "Gluten-free", hint: "No wheat ingredients", icon: Wheat },
  { id: "dairyFree", label: "Dairy-free", hint: "No milk or cheese", icon: Milk },
  { id: "nutFree", label: "Nut-free", hint: "Avoid tree nuts", icon: Nut },
  { id: "pescatarian", label: "Pescatarian", hint: "Vegetarian + seafood", icon: Fish },
  { id: "highProtein", label: "High-protein", hint: "Lean and filling", icon: Flame },
  { id: "heartHealthy", label: "Heart-healthy", hint: "Lower sodium + fats", icon: HeartPulse },
  { id: "lowCarb", label: "Low-carb", hint: "Fewer refined carbs", icon: CircleSlash },
];

export default function Home() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [activePrefs, setActivePrefs] = useState<Record<string, boolean>>({});

  const selectedPreferences = useMemo(() => {
    return dietaryOptions.filter((option) => activePrefs[option.id]).map((option) => option.label);
  }, [activePrefs]);

  const addIngredient = () => {
    const newIngredients = ingredientInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .filter((item) => !ingredients.some((existing) => existing.toLowerCase() === item.toLowerCase()));

    if (newIngredients.length === 0) {
      return;
    }

    setIngredients((prev) => [...prev, ...newIngredients]);
    setIngredientInput("");
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients((prev) => prev.filter((item) => item !== ingredient));
  };

  const togglePreference = (id: string) => {
    setActivePrefs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,#dcfce7_0,#f7fee7_35%,#ecfdf5_100%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <main className="mx-auto w-full max-w-7xl space-y-6 lg:space-y-8">
        <Hero />

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <article className="rounded-3xl border border-emerald-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-emerald-950">Ingredients</h2>
                <p className="text-sm text-emerald-700">Add items as tags</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={ingredientInput}
                  onChange={(event) => setIngredientInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === ",") {
                      event.preventDefault();
                      addIngredient();
                    }
                  }}
                  placeholder="e.g. chickpeas, spinach, garlic"
                  className="h-12 w-full rounded-xl border border-emerald-200 bg-emerald-50/40 px-4 text-sm text-emerald-950 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                />
                <button
                  type="button"
                  onClick={addIngredient}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>

              <div className="mt-4 flex min-h-16 flex-wrap gap-2 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-3">
                {ingredients.length > 0 ? (
                  ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm font-medium text-emerald-800"
                    >
                      {ingredient}
                      <button
                        type="button"
                        aria-label={`Remove ${ingredient}`}
                        onClick={() => removeIngredient(ingredient)}
                        className="rounded-full p-0.5 text-emerald-500 transition hover:bg-emerald-100 hover:text-emerald-800"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-emerald-700/80">No ingredients yet. Add one or more items to begin.</p>
                )}
              </div>
            </article>

            <article className="rounded-3xl border border-emerald-200/80 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-4 text-xl font-semibold text-emerald-950">Dietary Preferences</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {dietaryOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = Boolean(activePrefs[option.id]);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => togglePreference(option.id)}
                      className={`rounded-2xl border p-3 text-left transition ${
                        isActive
                          ? "border-emerald-500 bg-emerald-100/70"
                          : "border-emerald-200 bg-emerald-50/40 hover:border-emerald-300"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${isActive ? "text-emerald-700" : "text-emerald-600"}`} />
                        <p className="text-sm font-semibold text-emerald-900">{option.label}</p>
                      </div>
                      <p className="text-xs text-emerald-700/90">{option.hint}</p>
                    </button>
                  );
                })}
              </div>
            </article>
          </div>

          <aside className="rounded-3xl border border-emerald-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-emerald-950">Generated Recipe</h2>
              <Sparkles className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-5">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700">Preview</p>
              <p className="text-sm text-emerald-900/90">Your AI recipe will appear here after generation.</p>

              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-emerald-800">Detected ingredients</p>
                  <p className="text-emerald-700/85">
                    {ingredients.length > 0 ? ingredients.join(", ") : "No ingredients selected"}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-emerald-800">Selected preferences</p>
                  <p className="text-emerald-700/85">
                    {selectedPreferences.length > 0 ? selectedPreferences.join(", ") : "No preferences selected"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                <ChefHat className="h-4 w-4" />
                Generate Recipe (Coming Soon)
              </button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
