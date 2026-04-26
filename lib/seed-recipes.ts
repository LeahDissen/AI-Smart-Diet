import type { Recipe } from "@/types/recipe";

/**
 * Realistic seed dataset – 10 nutritionally diverse recipes for testing the
 * SmartPlate AI engine. Edge cases covered:
 *  - Very high / very low calorie density
 *  - Very short (5 min) and very long (75 min) total cook time
 *  - Recipes with fractional compatibility scores (substitution required)
 *  - High-fibre / high-saturated-fat extremes
 *  - Multi-cuisine spread
 */
export const seedRecipes: Recipe[] = [
  // ─── 1 ───────────────────────────────────────────────────────────────────
  {
    id: "recipe-001",
    title: "Lentil, Sweet Potato & Coconut Curry",
    description:
      "A deeply spiced, plant-powered red-lentil curry simmered in creamy coconut milk with sweet potato chunks. High in complex carbohydrates and plant protein, ideal for post-workout recovery on a vegan plan.",
    ingredients: [
      "200 g red lentils, rinsed",
      "400 g sweet potato (≈1 large), peeled & cubed",
      "400 ml full-fat coconut milk",
      "400 ml vegetable broth",
      "1 medium white onion, finely diced",
      "4 garlic cloves, minced",
      "2 tsp fresh ginger, grated",
      "2 tbsp red curry paste",
      "1 tsp ground turmeric",
      "1 tsp ground cumin",
      "1 tbsp coconut oil",
      "100 g baby spinach",
      "Juice of 1 lime",
      "Salt & black pepper to taste",
      "Fresh coriander & steamed basmati rice to serve",
    ],
    instructions: [
      "Heat coconut oil in a large heavy-bottomed saucepan over medium-high heat. Add diced onion and cook for 5–6 minutes until soft and translucent.",
      "Stir in garlic, ginger, red curry paste, turmeric, and cumin. Cook for 90 seconds, stirring constantly, until the paste is fragrant and beginning to caramelise.",
      "Add sweet potato cubes and toss to coat in the spiced paste. Cook for 2 minutes.",
      "Pour in the rinsed lentils, coconut milk, and vegetable broth. Stir well to combine. Bring to a rolling boil.",
      "Reduce heat to low, cover partially, and simmer for 22–25 minutes, stirring every 5 minutes, until lentils have broken down and sweet potato is fork-tender.",
      "Remove from heat. Stir in baby spinach and lime juice until spinach wilts into the curry.",
      "Season generously with salt and black pepper. Adjust curry paste if more heat is desired.",
      "Serve over steamed basmati rice, garnished with fresh coriander and an extra lime wedge.",
    ],
    metadata: {
      prepTime: 15,
      cookTime: 30,
      servings: 4,
      calories: 480,
      macros: {
        protein: 18,
        carbs: 62,
        fat: 17,
        fiber: 14,
        sugar: 10,
        sodium: 540,
      },
      difficulty: "easy",
      cuisine: "South-East Asian Fusion",
    },
    dietaryCompatibility: {
      vegan: 1.0,
      glutenFree: 1.0,
      dairyFree: 1.0,
      nutFree: 0.6, // Coconut is classified as a tree nut by some allergy bodies
      pescatarian: 1.0,
      highProtein: 0.5,
      heartHealthy: 0.9,
      lowCarb: 0.2,
    },
    tags: ["vegan", "gluten-free", "meal-prep", "winter-warmer", "high-fibre", "budget-friendly"],
  },

  // ─── 2 ───────────────────────────────────────────────────────────────────
  {
    id: "recipe-002",
    title: "Pan-Seared Salmon with Lemon Quinoa & Roasted Asparagus",
    description:
      "Omega-3-rich salmon fillets seared to crispy-skin perfection, paired with protein-dense quinoa dressed in lemon zest and served alongside caramelised asparagus. A restaurant-quality plate in under 35 minutes.",
    ingredients: [
      "4 × 180 g salmon fillets, skin-on",
      "200 g tri-colour quinoa, rinsed",
      "400 ml water",
      "450 g asparagus, woody ends trimmed",
      "2 tbsp extra-virgin olive oil (divided)",
      "Zest and juice of 1 large lemon",
      "3 garlic cloves, thinly sliced",
      "1 tsp smoked paprika",
      "1 tbsp capers, roughly chopped",
      "20 g fresh flat-leaf parsley, chopped",
      "Sea salt & cracked black pepper",
    ],
    instructions: [
      "Preheat oven to 220 °C (200 °C fan). Toss asparagus on a baking sheet with 1 tbsp olive oil, salt, pepper, and sliced garlic. Roast 12–14 minutes until tender and lightly charred at the tips.",
      "Meanwhile, bring 400 ml water to the boil in a small saucepan. Add quinoa and a pinch of salt. Reduce to a simmer, cover, and cook 13 minutes. Remove from heat and let steam, covered, for 5 minutes. Fluff with a fork.",
      "Pat salmon fillets dry with kitchen paper. Season skin-side generously with smoked paprika, salt, and pepper.",
      "Heat remaining 1 tbsp olive oil in a non-stick skillet over high heat until shimmering. Place salmon skin-side down. Press gently with a spatula for 20 seconds to prevent curling.",
      "Cook undisturbed 4–5 minutes until the skin is crispy and the flesh turns opaque two-thirds up the fillet. Flip and cook a further 1–2 minutes for medium (pink centre) or 3 minutes for fully cooked.",
      "Fold lemon zest, lemon juice, capers, and parsley through the warm quinoa. Taste and season.",
      "Plate quinoa, lean asparagus against it, and top with a salmon fillet, skin-side up to preserve crunch. Serve immediately.",
    ],
    metadata: {
      prepTime: 10,
      cookTime: 25,
      servings: 4,
      calories: 545,
      macros: {
        protein: 46,
        carbs: 34,
        fat: 22,
        fiber: 5,
        sugar: 3,
        sodium: 380,
      },
      difficulty: "medium",
      cuisine: "Mediterranean",
    },
    dietaryCompatibility: {
      vegan: 0.0,
      glutenFree: 1.0,
      dairyFree: 1.0,
      nutFree: 1.0,
      pescatarian: 1.0,
      highProtein: 1.0,
      heartHealthy: 1.0,
      lowCarb: 0.6,
    },
    tags: ["pescatarian", "omega-3", "high-protein", "gluten-free", "meal-prep"],
  },

  // ─── 3 ───────────────────────────────────────────────────────────────────
  {
    id: "recipe-003",
    title: "Spicy Chicken & Veggie Stir-Fry with Cauliflower Rice",
    description:
      "A lightning-fast, macro-friendly stir-fry that swaps regular rice for riced cauliflower, cutting carbs without sacrificing satisfaction. Lean chicken breast, bell peppers, snap peas, and a fiery tamari-ginger glaze deliver 42 g of protein per plate.",
    ingredients: [
      "600 g chicken breast, cut into 2 cm strips",
      "1 large head cauliflower, riced (≈700 g florets pulsed in food processor)",
      "2 red bell peppers, thinly sliced",
      "150 g snap peas",
      "1 medium courgette, half-moon sliced",
      "3 tbsp tamari (gluten-free soy sauce)",
      "1 tbsp rice vinegar",
      "1 tbsp sesame oil",
      "1 tbsp neutral oil (avocado or sunflower)",
      "4 garlic cloves, minced",
      "1 tbsp fresh ginger, grated",
      "1 tsp chilli flakes (or to taste)",
      "1 tsp cornflour dissolved in 2 tbsp cold water",
      "2 spring onions, sliced",
      "1 tsp toasted sesame seeds",
    ],
    instructions: [
      "Prepare cauliflower rice: pulse cauliflower florets in a food processor until they resemble coarse rice. Set aside.",
      "In a small bowl, whisk together tamari, rice vinegar, chilli flakes, and the cornflour slurry to form the stir-fry sauce.",
      "Heat neutral oil in a large wok or heavy skillet over maximum heat until just smoking. Add chicken strips in a single layer. Cook undisturbed for 90 seconds, then toss. Stir-fry 3–4 minutes total until golden and cooked through. Remove to a plate.",
      "Return wok to high heat. Add sesame oil, then garlic and ginger. Stir-fry 30 seconds.",
      "Add bell peppers, snap peas, and courgette. Stir-fry 3–4 minutes, keeping vegetables crisp-tender.",
      "Return chicken to the wok. Pour in the sauce and toss everything together. Cook 1–2 minutes until sauce thickens and coats all ingredients.",
      "Meanwhile, sauté cauliflower rice in a separate pan with a little neutral oil for 4–5 minutes, season with salt.",
      "Serve stir-fry over cauliflower rice, garnished with spring onions and toasted sesame seeds.",
    ],
    metadata: {
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      calories: 390,
      macros: {
        protein: 42,
        carbs: 18,
        fat: 14,
        fiber: 6,
        sugar: 7,
        sodium: 810,
      },
      difficulty: "medium",
      cuisine: "Asian-American",
    },
    dietaryCompatibility: {
      vegan: 0.0,
      glutenFree: 0.9, // Tamari is GF; standard soy sauce is not
      dairyFree: 1.0,
      nutFree: 0.8, // Sesame seeds/oil are a top-9 allergen; adjust score
      pescatarian: 0.0,
      highProtein: 1.0,
      heartHealthy: 0.7,
      lowCarb: 0.9,
    },
    tags: ["high-protein", "low-carb", "meal-prep", "quick", "gluten-free-option", "dairy-free"],
  },

  // ─── 4 ───────────────────────────────────────────────────────────────────
  {
    id: "recipe-004",
    title: "Classic Shakshuka with Crumbled Feta & Za'atar Pita",
    description:
      "Eggs poached directly in a rich, slow-cooked tomato and pepper sauce perfumed with cumin, smoked paprika, and harissa. Finished with tangy feta and served with warm za'atar pita for scooping. A Middle-Eastern brunch cornerstone.",
    ingredients: [
      "6 large free-range eggs",
      "2 × 400 g tins crushed tomatoes",
      "2 red bell peppers, finely diced",
      "1 large yellow onion, finely diced",
      "4 garlic cloves, minced",
      "1 tbsp harissa paste",
      "1 tsp smoked paprika",
      "1 tsp ground cumin",
      "½ tsp cayenne (optional)",
      "2 tbsp olive oil",
      "100 g feta cheese, crumbled",
      "20 g fresh flat-leaf parsley, roughly chopped",
      "4 za'atar flatbreads (or pitta), warmed",
      "Salt & pepper to taste",
    ],
    instructions: [
      "Heat olive oil in a wide, deep sauté pan or cast-iron skillet over medium heat. Add onion and peppers. Cook 10–12 minutes, stirring regularly, until very soft and beginning to caramelise.",
      "Add garlic, smoked paprika, cumin, and cayenne. Cook for 1–2 minutes until fragrant.",
      "Stir in harissa paste and both tins of crushed tomatoes. Season with salt and pepper. Bring to a simmer.",
      "Reduce heat to medium-low and cook the sauce uncovered for 15–18 minutes, stirring occasionally, until thickened and deep red.",
      "Using a spoon, create 6 shallow wells in the sauce. Crack one egg into each well without breaking the yolks.",
      "Cover the pan tightly and cook 6–8 minutes for runny yolks, 10 minutes for fully set. Check every 2 minutes near the end.",
      "Remove from heat. Scatter crumbled feta and fresh parsley over the top.",
      "Serve straight from the pan with warm za'atar flatbreads and extra harissa on the side.",
    ],
    metadata: {
      prepTime: 10,
      cookTime: 40,
      servings: 3,
      calories: 420,
      macros: {
        protein: 24,
        carbs: 38,
        fat: 19,
        fiber: 8,
        sugar: 14,
        sodium: 920,
      },
      difficulty: "easy",
      cuisine: "Middle Eastern",
    },
    dietaryCompatibility: {
      vegan: 0.0,
      glutenFree: 0.8, // Skip pita or use GF flatbread
      dairyFree: 0.1, // Feta is central; skip reduces appeal significantly
      nutFree: 1.0,
      pescatarian: 1.0,
      highProtein: 0.6,
      heartHealthy: 0.7,
      lowCarb: 0.6,
    },
    tags: ["vegetarian", "brunch", "middle-eastern", "high-fibre", "gluten-free-option"],
  },

  // ─── 5 ───────────────────────────────────────────────────────────────────
  {
    id: "recipe-005",
    title: "Vegan Black Bean & Mango Tacos with Avocado Crema",
    description:
      "Street-food-inspired tacos piled with smoky black beans, charred corn, jewel-bright mango salsa, and a silky 3-ingredient avocado crema. Uses corn tortillas for a naturally gluten-free base. Vibrant, fast, and crowd-pleasing.",
    ingredients: [
      "2 × 400 g tins black beans, drained & rinsed",
      "1 ripe mango, finely diced",
      "240 g frozen sweetcorn, thawed (or 2 fresh cobs, kernels cut off)",
      "1 red onion (½ for beans, ½ for salsa)",
      "2 ripe avocados",
      "Juice of 2 limes (divided)",
      "3 tbsp fresh coriander, chopped (divided)",
      "1 jalapeño, deseeded & minced",
      "1 tsp smoked paprika",
      "1 tsp ground cumin",
      "½ tsp garlic powder",
      "1 tbsp vegetable oil",
      "12 small corn tortillas",
      "Salt to taste",
      "Hot sauce to serve",
    ],
    instructions: [
      "Make the mango salsa: combine diced mango, ½ diced red onion, jalapeño, 1 tbsp coriander, juice of 1 lime, and a pinch of salt. Refrigerate until serving.",
      "Make the avocado crema: blend avocado flesh, juice of 1 lime, remaining coriander, and 2 tbsp water until completely smooth and silky. Season with salt.",
      "Heat oil in a large skillet over high heat. Add corn and cook undisturbed for 2–3 minutes until charred. Toss and char for 1 more minute. Transfer to a bowl.",
      "In the same skillet, cook remaining ½ red onion for 3 minutes. Add smoked paprika, cumin, and garlic powder; stir 30 seconds.",
      "Add drained black beans and 60 ml water. Mash roughly with the back of a spoon — mixture should be chunky, not mushy. Cook 3–4 minutes until heated through and beginning to dry out. Season with salt.",
      "Warm corn tortillas directly over a gas flame 20 seconds per side, or in a dry skillet until pliable and lightly toasted.",
      "Assemble: spread avocado crema on each tortilla, spoon on black beans, top with charred corn and mango salsa. Serve immediately with hot sauce.",
    ],
    metadata: {
      prepTime: 20,
      cookTime: 15,
      servings: 4,
      calories: 445,
      macros: {
        protein: 15,
        carbs: 65,
        fat: 16,
        fiber: 16,
        sugar: 12,
        sodium: 390,
      },
      difficulty: "easy",
      cuisine: "Mexican",
    },
    dietaryCompatibility: {
      vegan: 1.0,
      glutenFree: 0.9, // Corn tortillas are naturally GF; verify brand
      dairyFree: 1.0,
      nutFree: 1.0,
      pescatarian: 1.0,
      highProtein: 0.4,
      heartHealthy: 0.8,
      lowCarb: 0.2,
    },
    tags: ["vegan", "gluten-free", "street-food", "high-fibre", "quick", "dairy-free"],
  },

  // ─── 6 ───────────────────────────────────────────────────────────────────
  {
    id: "recipe-006",
    title: "Turkey & Zucchini Meatballs with Zoodles in Marinara",
    description:
      "Juicy, lean turkey meatballs laced with grated courgette to lock in moisture, served over spiralised zucchini noodles in a quick homemade marinara. Under 350 kcal with nearly 40 g protein — ideal for aggressive body-composition goals.",
    ingredients: [
      "500 g lean turkey mince (93 % lean)",
      "1 medium courgette, grated, excess moisture squeezed out (for meatballs)",
      "4 large courgettes, spiralised (for 'zoodles')",
      "1 egg",
      "40 g gluten-free breadcrumbs",
      "40 g Parmesan, finely grated (optional — omit for dairy-free)",
      "3 garlic cloves (1 for meatballs, 2 for sauce)",
      "1 tbsp fresh oregano, chopped (or 1 tsp dried)",
      "2 tbsp olive oil (divided)",
      "2 × 400 g tins chopped tomatoes",
      "1 tbsp tomato paste",
      "1 tsp dried basil",
      "Pinch of chilli flakes",
      "Salt & black pepper",
      "Fresh basil leaves to garnish",
    ],
    instructions: [
      "Combine turkey mince, grated courgette, egg, breadcrumbs, Parmesan (if using), 1 minced garlic clove, oregano, ½ tsp salt, and pepper in a large bowl. Mix just until combined — do not over-work or meatballs will be dense.",
      "Roll mixture into 20 equal balls (~25 g each). Place on a lined baking sheet and refrigerate 10 minutes to firm up.",
      "Preheat oven to 200 °C. Heat 1 tbsp olive oil in an oven-safe skillet over high heat. Sear meatballs in batches until golden on all sides (3–4 minutes). Transfer to oven and bake 12–14 minutes until cooked through (internal temp 74 °C).",
      "While meatballs bake, heat remaining olive oil in a saucepan over medium heat. Cook 2 minced garlic cloves 1 minute. Add tomato paste and cook 1 minute until deepened in colour.",
      "Add chopped tomatoes, dried basil, chilli flakes, salt, and pepper. Simmer 12–15 minutes until thickened.",
      "Pat spiralised zucchini dry with paper towels. Add to a hot non-stick skillet for 2–3 minutes to remove excess moisture and heat through — do not overcook or they become watery.",
      "Nestle meatballs into the marinara sauce. Serve over zoodles, garnished with fresh basil and extra Parmesan if desired.",
    ],
    metadata: {
      prepTime: 20,
      cookTime: 30,
      servings: 4,
      calories: 345,
      macros: {
        protein: 39,
        carbs: 16,
        fat: 13,
        fiber: 4,
        sugar: 9,
        sodium: 620,
      },
      difficulty: "medium",
      cuisine: "Italian-American",
    },
    dietaryCompatibility: {
      vegan: 0.0,
      glutenFree: 0.9, // Use certified GF breadcrumbs
      dairyFree: 0.7, // Parmesan is optional and easily skipped
      nutFree: 1.0,
      pescatarian: 0.0,
      highProtein: 1.0,
      heartHealthy: 0.8,
      lowCarb: 0.9,
    },
    tags: ["high-protein", "low-carb", "meal-prep", "gluten-free-option", "Italian"],
  },

  // ─── 7 ───────────────────────────────────────────────────────────────────
  {
    id: "recipe-007",
    title: "Overnight Chia Oat Pudding with Almond Butter & Banana",
    description:
      "Zero active cook time: oats and chia seeds soak overnight in oat milk, swelling into a thick, creamy pudding. Topped with almond butter, fresh banana, and a drizzle of raw honey. A high-fibre, plant-based breakfast that takes 5 minutes to prepare.",
    ingredients: [
      "80 g rolled oats (use certified GF oats if required)",
      "30 g chia seeds",
      "360 ml unsweetened oat milk (or almond / soy milk)",
      "1 tbsp maple syrup",
      "½ tsp vanilla extract",
      "Pinch of fine sea salt",
      "2 tbsp natural almond butter",
      "1 ripe banana, sliced",
      "1 tbsp raw honey or extra maple syrup",
      "1 tsp ground cinnamon",
      "20 g granola (optional topping for crunch)",
    ],
    instructions: [
      "In a large jar or bowl, combine rolled oats, chia seeds, oat milk, maple syrup, vanilla extract, and salt. Stir thoroughly to ensure chia seeds are fully dispersed and not clumping.",
      "Cover with a lid or cling film. Refrigerate for at least 6 hours, ideally overnight (up to 3 days ahead for meal prep).",
      "In the morning, stir the pudding vigorously — it should be thick and creamy. If too thick, loosen with a splash of oat milk.",
      "Divide into 2 bowls or jars. Top each with sliced banana arranged in a fan, and a dollop of almond butter.",
      "Drizzle with raw honey, dust with cinnamon, and scatter granola over the top if using.",
      "Serve cold straight from the fridge, or allow to come to room temperature for 10 minutes.",
    ],
    metadata: {
      prepTime: 5,
      cookTime: 0, // Overnight soak — no cooking
      servings: 2,
      calories: 510,
      macros: {
        protein: 16,
        carbs: 68,
        fat: 19,
        fiber: 13,
        sugar: 26,
        sodium: 140,
      },
      difficulty: "easy",
      cuisine: "Contemporary Health",
    },
    dietaryCompatibility: {
      vegan: 1.0,
      glutenFree: 0.8, // Requires certified GF oats
      dairyFree: 1.0,
      nutFree: 0.0, // Almond butter is a tree nut product
      pescatarian: 1.0,
      highProtein: 0.5,
      heartHealthy: 0.9,
      lowCarb: 0.2,
    },
    tags: ["vegan", "meal-prep", "no-cook", "breakfast", "high-fibre", "dairy-free"],
  },

  // ─── 8 ───────────────────────────────────────────────────────────────────
  {
    id: "recipe-008",
    title: "Thai Peanut Shrimp Bowl with Soba Noodles",
    description:
      "Plump seared shrimp tossed in a boldly flavoured peanut-coconut sauce and served over soba noodles with a rainbow of crunchy vegetables. High protein, vibrant, and ready in 25 minutes — an immediate crowd pleaser despite complex flavour layering.",
    ingredients: [
      "500 g raw king prawns, peeled & deveined",
      "200 g soba noodles (substitute rice noodles for GF)",
      "150 g red cabbage, thinly shredded",
      "2 medium carrots, julienned or grated",
      "1 cucumber, ribboned with a vegetable peeler",
      "3 spring onions, sliced",
      "For peanut sauce:",
      "  4 tbsp natural peanut butter",
      "  2 tbsp tamari",
      "  1 tbsp rice vinegar",
      "  1 tbsp sesame oil",
      "  1 tbsp honey or maple syrup",
      "  1 tsp sriracha (or to taste)",
      "  1 garlic clove, finely grated",
      "  1 tsp fresh ginger, grated",
      "  60 ml warm water (to thin)",
      "1 tbsp vegetable oil (for frying)",
      "Handful of roasted peanuts & fresh mint to garnish",
      "Lime wedges to serve",
    ],
    instructions: [
      "Whisk all peanut sauce ingredients in a small bowl until smooth. Add warm water gradually to reach a pourable but coating consistency. Set aside.",
      "Cook soba noodles according to package instructions (usually 4–5 minutes in boiling water). Drain and rinse under cold water to stop cooking and remove excess starch. Toss with a drizzle of sesame oil to prevent sticking.",
      "Pat prawns completely dry with paper towels. Season with salt and pepper.",
      "Heat vegetable oil in a large skillet or wok over high heat until shimmering. Add prawns in a single layer. Cook 1–2 minutes per side until pink, curled, and just cooked through. Do not overcrowd — cook in batches if needed.",
      "Remove pan from heat. Toss prawns with 3 tbsp of the peanut sauce.",
      "Assemble bowls: divide noodles between 4 bowls. Arrange red cabbage, carrots, and cucumber ribbons alongside.",
      "Top with peanut-glazed prawns, sliced spring onions, roasted peanuts, and fresh mint leaves.",
      "Drizzle additional peanut sauce over each bowl to taste. Serve with lime wedges for brightness.",
    ],
    metadata: {
      prepTime: 15,
      cookTime: 10,
      servings: 4,
      calories: 580,
      macros: {
        protein: 38,
        carbs: 58,
        fat: 20,
        fiber: 6,
        sugar: 12,
        sodium: 940,
      },
      difficulty: "medium",
      cuisine: "Thai",
    },
    dietaryCompatibility: {
      vegan: 0.0,
      glutenFree: 0.4, // Standard soba has wheat; rice noodles fix this
      dairyFree: 1.0,
      nutFree: 0.0, // Peanut butter is the base of the sauce
      pescatarian: 1.0,
      highProtein: 0.9,
      heartHealthy: 0.6,
      lowCarb: 0.3,
    },
    tags: ["pescatarian", "asian", "quick", "meal-prep", "dairy-free", "high-protein"],
  },

  // ─── 9 ───────────────────────────────────────────────────────────────────
  {
    id: "recipe-009",
    title: "Greek Lemon Herb Chicken Thighs with Tzatziki & Tabbouleh",
    description:
      "Bone-in chicken thighs marinated overnight in lemon, garlic, and Greek herbs, roasted until the skin shatters. Served alongside a bright bulgur tabbouleh and cool, garlicky tzatziki. A feast-level plate with 44 g protein that feels indulgent but is firmly macro-conscious.",
    ingredients: [
      "8 bone-in, skin-on chicken thighs",
      "Marinade: 4 tbsp olive oil, juice & zest of 2 lemons, 5 garlic cloves (minced), 2 tsp dried oregano, 1 tsp dried thyme, 1 tsp smoked paprika, salt & pepper",
      "For tzatziki:",
      "  300 g full-fat Greek yoghurt",
      "  1 cucumber, grated, squeezed dry",
      "  2 garlic cloves, finely grated",
      "  1 tbsp fresh dill, chopped",
      "  1 tbsp extra-virgin olive oil",
      "  Juice of ½ lemon, salt",
      "For tabbouleh:",
      "  100 g fine bulgur wheat, soaked in 200 ml boiling water 20 min",
      "  Large bunch flat-leaf parsley (≈80 g), finely chopped",
      "  20 g fresh mint, finely chopped",
      "  3 medium tomatoes, finely diced & drained",
      "  1 lemon (juice only)",
      "  3 tbsp extra-virgin olive oil",
      "  Salt & pepper",
    ],
    instructions: [
      "Combine all marinade ingredients. Score chicken thighs 2–3 times through the skin. Coat thoroughly in marinade, cover, and refrigerate minimum 4 hours or overnight.",
      "Prepare tzatziki: mix grated and squeezed cucumber with yoghurt, garlic, dill, olive oil, lemon juice, and salt. Refrigerate until serving (improves after 1 hour).",
      "Prepare tabbouleh: pour boiling water over bulgur, cover, and leave 20 minutes until absorbed and fluffy. Fluff with a fork and cool completely. Combine with parsley, mint, tomatoes, lemon juice, olive oil, salt, and pepper. Toss well and refrigerate.",
      "Remove chicken from fridge 30 minutes before cooking. Preheat oven to 220 °C (200 °C fan).",
      "Heat an oven-safe cast-iron pan over high heat with a film of oil. Sear chicken thighs skin-side down 4–5 minutes without moving until deeply golden and rendering. Flip once.",
      "Transfer pan to oven. Roast 22–25 minutes until skin is crispy and juices run clear (internal temp 74 °C). Rest 5 minutes before serving.",
      "Arrange tabbouleh on a large platter. Place chicken thighs on top or alongside. Serve tzatziki in a bowl with a drizzle of olive oil and a pinch of dried oregano.",
    ],
    metadata: {
      prepTime: 30,
      cookTime: 30,
      servings: 4,
      calories: 680,
      macros: {
        protein: 44,
        carbs: 28,
        fat: 42,
        fiber: 5,
        sugar: 6,
        sodium: 560,
      },
      difficulty: "hard",
      cuisine: "Greek",
    },
    dietaryCompatibility: {
      vegan: 0.0,
      glutenFree: 0.5, // Bulgur is wheat; substitute quinoa for GF
      dairyFree: 0.0, // Tzatziki is Greek-yoghurt based
      nutFree: 1.0,
      pescatarian: 0.0,
      highProtein: 1.0,
      heartHealthy: 0.7,
      lowCarb: 0.7,
    },
    tags: ["high-protein", "greek", "meal-prep", "oven-roasted", "complex-flavour"],
  },

  // ─── 10 ──────────────────────────────────────────────────────────────────
  {
    id: "recipe-010",
    title: "Loaded Veggie & Lentil Chili",
    description:
      "A deeply satisfying, fully plant-based chili that slow-simmers green and Puy lentils with three varieties of beans, fire-roasted tomatoes, and a bold chipotle-cocoa spice blend. Extraordinarily high in fibre and micronutrients, very low in fat, and exceptionally budget-friendly per serving.",
    ingredients: [
      "150 g dried Puy lentils, rinsed",
      "150 g dried green lentils, rinsed",
      "1 × 400 g tin kidney beans, drained & rinsed",
      "1 × 400 g tin black beans, drained & rinsed",
      "1 × 400 g tin pinto beans, drained & rinsed",
      "2 × 400 g tins fire-roasted chopped tomatoes",
      "500 ml vegetable broth",
      "2 medium white onions, diced",
      "3 red bell peppers, diced",
      "4 celery sticks, sliced",
      "5 garlic cloves, minced",
      "2 tbsp tomato paste",
      "1 chipotle chilli in adobo, minced (or 1 tsp chipotle powder)",
      "2 tsp ground cumin",
      "1 tsp smoked paprika",
      "1 tsp dried oregano",
      "½ tsp ground coriander",
      "1 tsp unsweetened cocoa powder (deepens umami)",
      "1 tbsp olive oil",
      "Salt & black pepper",
      "Toppings: diced avocado, pickled jalapeños, lime wedges, vegan sour cream",
    ],
    instructions: [
      "Heat olive oil in a large heavy-bottomed casserole pot over medium heat. Add onion, peppers, and celery. Cook 10–12 minutes, stirring regularly, until very soft.",
      "Add garlic, cumin, smoked paprika, oregano, coriander, and cocoa powder. Cook 2 minutes until fragrant.",
      "Stir in tomato paste and chipotle. Cook 1–2 minutes until paste darkens.",
      "Add rinsed lentils, fire-roasted tomatoes, and vegetable broth. Stir well. Bring to a boil.",
      "Reduce heat to low, cover partially, and simmer 30 minutes until lentils are tender but still holding shape. Stir every 10 minutes and add a splash of water if the chili thickens too quickly.",
      "Add all three tins of beans. Stir and simmer uncovered for a further 15 minutes to integrate flavours and reach your desired thickness.",
      "Taste and adjust: more chipotle for heat, cocoa for depth, salt and pepper for seasoning.",
      "Serve in deep bowls topped with diced avocado, pickled jalapeños, a squeeze of lime, and vegan sour cream if desired. Chili improves significantly over 24 hours in the fridge.",
    ],
    metadata: {
      prepTime: 20,
      cookTime: 55,
      servings: 6,
      calories: 385,
      macros: {
        protein: 24,
        carbs: 64,
        fat: 5,
        fiber: 22,
        sugar: 11,
        sodium: 480,
      },
      difficulty: "easy",
      cuisine: "Tex-Mex",
    },
    dietaryCompatibility: {
      vegan: 1.0,
      glutenFree: 1.0,
      dairyFree: 1.0,
      nutFree: 1.0,
      pescatarian: 1.0,
      highProtein: 0.6,
      heartHealthy: 1.0,
      lowCarb: 0.2,
    },
    tags: ["vegan", "gluten-free", "high-fibre", "budget-friendly", "meal-prep", "batch-cook", "dairy-free"],
  },
];

/** Helper: look up a single recipe by its id */
export function getRecipeById(id: string): Recipe | undefined {
  return seedRecipes.find((r) => r.id === id);
}

/** Helper: filter recipes that are fully compatible (score === 1.0) with a set of dietary prefs */
export function filterCompatibleRecipes(
  prefs: (keyof Recipe["dietaryCompatibility"])[],
  minScore = 1.0,
): Recipe[] {
  return seedRecipes.filter((recipe) =>
    prefs.every((pref) => recipe.dietaryCompatibility[pref] >= minScore),
  );
}
