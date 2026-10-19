export const specialMeals = [
  { code: 'BBML', name: 'Baby Meal', category: 'Baby, Infant & Child', description: 'For infants 12 months and younger. Includes three portions of baby food, approximately 80–110g each.' },
  { code: 'CHMLI', name: 'Child Meal for Infant', category: 'Baby, Infant & Child', description: 'For infants under two. More substantial than BBML, with soft food and lighter sauces.' },
  { code: 'CHML', name: 'Child Meal', category: 'Baby, Infant & Child', description: 'For children aged two to 12, featuring a Western-style main course.' },
  { code: 'CHMLA', name: 'Child Meal Asian', category: 'Baby, Infant & Child', description: 'For children aged two to 12, featuring an Asian-style main course.' },
  { code: 'CHMLV', name: 'Child Meal Vegetarian', category: 'Baby, Infant & Child', description: 'For children aged two to 12, featuring a vegetarian main course.' },
  { code: 'HNML', name: 'Hindu Non-Vegetarian Meal', category: 'Religious', description: 'May contain lamb, poultry, fish, or dairy. Excludes beef, veal, pork, smoked fish, and raw fish.' },
  { code: 'KSML', name: 'Kosher Meal', category: 'Religious', description: 'Prepared to Jewish religious specifications. Pre-packed, sealed, contains meat, and requires 56 hours notice.' },
  { code: 'MOML', name: 'Muslim Meal', category: 'Religious', description: 'Prepared without pork, lard, pig by-products, or alcohol. Departures from Singapore use a Halal-certified kitchen.' },
  { code: 'AVML', name: 'Vegetarian Indian Meal', category: 'Vegetarian', description: 'Indian-style and usually spicy. Excludes meat, seafood, and egg, but may include dairy.' },
  { code: 'VJML', name: 'Vegetarian Jain Meal', category: 'Vegetarian', description: 'Excludes animal products, onions, garlic, ginger, mushrooms, and root vegetables.' },
  { code: 'VOML', name: 'Vegetarian Oriental Meal', category: 'Vegetarian', description: 'Asian-style meal without meat, seafood, egg, or dairy.' },
  { code: 'VGML', name: 'Vegetarian Vegan Meal', category: 'Vegetarian', description: 'Western-style meal without meat, seafood, egg, or dairy.' },
  { code: 'VLML', name: 'Vegetarian Lacto-Ovo Meal', category: 'Vegetarian', description: 'Western-style vegetarian meal that may include eggs and dairy but excludes meat and seafood.' },
  { code: 'BLML', name: 'Bland Meal', category: 'Dietary', description: 'Excludes gastric irritants such as black pepper, chilli powder, cocoa, and alcohol.' },
  { code: 'DBML', name: 'Diabetic Meal', category: 'Dietary', description: 'Prepared without sugar. Salt is allowed only in restricted quantities.' },
  { code: 'FPML', name: 'Fruit Platter', category: 'Dietary', description: 'Contains only fresh fruits.' },
  { code: 'GFML', name: 'Gluten Intolerant Meal', category: 'Dietary', description: 'Excludes wheat, rye, barley, and bran in every form.' },
  { code: 'LFML', name: 'Low Fat Meal', category: 'Dietary', description: 'Excludes animal fats, fatty and fried foods, and foods naturally high in cholesterol.' },
  { code: 'NLML', name: 'Low Lactose Meal', category: 'Dietary', description: 'Excludes milk, milk solids, casein, cheese, cream, butter, lactose, and margarine.' },
  { code: 'LSML', name: 'Low Salt Meal', category: 'Dietary', description: 'Eliminates or restricts salt, naturally salted foods, processed foods, baking powder, soda, and MSG.' },
  { code: 'MAMLA', name: 'Minimal Allergen Meal', category: 'Dietary', description: 'Excludes gluten, egg, dairy, crustaceans, fish, soy, peanuts, tree nuts, and their derivatives.' },
  { code: 'NFMLA', name: 'Non-Strict Nut Free Meal', category: 'Dietary', description: 'Requires advance preparation and excludes peanuts, tree nuts, and their derivatives.' },
  { code: 'NSFML', name: 'Non Seafood Meal', category: 'Dietary', description: 'Contains no fish or shellfish ingredients, but may contain traces from shared kitchens.' },
  { code: 'SFML', name: 'Seafood Meal', category: 'Dietary', description: 'Contains only seafood, including fish.' },
]

export const specialMealFacts = [
  { id: 'standard-notice', prompt: 'How early should most special meals be selected?', answer: 'At least 24 hours before departure', choices: ['At least 12 hours before departure', 'At least 24 hours before departure', 'At least 32 hours before departure', 'At least 56 hours before departure'] },
  { id: 'extended-notice', prompt: 'Which group requires at least 56 hours notice?', answer: 'Bengaluru, Mumbai, Kolkata, and Delhi departures', choices: ['Bengaluru, Mumbai, Kolkata, and Delhi departures', 'Bangkok, Hanoi, and Manila departures', 'London, Paris, and Rome departures', 'All flights departing Singapore'] },
  { id: 'kosher-notice', prompt: 'How early must a Kosher Meal be requested?', answer: 'At least 56 hours before departure', choices: ['At least 12 hours before departure', 'At least 24 hours before departure', 'At least 32 hours before departure', 'At least 56 hours before departure'] },
  { id: 'child-range', prompt: 'Who is eligible for CHML, CHMLA, and CHMLV?', answer: 'Children aged two to 12', choices: ['Infants up to 12 months', 'Children under two', 'Children aged two to 12', 'Passengers of any age'] },
  { id: 'child-exclusion', prompt: 'What do all child meals exclude?', answer: 'Pork, pig by-products, ham, and bacon', choices: ['All dairy products', 'All seafood products', 'Pork, pig by-products, ham, and bacon', 'Wheat, rye, barley, and bran'] },
  { id: 'allergy-guarantee', prompt: 'What does Singapore Airlines say about allergen-free meals?', answer: 'An allergen-free environment cannot be guaranteed', choices: ['Every special meal is completely allergen-free', 'Only nut-free meals are guaranteed', 'An allergen-free environment cannot be guaranteed', 'All allergens are removed on Singapore departures'] },
  { id: 'minimal-availability', prompt: 'Where is MAMLA available?', answer: 'All Singapore departures and selected arrivals', choices: ['Every flight worldwide', 'Only flights within Asia', 'All Singapore departures and selected arrivals', 'Only flights arriving in Singapore'] },
]

export const specialMealSource = 'https://www.singaporeair.com/en_UK/sg/flying-withus/dining/specialmeals/'
