/* ==========================================
   FUEL UP — Calorie & Macro Tracker
   Core Application Logic
   ========================================== */

(function () {
  'use strict';

  // ==========================================
  // Food Database (~150 items)
  // Each: { name, serving, cal, protein, carbs, fat }
  // Serving is descriptive, macros are per 1 serving
  // ==========================================
  const FOOD_DB = [
    // ---- Protein Sources ----
    { name: 'Chicken Breast', serving: '6 oz (170g)', cal: 280, protein: 53, carbs: 0, fat: 6, grams: 170 },
    { name: 'Chicken Thigh', serving: '6 oz (170g)', cal: 340, protein: 43, carbs: 0, fat: 18, grams: 170 },
    { name: 'Ground Turkey (93%)', serving: '6 oz (170g)', cal: 270, protein: 42, carbs: 0, fat: 10, grams: 170 },
    { name: 'Ground Beef (85/15)', serving: '6 oz (170g)', cal: 390, protein: 40, carbs: 0, fat: 24, grams: 170 },
    { name: 'Ground Beef (90/10)', serving: '6 oz (170g)', cal: 340, protein: 42, carbs: 0, fat: 18, grams: 170 },
    { name: 'Steak (Sirloin)', serving: '6 oz (170g)', cal: 310, protein: 48, carbs: 0, fat: 12, grams: 170 },
    { name: 'Steak (Ribeye)', serving: '6 oz (170g)', cal: 420, protein: 44, carbs: 0, fat: 26, grams: 170 },
    { name: 'Salmon Fillet', serving: '6 oz (170g)', cal: 350, protein: 40, carbs: 0, fat: 20, grams: 170 },
    { name: 'Tilapia', serving: '6 oz (170g)', cal: 220, protein: 45, carbs: 0, fat: 4, grams: 170 },
    { name: 'Shrimp (Cooked)', serving: '6 oz (170g)', cal: 170, protein: 36, carbs: 0, fat: 2, grams: 170, perPiece: 28, pieceName: 'shrimp' },
    { name: 'Oysters (Raw)', serving: '6 medium (120g)', cal: 100, protein: 11, carbs: 6, fat: 3, grams: 120, perPiece: 20, pieceName: 'oyster' },
    { name: 'Tuna (Canned)', serving: '1 can (142g)', cal: 180, protein: 40, carbs: 0, fat: 2, grams: 142 },
    { name: 'Cod Fillet', serving: '6 oz (170g)', cal: 140, protein: 30, carbs: 0, fat: 1, grams: 170 },
    { name: 'Trout', serving: '6 oz (170g)', cal: 250, protein: 35, carbs: 0, fat: 11, grams: 170 },
    { name: 'Lamb Chop', serving: '4 oz (113g)', cal: 230, protein: 28, carbs: 0, fat: 12, grams: 113 },
    { name: 'Duck Breast', serving: '4 oz (113g)', cal: 220, protein: 22, carbs: 0, fat: 15, grams: 113 },
    { name: 'Cornish Hen', serving: '½ bird (180g)', cal: 350, protein: 40, carbs: 0, fat: 20, grams: 180 },
    { name: 'Scallops (Cooked)', serving: '4 oz (113g)', cal: 120, protein: 23, carbs: 4, fat: 1, grams: 113, perPiece: 25, pieceName: 'scallop' },
    { name: 'Turkey Breast (Deli)', serving: '4 slices (112g)', cal: 120, protein: 22, carbs: 2, fat: 2, grams: 112, perPiece: 28, pieceName: 'slice' },
    { name: 'Bacon', serving: '3 slices (36g)', cal: 160, protein: 10, carbs: 0, fat: 13, grams: 36, perPiece: 12, pieceName: 'slice' },
    { name: 'Sausage Link', serving: '2 links (90g)', cal: 280, protein: 16, carbs: 2, fat: 22, grams: 90, perPiece: 45, pieceName: 'link' },
    { name: 'Lox (Smoked Salmon)', serving: '3 oz (85g)', cal: 99, protein: 15, carbs: 0, fat: 4, grams: 85 },
    { name: 'Pork Chop', serving: '6 oz (170g)', cal: 340, protein: 44, carbs: 0, fat: 16, grams: 170 },

    // ---- Eggs & Dairy ----
    { name: 'Whole Eggs', serving: '2 large', cal: 140, protein: 12, carbs: 1, fat: 10, grams: 100, perPiece: 50, pieceName: 'egg' },
    { name: 'Egg Whites', serving: '4 large', cal: 68, protein: 14, carbs: 1, fat: 0, grams: 132, perPiece: 33, pieceName: 'white' },
    { name: 'Greek Yogurt (Plain)', serving: '1 cup (227g)', cal: 130, protein: 22, carbs: 8, fat: 0, grams: 227 },
    { name: 'Greek Yogurt (Honey)', serving: '1 cup (227g)', cal: 200, protein: 20, carbs: 24, fat: 3, grams: 227 },
    { name: 'Cottage Cheese', serving: '1 cup (226g)', cal: 180, protein: 28, carbs: 6, fat: 5, grams: 226 },
    { name: 'Whole Milk', serving: '1 cup (244ml)', cal: 150, protein: 8, carbs: 12, fat: 8, grams: 244 },
    { name: 'Chocolate Milk', serving: '1 cup (244ml)', cal: 210, protein: 8, carbs: 30, fat: 8, grams: 244 },
    { name: 'Cheddar Cheese', serving: '1 oz (28g)', cal: 110, protein: 7, carbs: 1, fat: 9, grams: 28 },
    { name: 'Mozzarella Cheese', serving: '1 oz (28g)', cal: 85, protein: 6, carbs: 1, fat: 6, grams: 28 },
    { name: 'Feta Cheese', serving: '1 oz (28g)', cal: 75, protein: 4, carbs: 1, fat: 6, grams: 28 },
    { name: 'Parmesan (Grated)', serving: '2 tbsp (10g)', cal: 40, protein: 4, carbs: 0, fat: 3, grams: 10 },
    { name: 'String Cheese', serving: '1 stick (28g)', cal: 80, protein: 7, carbs: 1, fat: 5, grams: 28, perPiece: 28, pieceName: 'stick' },

    // ---- Plant-Based Proteins ----
    { name: 'Tofu (Firm)', serving: '½ cup (126g)', cal: 100, protein: 11, carbs: 3, fat: 5, grams: 126 },
    { name: 'Tempeh', serving: '3 oz (85g)', cal: 160, protein: 16, carbs: 8, fat: 9, grams: 85 },
    { name: 'Edamame (In Pod)', serving: '1 cup (155g)', cal: 188, protein: 18, carbs: 14, fat: 8, grams: 155 },

    // ---- Grains & Carbs ----
    { name: 'White Rice (Cooked)', serving: '1 cup (186g)', cal: 240, protein: 4, carbs: 53, fat: 0, grams: 186 },
    { name: 'Brown Rice (Cooked)', serving: '1 cup (195g)', cal: 220, protein: 5, carbs: 45, fat: 2, grams: 195 },
    { name: 'Quinoa (Cooked)', serving: '1 cup (185g)', cal: 220, protein: 8, carbs: 39, fat: 4, grams: 185 },
    { name: 'Pasta (Cooked)', serving: '1 cup (140g)', cal: 220, protein: 8, carbs: 43, fat: 1, grams: 140 },
    { name: 'Oatmeal (Dry)', serving: '½ cup (40g)', cal: 150, protein: 5, carbs: 27, fat: 3, grams: 40 },
    { name: 'Bread (White)', serving: '2 slices (56g)', cal: 160, protein: 5, carbs: 30, fat: 2, grams: 56, perPiece: 28, pieceName: 'slice' },
    { name: 'Bread (Whole Wheat)', serving: '2 slices (64g)', cal: 180, protein: 7, carbs: 32, fat: 3, grams: 64, perPiece: 32, pieceName: 'slice' },
    { name: 'Bagel', serving: '1 large (95g)', cal: 280, protein: 10, carbs: 54, fat: 2, grams: 95, perPiece: 95, pieceName: 'bagel' },
    { name: 'English Muffin', serving: '1 muffin (57g)', cal: 130, protein: 5, carbs: 25, fat: 1, grams: 57, perPiece: 57, pieceName: 'muffin' },
    { name: 'Tortilla (Flour)', serving: '1 large (50g)', cal: 150, protein: 4, carbs: 24, fat: 4, grams: 50, perPiece: 50, pieceName: 'tortilla' },

    // ---- Vegetables ----
    { name: 'Bok Choy', serving: '1 cup chopped (70g)', cal: 9, protein: 1, carbs: 2, fat: 0.1, grams: 70 },
    { name: 'Kale', serving: '1 cup chopped (67g)', cal: 33, protein: 2, carbs: 6, fat: 0.5, grams: 67 },
    { name: 'Broccoli', serving: '1 cup (91g)', cal: 30, protein: 3, carbs: 6, fat: 0, grams: 91 },
    { name: 'Brussels Sprouts', serving: '1 cup (88g)', cal: 38, protein: 3, carbs: 8, fat: 0.3, grams: 88, perPiece: 20, pieceName: 'sprout' },
    { name: 'Cauliflower', serving: '1 cup (100g)', cal: 25, protein: 2, carbs: 5, fat: 0.3, grams: 100 },
    { name: 'Zucchini', serving: '1 cup (124g)', cal: 20, protein: 1.5, carbs: 4, fat: 0.4, grams: 124 },
    { name: 'Spinach (Raw)', serving: '2 cups (60g)', cal: 14, protein: 2, carbs: 2, fat: 0, grams: 60 },
    { name: 'Asparagus', serving: '8 spears (120g)', cal: 26, protein: 3, carbs: 5, fat: 0.2, grams: 120, perPiece: 15, pieceName: 'spear' },
    { name: 'Green Beans', serving: '1 cup (100g)', cal: 31, protein: 2, carbs: 7, fat: 0.1, grams: 100 },
    { name: 'Bell Pepper', serving: '1 medium (120g)', cal: 30, protein: 1, carbs: 7, fat: 0.3, grams: 120, perPiece: 120, pieceName: 'pepper' },
    { name: 'Cucumber', serving: '1 cup sliced (100g)', cal: 15, protein: 1, carbs: 3, fat: 0.1, grams: 100 },
    { name: 'Carrots', serving: '1 cup chopped (128g)', cal: 52, protein: 1, carbs: 12, fat: 0.3, grams: 128 },
    { name: 'Cherry Tomatoes', serving: '1 cup (150g)', cal: 27, protein: 1.5, carbs: 6, fat: 0.3, grams: 150, perPiece: 15, pieceName: 'tomato' },
    { name: 'Avocado', serving: '1 whole (150g)', cal: 240, protein: 3, carbs: 12, fat: 22, grams: 150, perPiece: 150, pieceName: 'avocado' },
    { name: 'Sweet Potato', serving: '1 medium (130g)', cal: 112, protein: 2, carbs: 26, fat: 0.1, grams: 130 },
    { name: 'White Potato', serving: '1 medium (170g)', cal: 160, protein: 4, carbs: 37, fat: 0.1, grams: 170 },

    // ---- Fruits ----
    { name: 'Banana', serving: '1 medium (118g)', cal: 105, protein: 1, carbs: 27, fat: 0.4, grams: 118, perPiece: 118, pieceName: 'banana' },
    { name: 'Apple', serving: '1 medium (182g)', cal: 95, protein: 0.5, carbs: 25, fat: 0.3, grams: 182, perPiece: 182, pieceName: 'apple' },
    { name: 'Blueberries', serving: '1 cup (148g)', cal: 84, protein: 1, carbs: 21, fat: 0.5, grams: 148 },
    { name: 'Strawberries', serving: '1 cup (150g)', cal: 48, protein: 1, carbs: 12, fat: 0.5, grams: 150, perPiece: 12, pieceName: 'strawberry' },
    { name: 'Orange', serving: '1 medium (130g)', cal: 62, protein: 1, carbs: 15, fat: 0.2, grams: 130, perPiece: 130, pieceName: 'orange' },
    { name: 'Kiwi', serving: '1 fruit (70g)', cal: 42, protein: 0.8, carbs: 10, fat: 0.4, grams: 70, perPiece: 70, pieceName: 'kiwi' },
    { name: 'Pineapple', serving: '1 cup chunks (165g)', cal: 82, protein: 1, carbs: 22, fat: 0.2, grams: 165 },
    { name: 'Mango', serving: '1 cup (165g)', cal: 99, protein: 1, carbs: 25, fat: 0.6, grams: 165 },
    { name: 'Grapes', serving: '1 cup (150g)', cal: 104, protein: 1, carbs: 27, fat: 0.2, grams: 150, perPiece: 5, pieceName: 'grape' },
    { name: 'Watermelon', serving: '1 cup (150g)', cal: 46, protein: 1, carbs: 12, fat: 0.2, grams: 150 },

    // ---- Global Dishes & Snacking ----
    { name: 'Sushi (California Roll)', serving: '1 roll (8 pcs)', cal: 255, protein: 9, carbs: 38, fat: 7, grams: 200, perPiece: 25, pieceName: 'piece' },
    { name: 'Sushi (Salmon Roll)', serving: '1 roll (8 pcs)', cal: 240, protein: 15, carbs: 35, fat: 6, grams: 200, perPiece: 25, pieceName: 'piece' },
    { name: 'Taco (Beef)', serving: '1 taco', cal: 210, protein: 12, carbs: 18, fat: 10, grams: 100, perPiece: 100, pieceName: 'taco' },
    { name: 'Falafel', serving: '3 balls', cal: 170, protein: 5, carbs: 15, fat: 9, grams: 50, perPiece: 17, pieceName: 'ball' },
    { name: 'Beef Jerky', serving: '1 oz (28g)', cal: 80, protein: 11, carbs: 6, fat: 1, grams: 28 },
    { name: 'Rice Cake', serving: '1 cake (9g)', cal: 35, protein: 1, carbs: 7, fat: 0, grams: 9, perPiece: 9, pieceName: 'cake' },
    { name: 'Popcorn (Air Popped)', serving: '3 cups (24g)', cal: 93, protein: 3, carbs: 19, fat: 1, grams: 24 },
    { name: 'Dark Chocolate', serving: '1 bar (40g)', cal: 230, protein: 3, carbs: 18, fat: 16, grams: 40 },
    { name: 'Almonds', serving: '¼ cup (36g)', cal: 210, protein: 8, carbs: 7, fat: 18, grams: 36, perPiece: 1.2, pieceName: 'almond' },
    { name: 'Walnuts', serving: '¼ cup (28g)', cal: 185, protein: 4, carbs: 4, fat: 18, grams: 28 },
    { name: 'Peanut Butter', serving: '2 tbsp (32g)', cal: 190, protein: 8, carbs: 6, fat: 16, grams: 32 },

    // ---- Fast Food & Common ----
    { name: 'Grilled Chicken Sandwich', serving: '1 sandwich', cal: 420, protein: 32, carbs: 40, fat: 14 },
    { name: 'Chicken Tenders', serving: '5 pieces', cal: 450, protein: 28, carbs: 30, fat: 24 },
    { name: 'Pizza Slice (Cheese)', serving: '1 large slice', cal: 280, protein: 12, carbs: 34, fat: 10 },
    { name: 'Pizza Slice (Pepperoni)', serving: '1 large slice', cal: 310, protein: 13, carbs: 34, fat: 14 },
    { name: 'Burrito (Chicken)', serving: '1 burrito', cal: 650, protein: 35, carbs: 70, fat: 22 },
    { name: 'Burrito Bowl', serving: '1 bowl', cal: 600, protein: 38, carbs: 55, fat: 22 },
    { name: 'Sub Sandwich (Turkey)', serving: '6 inch', cal: 350, protein: 22, carbs: 42, fat: 8 },
    { name: 'Sub Sandwich (Meatball)', serving: '6 inch', cal: 580, protein: 24, carbs: 56, fat: 28 },
    { name: 'Chicken Nuggets (10pc)', serving: '10 pieces', cal: 430, protein: 22, carbs: 28, fat: 26 },
    { name: 'Taco (Beef)', serving: '1 taco', cal: 210, protein: 10, carbs: 20, fat: 10 },
    { name: 'Quesadilla (Chicken)', serving: '1 quesadilla', cal: 520, protein: 30, carbs: 38, fat: 26 },
    { name: 'Sushi Roll (Calif.)', serving: '8 pieces', cal: 260, protein: 9, carbs: 38, fat: 7 },
    { name: 'Fried Rice', serving: '1 cup', cal: 250, protein: 6, carbs: 36, fat: 9 },
    { name: 'Pad Thai', serving: '1 plate', cal: 550, protein: 20, carbs: 60, fat: 24 },
    { name: 'Ramen Bowl', serving: '1 bowl', cal: 500, protein: 18, carbs: 55, fat: 22 },

    // ---- Home Cooked Meals ----
    { name: 'Chicken & Rice Bowl', serving: '1 bowl', cal: 520, protein: 45, carbs: 55, fat: 10 },
    { name: 'Steak & Baked Potato', serving: '1 plate', cal: 580, protein: 50, carbs: 40, fat: 18 },
    { name: 'Pasta w/ Meat Sauce', serving: '1 bowl', cal: 480, protein: 28, carbs: 58, fat: 14 },
    { name: 'Stir Fry (Chicken)', serving: '1 plate', cal: 400, protein: 35, carbs: 30, fat: 14 },
    { name: 'Egg Scramble (3 eggs)', serving: '1 plate', cal: 300, protein: 20, carbs: 4, fat: 22 },
    { name: 'Salmon & Veggies', serving: '1 plate', cal: 420, protein: 42, carbs: 12, fat: 22 },
    { name: 'Turkey Meatballs (5)', serving: '5 meatballs', cal: 300, protein: 35, carbs: 8, fat: 14 },
    { name: 'Chili (Beef)', serving: '1 bowl', cal: 380, protein: 28, carbs: 30, fat: 16 },

    // ---- Snacks ----
    { name: 'Beef Jerky', serving: '1 oz (28g)', cal: 80, protein: 13, carbs: 3, fat: 1 },
    { name: 'Rice Cakes', serving: '2 cakes', cal: 70, protein: 2, carbs: 15, fat: 0 },
    { name: 'Crackers (Whole Grain)', serving: '8 crackers', cal: 140, protein: 3, carbs: 22, fat: 5 },
    { name: 'Pretzels', serving: '1 oz (28g)', cal: 110, protein: 3, carbs: 23, fat: 1 },
    { name: 'Chips (Potato)', serving: '1 oz (28g)', cal: 150, protein: 2, carbs: 15, fat: 10 },
    { name: 'Popcorn', serving: '3 cups popped', cal: 100, protein: 3, carbs: 19, fat: 1 },
    { name: 'Granola Bar', serving: '1 bar', cal: 190, protein: 4, carbs: 28, fat: 8 },
    { name: 'Dark Chocolate', serving: '1 oz (28g)', cal: 170, protein: 2, carbs: 13, fat: 12 },
    { name: 'Dried Mango', serving: '¼ cup', cal: 120, protein: 0, carbs: 30, fat: 0 },

    // ---- Drinks ----
    { name: 'Orange Juice', serving: '1 cup (240ml)', cal: 110, protein: 2, carbs: 26, fat: 0 },
    { name: 'Apple Juice', serving: '1 cup (240ml)', cal: 120, protein: 0, carbs: 28, fat: 0 },
    { name: 'Smoothie (Fruit)', serving: '16 oz', cal: 250, protein: 3, carbs: 55, fat: 1 },
    { name: 'Smoothie (Protein)', serving: '16 oz', cal: 350, protein: 30, carbs: 40, fat: 8 },
    { name: 'Gatorade', serving: '20 oz (591ml)', cal: 140, protein: 0, carbs: 36, fat: 0 },
    { name: 'Soda (Regular)', serving: '12 oz (355ml)', cal: 140, protein: 0, carbs: 39, fat: 0 },
    { name: 'Coffee (Black)', serving: '1 cup', cal: 5, protein: 0, carbs: 0, fat: 0 },
    { name: 'Coffee w/ Cream & Sugar', serving: '1 cup', cal: 80, protein: 1, carbs: 10, fat: 4 },
    { name: 'Latte (Whole Milk)', serving: '16 oz', cal: 220, protein: 11, carbs: 18, fat: 11 },

    // ---- Condiments / Extras ----
    { name: 'Honey', serving: '1 tbsp (21g)', cal: 60, protein: 0, carbs: 17, fat: 0 },
    { name: 'Maple Syrup', serving: '2 tbsp', cal: 100, protein: 0, carbs: 26, fat: 0 },
    { name: 'Ketchup', serving: '2 tbsp', cal: 40, protein: 0, carbs: 10, fat: 0 },
    { name: 'Ranch Dressing', serving: '2 tbsp', cal: 130, protein: 1, carbs: 2, fat: 13 },
    { name: 'BBQ Sauce', serving: '2 tbsp', cal: 60, protein: 0, carbs: 15, fat: 0 },
    { name: 'Soy Sauce', serving: '1 tbsp', cal: 10, protein: 1, carbs: 1, fat: 0 },
    { name: 'Salsa', serving: '¼ cup', cal: 20, protein: 1, carbs: 4, fat: 0 },
    { name: 'Guacamole', serving: '¼ cup', cal: 100, protein: 1, carbs: 5, fat: 9 },
    { name: 'Sour Cream', serving: '2 tbsp', cal: 60, protein: 1, carbs: 1, fat: 5 },

    // ---- Breakfast Combos ----
    { name: 'Oatmeal w/ Banana & PB', serving: '1 bowl', cal: 420, protein: 14, carbs: 60, fat: 16 },
    { name: 'Eggs & Toast (2+2)', serving: '1 plate', cal: 340, protein: 18, carbs: 32, fat: 16 },
    { name: 'Breakfast Burrito', serving: '1 burrito', cal: 480, protein: 24, carbs: 40, fat: 22 },
    { name: 'Yogurt Parfait', serving: '1 cup', cal: 280, protein: 16, carbs: 40, fat: 6 },
    { name: 'Bagel w/ Cream Cheese', serving: '1 bagel', cal: 380, protein: 12, carbs: 55, fat: 12 },

    // ---- Snack Combos ----
    { name: 'Chips & Guacamole', serving: '1 serving (110g)', cal: 250, protein: 3, carbs: 20, fat: 19 },
    { name: 'String Cheese & Almonds', serving: '1 stick + ¼ cup', cal: 290, protein: 15, carbs: 8, fat: 23 },
    { name: 'Apple & Peanut Butter', serving: '1 apple + 2 tbsp', cal: 285, protein: 8, carbs: 32, fat: 16 },
    { name: 'Greek Yogurt & Berries', serving: '1 cup + ½ cup', cal: 172, protein: 22, carbs: 18, fat: 0 },
    { name: 'Beef Jerky & Pretzels', serving: '1 oz + 1 oz', cal: 190, protein: 16, carbs: 26, fat: 2 },

    // ---- Desserts ----
    { name: 'Ice Cream (Vanilla)', serving: '½ cup (66g)', cal: 140, protein: 2, carbs: 16, fat: 7 },
    { name: 'Cookie (Chocolate Chip)', serving: '1 large', cal: 220, protein: 2, carbs: 30, fat: 10 },
    { name: 'Brownie', serving: '1 piece', cal: 260, protein: 3, carbs: 34, fat: 13 },
    { name: 'Donut (Glazed)', serving: '1 donut', cal: 260, protein: 3, carbs: 31, fat: 14 },
  ];

  // ==========================================
  // Enhance DB with Exact Base Weights
  // ==========================================
  FOOD_DB.forEach(f => {
    // Determine if liquid (if not already set)
    if (f.isLiquid === undefined) {
      const liquidKeywords = /milk|juice|smoothie|drink|shake|soda|coffee|latte|gatorade/i;
      f.isLiquid = f.serving.includes('ml') || (f.serving.includes('oz') && liquidKeywords.test(f.name));
    }

    // Only auto-detect grams if not manually set
    if (!f.grams) {
      f.grams = 100; // default safe fallback
      let m = f.serving.match(/\((\d+)g\)/);
      if (m) { f.grams = parseInt(m[1], 10); } else {
        m = f.serving.match(/\((\d+)ml\)/);
        if (m) { f.grams = parseInt(m[1], 10); f.isLiquid = true; } else {
          m = f.serving.match(/([\d\.]+)\s*oz/);
          if (m) { f.grams = Math.round(parseFloat(m[1]) * 28.3495); }
        }
      }
    }

    // Hard default for eggs
    if (f.name.toLowerCase().includes('egg') && !f.grams) f.grams = 50;
  });

  // ==========================================
  // State
  // ==========================================

  const STORAGE_KEY_LOGS = 'fuelup_logs';
  const STORAGE_KEY_GOALS = 'fuelup_goals';

  const DEFAULT_GOALS = { calories: 3000, protein: 180, carbs: 350, fat: 90 };

  let currentDate = getTodayString();
  let goals = loadGoals();
  let selectedFood = null;
  let activeResultIndex = -1;
  let currentUnit = 'g';
  let editingEntryId = null;

  // ==========================================
  // DOM References
  // ==========================================

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const dom = {
    dateDisplay: $('#date-display'),
    prevDayBtn: $('#prev-day-btn'),
    nextDayBtn: $('#next-day-btn'),
    settingsBtn: $('#settings-btn'),

    calCurrent: $('#cal-current'),
    proteinCurrent: $('#protein-current'),
    carbsCurrent: $('#carbs-current'),
    fatCurrent: $('#fat-current'),
    calGoal: $('#cal-goal'),
    proteinGoal: $('#protein-goal'),
    carbsGoal: $('#carbs-goal'),
    fatGoal: $('#fat-goal'),

    foodSearch: $('#food-search'),
    searchResults: $('#search-results'),
    customAddBtn: $('#custom-add-btn'),

    suggestions: $('#suggestions'),
    suggestionCards: $('#suggestion-cards'),

    logHeader: $('#log-header'),
    logCount: $('#log-count'),
    logEntries: $('#log-entries'),
    emptyLog: $('#empty-log'),

    settingsModal: $('#settings-modal'),
    closeSettingsBtn: $('#close-settings-btn'),
    
    quizModal: $('#quiz-modal'),

    goalCalories: $('#goal-calories'),
    goalProtein: $('#goal-protein'),
    goalCarbs: $('#goal-carbs'),
    goalFat: $('#goal-fat'),
    saveSettingsBtn: $('#save-settings-btn'),
    clearTodayBtn: $('#clear-today-btn'),
    hardRefreshBtn: $('#hard-refresh-btn'),

    addFoodModal: $('#add-food-modal'),
    addFoodTitle: $('#add-food-title'),
    addFoodMacros: $('#add-food-macros'),
    servingInput: $('#serving-input'),
    servingMinus: $('#serving-minus'),
    servingPlus: $('#serving-plus'),
    servingDescLabel: $('#serving-desc-label'),
    amountValue: $('#amount-value'),
    amountUnitLabel: $('#amount-unit-label'),
    unitBtns: $$('.unit-btn'),
    addFoodTotals: $('#add-food-totals'),
    confirmAddBtn: $('#confirm-add-btn'),
    closeAddFoodBtn: $('#close-add-food-btn'),

    customFoodModal: $('#custom-food-modal'),
    customName: $('#custom-name'),
    customCalories: $('#custom-calories'),
    customProtein: $('#custom-protein'),
    customCarbs: $('#custom-carbs'),
    customFat: $('#custom-fat'),
    confirmCustomBtn: $('#confirm-custom-btn'),
    closeCustomBtn: $('#close-custom-btn'),
  };

  // ==========================================
  // Utility Functions
  // ==========================================

  function getTodayString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function formatDate(dateStr) {
    const today = getTodayString();
    if (dateStr === today) return 'Today';
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const ys = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    if (dateStr === ys) return 'Yesterday';
    const parts = dateStr.split('-');
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function shiftDate(dateStr, days) {
    const parts = dateStr.split('-');
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    d.setDate(d.getDate() + days);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  // ==========================================
  // Storage
  // ==========================================

  function loadLogs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGS)) || {};
    } catch { return {}; }
  }

  function saveLogs(logs) {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
  }

  function getEntriesForDate(dateStr) {
    const logs = loadLogs();
    return logs[dateStr] || [];
  }

  function addEntry(dateStr, entry) {
    const logs = loadLogs();
    if (!logs[dateStr]) logs[dateStr] = [];
    entry.id = Date.now() + Math.random();
    logs[dateStr].push(entry);
    saveLogs(logs);
    return entry;
  }

  function removeEntry(dateStr, entryId) {
    const logs = loadLogs();
    if (!logs[dateStr]) return;
    logs[dateStr] = logs[dateStr].filter(e => e.id !== entryId);
    saveLogs(logs);
  }

  function clearDay(dateStr) {
    const logs = loadLogs();
    delete logs[dateStr];
    saveLogs(logs);
  }

  function loadGoals() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY_GOALS));
      return saved || { ...DEFAULT_GOALS };
    } catch { return { ...DEFAULT_GOALS }; }
  }

  function saveGoals(g) {
    goals = g;
    localStorage.setItem(STORAGE_KEY_GOALS, JSON.stringify(g));
  }

  // ==========================================
  // Computed Totals
  // ==========================================

  function computeTotals(entries) {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    entries.forEach(e => {
      totals.calories += e.calories || 0;
      totals.protein += e.protein || 0;
      totals.carbs += e.carbs || 0;
      totals.fat += e.fat || 0;
    });
    return totals;
  }

  // ==========================================
  // Ring Animation
  // ==========================================

  function updateRings(totals) {
    const circumference = 314.159; // 2 * PI * 50

    const rings = [
      { selector: '[data-macro="calories"]', current: totals.calories, goal: goals.calories },
      { selector: '[data-macro="protein"]', current: totals.protein, goal: goals.protein },
      { selector: '[data-macro="carbs"]', current: totals.carbs, goal: goals.carbs },
      { selector: '[data-macro="fat"]', current: totals.fat, goal: goals.fat },
    ];

    rings.forEach(r => {
      const el = $(r.selector);
      if (!el) return;
      const pct = Math.min(r.current / r.goal, 1);
      const offset = circumference * (1 - pct);
      el.style.strokeDashoffset = offset;
    });

    dom.calCurrent.textContent = Math.round(totals.calories);
    dom.proteinCurrent.textContent = Math.round(totals.protein);
    dom.carbsCurrent.textContent = Math.round(totals.carbs);
    dom.fatCurrent.textContent = Math.round(totals.fat);
  }

  function updateGoalLabels() {
    dom.calGoal.textContent = `/ ${goals.calories}`;
    dom.proteinGoal.textContent = `/ ${goals.protein}g`;
    dom.carbsGoal.textContent = `/ ${goals.carbs}g`;
    dom.fatGoal.textContent = `/ ${goals.fat}g`;
  }

  // ==========================================
  // Search
  // ==========================================

  function searchFoods(query) {
    if (!query || query.length < 1) return [];
    const q = query.toLowerCase().trim();
    const words = q.split(/\s+/);

    const scored = FOOD_DB.map(food => {
      const name = food.name.toLowerCase();
      let score = 0;

      // Exact match
      if (name === q) score += 100;
      // Starts with query
      else if (name.startsWith(q)) score += 50;
      // Contains full query
      else if (name.includes(q)) score += 30;

      // Each word match
      words.forEach(w => {
        if (name.includes(w)) score += 10;
      });

      return { food, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

    return scored.map(s => s.food);
  }

  function renderSearchResults(results) {
    if (results.length === 0) {
      dom.searchResults.classList.add('hidden');
      activeResultIndex = -1;
      return;
    }

    dom.searchResults.innerHTML = results.map((food, i) => `
      <div class="search-result-item" data-index="${i}">
        <div>
          <div class="result-name">${food.name}</div>
          <div class="result-serving">${food.serving}</div>
        </div>
        <div class="result-macros">
          <span class="macro-cal">${food.cal}cal</span>
          <span class="macro-p">${food.protein}p</span>
          <span class="macro-c">${food.carbs}c</span>
          <span class="macro-f">${food.fat}f</span>
        </div>
      </div>
    `).join('');

    dom.searchResults.classList.remove('hidden');
    activeResultIndex = -1;

    // Click handlers
    dom.searchResults.querySelectorAll('.search-result-item').forEach((el, i) => {
      el.addEventListener('click', () => {
        openAddFoodModal(results[i]);
      });
    });
  }

  // ==========================================
  // Add Food Modal
  // ==========================================

  function openAddFoodModal(food) {
    editingEntryId = null;
    dom.confirmAddBtn.textContent = 'Add to Log';
    selectedFood = food;
    dom.addFoodTitle.textContent = food.name;
    dom.foodSearch.value = '';
    dom.searchResults.classList.add('hidden');

    // Reset default unit based on liquid/solid
    currentUnit = food.isLiquid ? 'ml' : 'g';
    if (food.serving.includes('oz')) currentUnit = 'oz';

    // Back to serving multiplier logic: default to 1 full serving
    dom.servingInput.value = '1';

    updateUnitBtns();
    updateAddFoodMacros();
    openModal(dom.addFoodModal);
  }

  function updateUnitBtns() {
    dom.unitBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.unit === currentUnit);
      if (selectedFood) {
        const u = btn.dataset.unit;
        // Piece logic
        if (u === 'pcs') {
          btn.style.display = selectedFood.perPiece ? 'block' : 'none';
          return;
        }
        // Liquid/Solid logic
        // Liquid/Solid logic
        if (selectedFood.isLiquid && (u === 'lb' || u === 'g' || u === 'pcs')) {
          btn.style.display = 'none';
        } else if (!selectedFood.isLiquid && (u === 'ml' || u === 'cup')) {
          btn.style.display = 'none';
        } else {
          btn.style.display = 'block';
        }
      }
    });
  }

  function updateAddFoodMacros() {
    if (!selectedFood) return;
    const sInput = parseFloat(dom.servingInput.value) || 0;
    const f = selectedFood;

    let totalGrams = 0;
    let servingsForMacros = 0;

    if (currentUnit === 'pcs' && f.perPiece) {
      totalGrams = sInput * f.perPiece;
      servingsForMacros = totalGrams / f.grams;
    } else {
      totalGrams = sInput * f.grams;
      servingsForMacros = sInput;
    }

    // ----- UI Display Values -----
    let dispVal = 0;
    let dispLabel = currentUnit;

    if (currentUnit === 'pcs' && f.perPiece) {
      dispVal = sInput;
      dispLabel = sInput === 1 ? (f.pieceName || 'piece') : (f.pieceName ? f.pieceName + 's' : 'pieces');
      if (f.pieceName === 'oyster' && sInput !== 1) dispLabel = 'oysters';
      if (f.pieceName === 'shrimp') dispLabel = 'shrimp';
    } else if (currentUnit === 'g' || currentUnit === 'ml') {
      dispVal = Math.round(totalGrams);
      dispLabel = currentUnit === 'g' ? 'grams' : 'ml';
    } else if (currentUnit === 'oz') {
      dispVal = (totalGrams / 28.3495).toFixed(1).replace(/\.0$/, '');
      dispLabel = 'ounces';
    } else if (currentUnit === 'lb') {
      dispVal = (totalGrams / 453.592).toFixed(2);
      dispLabel = 'pounds';
    } else if (currentUnit === 'cup') {
      dispVal = (totalGrams / 240).toFixed(2);
      dispLabel = 'cups';
    }

    dom.amountValue.textContent = dispVal;
    dom.amountUnitLabel.textContent = dispLabel;
    dom.servingDescLabel.textContent = `(1 serving = ${f.serving})`;

    // ----- Macros Preview Display -----
    dom.addFoodMacros.innerHTML = `
      <div class="macro-preview-item mp-cal"><span class="mp-value">${Math.round(f.cal * servingsForMacros)}</span><span class="mp-label">calories</span></div>
      <div class="macro-preview-item mp-p"><span class="mp-value">${Math.round(f.protein * servingsForMacros)}g</span><span class="mp-label">protein</span></div>
      <div class="macro-preview-item mp-c"><span class="mp-value">${Math.round(f.carbs * servingsForMacros)}g</span><span class="mp-label">carbs</span></div>
      <div class="macro-preview-item mp-f"><span class="mp-value">${Math.round(f.fat * servingsForMacros)}g</span><span class="mp-label">fat</span></div>
    `;

    dom.addFoodTotals.innerHTML = `
      <div class="macro-total-item mt-cal"><span class="mt-value">${Math.round(f.cal * servingsForMacros)}</span><span class="mt-label">cal total</span></div>
      <div class="macro-total-item mt-p"><span class="mt-value">${Math.round(f.protein * servingsForMacros)}g</span><span class="mt-label">protein</span></div>
      <div class="macro-total-item mt-c"><span class="mt-value">${Math.round(f.carbs * servingsForMacros)}g</span><span class="mt-label">carbs</span></div>
      <div class="macro-total-item mt-f"><span class="mt-value">${Math.round(f.fat * servingsForMacros)}g</span><span class="mt-label">fat</span></div>
    `;
  }

  function confirmAddFood() {
    if (!selectedFood) return;
    const sInput = parseFloat(dom.servingInput.value) || 1;
    const f = selectedFood;

    let totalGrams = 0;
    if (currentUnit === 'pcs' && f.perPiece) {
      totalGrams = sInput * f.perPiece;
    } else if (currentUnit === 'oz') {
      totalGrams = sInput * 28.3495;
    } else if (currentUnit === 'lb') {
      totalGrams = sInput * 453.592;
    } else if (currentUnit === 'cup') {
      totalGrams = sInput * 240;
    } else {
      totalGrams = sInput; // g or ml
    }

    const finalServings = totalGrams / f.grams;
    let label = `${sInput}× ${f.serving}`;

    if (currentUnit === 'pcs' && f.perPiece) {
      let pName = sInput === 1 ? (f.pieceName || 'piece') : (f.pieceName ? f.pieceName + 's' : 'pieces');
      if (f.pieceName === 'oyster' && sInput !== 1) pName = 'oysters';
      if (f.pieceName === 'shrimp') pName = 'shrimp';
      label = `${sInput} ${pName}`;
    } else if (currentUnit === 'g') {
      label = `${Math.round(sInput)}g ${f.name}`;
    } else if (currentUnit === 'ml') {
      label = `${Math.round(sInput)}ml ${f.name}`;
    } else if (currentUnit === 'oz') {
      label = `${sInput.toFixed(1).replace(/\.0$/, '')}oz ${f.name}`;
    }

    const entry = {
      name: f.name,
      servings: finalServings,
      displayLabel: label,
      servingDesc: f.serving,
      calories: Math.round(f.cal * finalServings),
      protein: Math.round(f.protein * finalServings),
      carbs: Math.round(f.carbs * finalServings),
      fat: Math.round(f.fat * finalServings),
      timestamp: Date.now(),
    };

    if (editingEntryId) {
      const logs = loadLogs();
      const entries = logs[currentDate] || [];
      const idx = entries.findIndex(x => x.id === editingEntryId);
      if (idx !== -1) {
        entry.id = editingEntryId;
        entry.timestamp = entries[idx].timestamp || Date.now();
        entries[idx] = entry;
        logs[currentDate] = entries;
        saveLogs(logs);
      }
      editingEntryId = null;
      dom.confirmAddBtn.textContent = 'Add to Log';
    } else {
      addEntry(currentDate, entry);
    }

    closeModal(dom.addFoodModal);
    selectedFood = null;
    refreshUI();
  }

  // ==========================================
  // Custom Food Modal
  // ==========================================

  function openCustomFoodModal() {
    editingEntryId = null;
    dom.confirmCustomBtn.textContent = 'Add to Log';
    dom.customName.value = '';
    dom.customCalories.value = '';
    dom.customProtein.value = '';
    dom.customCarbs.value = '';
    dom.customFat.value = '';
    dom.foodSearch.value = '';
    dom.searchResults.classList.add('hidden');
    openModal(dom.customFoodModal);
    dom.customName.focus();
  }

  function confirmCustomFood() {
    const name = dom.customName.value.trim() || 'Custom Food';
    const cal = parseInt(dom.customCalories.value) || 0;
    const p = parseInt(dom.customProtein.value) || 0;
    const c = parseInt(dom.customCarbs.value) || 0;
    const f = parseInt(dom.customFat.value) || 0;

    if (cal === 0 && p === 0 && c === 0 && f === 0) return;

    const entry = {
      name,
      servings: 1,
      servingDesc: 'custom',
      calories: cal,
      protein: p,
      carbs: c,
      fat: f,
      timestamp: Date.now(),
    };

    if (editingEntryId) {
      const logs = loadLogs();
      const entries = logs[currentDate] || [];
      const idx = entries.findIndex(x => x.id === editingEntryId);
      if (idx !== -1) {
        entry.id = editingEntryId;
        entry.timestamp = entries[idx].timestamp || Date.now();
        entries[idx] = entry;
        logs[currentDate] = entries;
        saveLogs(logs);
      }
      editingEntryId = null;
      dom.confirmCustomBtn.textContent = 'Add to Log';
    } else {
      addEntry(currentDate, entry);
    }

    closeModal(dom.customFoodModal);
    refreshUI();
  }

  // ==========================================
  // Modal Helpers
  // ==========================================

  function openModal(modalEl) {
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    modalEl.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // ==========================================
  // Meal Log Rendering
  // ==========================================

  function renderLog(entries) {
    if (entries.length === 0) {
      dom.logEntries.innerHTML = '';
      dom.emptyLog.classList.remove('hidden');
      dom.logCount.textContent = '0 items';
      return;
    }

    dom.emptyLog.classList.add('hidden');
    dom.logCount.textContent = `${entries.length} item${entries.length !== 1 ? 's' : ''}`;

    dom.logEntries.innerHTML = entries.map(e => `
      <div class="log-entry" style="cursor: pointer;" data-id="${e.id}">
        <div class="log-entry-info">
          <div class="log-entry-name">${e.name}</div>
          <div class="log-entry-serving">${e.displayLabel || (e.servings + '× ' + e.servingDesc)}</div>
        </div>
        <div class="log-entry-macros">
          <span class="macro-cal">${e.calories}</span>
          <span class="macro-p">${e.protein}p</span>
          <span class="macro-c">${e.carbs}c</span>
          <span class="macro-f">${e.fat}f</span>
        </div>
        <button class="log-entry-delete" aria-label="Delete entry" data-id="${e.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join('');

    // Edit handlers
    dom.logEntries.querySelectorAll('.log-entry').forEach(entryEl => {
      entryEl.addEventListener('click', (e) => {
        if (e.target.closest('.log-entry-delete')) return;
        
        const entryId = parseFloat(entryEl.dataset.id);
        const entries = getEntriesForDate(currentDate);
        const entry = entries.find(x => x.id === entryId);
        if (!entry) return;

        if (entry.servingDesc === 'custom') {
           openCustomFoodModal();
           editingEntryId = entryId;
           dom.confirmCustomBtn.textContent = 'Update Entry';
           dom.customName.value = entry.name;
           dom.customCalories.value = entry.calories;
           dom.customProtein.value = entry.protein;
           dom.customCarbs.value = entry.carbs;
           dom.customFat.value = entry.fat;
        } else {
           const food = FOOD_DB.find(x => x.name === entry.name);
           if (!food) return; 
           
           openAddFoodModal(food);
           editingEntryId = entryId;
           dom.confirmAddBtn.textContent = 'Update Entry';
           dom.servingInput.value = entry.servings;
           updateAddFoodMacros();
        }
      });
    });

    // Delete handlers
    dom.logEntries.querySelectorAll('.log-entry-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const entryId = parseFloat(btn.dataset.id);
        const entryEl = btn.closest('.log-entry');
        entryEl.classList.add('removing');
        setTimeout(() => {
          removeEntry(currentDate, entryId);
          refreshUI();
        }, 300);
      });
    });
  }

  // ==========================================
  // Suggestions Engine
  // ==========================================

  function generateSuggestions(totals) {
    const remaining = {
      calories: Math.max(0, goals.calories - totals.calories),
      protein: Math.max(0, goals.protein - totals.protein),
      carbs: Math.max(0, goals.carbs - totals.carbs),
      fat: Math.max(0, goals.fat - totals.fat),
    };

    // If goals are met, hide suggestions
    if (remaining.calories < 50 && remaining.protein < 5) {
      dom.suggestions.classList.add('hidden');
      return;
    }

    // Score foods by how well they fill remaining gaps, prioritizing protein
    const scored = FOOD_DB.map(food => {
      if (food.cal > remaining.calories + 100) return null; // Too many cals

      let score = 0;
      // Protein priority (2x weight)
      if (remaining.protein > 5 && food.protein > 0) {
        score += (food.protein / remaining.protein) * 40;
      }
      // Calorie fit
      if (remaining.calories > 0) {
        const calFit = 1 - Math.abs(food.cal - remaining.calories * 0.3) / remaining.calories;
        score += Math.max(0, calFit) * 15;
      }
      // Carbs
      if (remaining.carbs > 5 && food.carbs > 0) {
        score += (food.carbs / remaining.carbs) * 10;
      }
      // Protein density bonus
      if (food.cal > 0) {
        const proteinDensity = food.protein / food.cal;
        score += proteinDensity * 100;
      }

      return { food, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

    if (scored.length === 0) {
      dom.suggestions.classList.add('hidden');
      return;
    }

    dom.suggestions.classList.remove('hidden');
    dom.suggestionCards.innerHTML = scored.map(({ food }) => `
      <div class="suggestion-card" data-food-name="${food.name}">
        <div class="suggestion-name">${food.name}</div>
        <div class="suggestion-detail">${food.serving}</div>
        <div class="suggestion-macros">
          <span class="macro-cal">${food.cal}cal</span>
          <span class="macro-p">${food.protein}p</span>
          <span class="macro-c">${food.carbs}c</span>
          <span class="macro-f">${food.fat}f</span>
        </div>
      </div>
    `).join('');

    // Click handlers
    dom.suggestionCards.querySelectorAll('.suggestion-card').forEach(card => {
      card.addEventListener('click', () => {
        const foodName = card.dataset.foodName;
        const food = FOOD_DB.find(f => f.name === foodName);
        if (food) openAddFoodModal(food);
      });
    });
  }

  // ==========================================
  // Settings
  // ==========================================

  function openSettings() {
    dom.goalCalories.value = goals.calories;
    dom.goalProtein.value = goals.protein;
    dom.goalCarbs.value = goals.carbs;
    dom.goalFat.value = goals.fat;
    updatePresetActive();
    openModal(dom.settingsModal);
  }

  function saveSettings() {
    const g = {
      calories: parseInt(dom.goalCalories.value) || DEFAULT_GOALS.calories,
      protein: parseInt(dom.goalProtein.value) || DEFAULT_GOALS.protein,
      carbs: parseInt(dom.goalCarbs.value) || DEFAULT_GOALS.carbs,
      fat: parseInt(dom.goalFat.value) || DEFAULT_GOALS.fat,
    };
    saveGoals(g);
    closeModal(dom.settingsModal);
    updateGoalLabels();
    refreshUI();
  }

  function updatePresetActive() {
    $$('.preset-btn').forEach(btn => {
      const cal = parseInt(btn.dataset.cal);
      const p = parseInt(btn.dataset.p);
      const c = parseInt(btn.dataset.c);
      const f = parseInt(btn.dataset.f);
      const isActive = (
        parseInt(dom.goalCalories.value) === cal &&
        parseInt(dom.goalProtein.value) === p &&
        parseInt(dom.goalCarbs.value) === c &&
        parseInt(dom.goalFat.value) === f
      );
      btn.classList.toggle('active', isActive);
    });
  }

  // ==========================================
  // Date Navigation
  // ==========================================

  function navigateDate(direction) {
    currentDate = shiftDate(currentDate, direction);
    refreshUI();
  }

  // ==========================================
  // Master Refresh
  // ==========================================

  function refreshUI() {
    // Update date display
    dom.dateDisplay.textContent = formatDate(currentDate);

    // Disable next if already today
    const isToday = currentDate === getTodayString();
    dom.nextDayBtn.style.opacity = isToday ? '0.3' : '1';
    dom.nextDayBtn.disabled = isToday;

    // Update log header
    const displayLabel = formatDate(currentDate);
    dom.logHeader.querySelector('h2').textContent = isToday ? "Today's Log" : `${displayLabel}'s Log`;

    // Get entries & totals
    const entries = getEntriesForDate(currentDate);
    const totals = computeTotals(entries);

    // Update rings
    updateRings(totals);
    updateGoalLabels();

    // Render log
    renderLog(entries);

    // Suggestions (only for today)
    if (isToday) {
      generateSuggestions(totals);
    } else {
      dom.suggestions.classList.add('hidden');
    }
  }

  // ==========================================
  // Event Bindings
  // ==========================================

  function init() {
    // Date nav
    dom.prevDayBtn.addEventListener('click', () => navigateDate(-1));
    dom.nextDayBtn.addEventListener('click', () => navigateDate(1));

    dom.unitBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.style.display === 'none') return;
        const oldUnit = currentUnit;
        const newUnit = btn.dataset.unit;
        if (oldUnit === newUnit) return;

        const f = selectedFood;
        const oldVal = parseFloat(dom.servingInput.value) || 0;
        if (!f || oldVal <= 0) {
          currentUnit = newUnit;
          updateUnitBtns();
          updateAddFoodMacros();
          return;
        }

        // 1. Convert oldVal to standard grams
        let g = 0;
        if (oldUnit === 'pcs' && f.perPiece) g = oldVal * f.perPiece;
        else if (oldUnit === 'oz') g = oldVal * 28.3495;
        else if (oldUnit === 'lb') g = oldVal * 453.592;
        else if (oldUnit === 'cup') g = oldVal * 240;
        else g = oldVal; 

        // 2. Convert standard grams to newVal
        let newVal = 0;
        if (newUnit === 'pcs' && f.perPiece) newVal = g / f.perPiece;
        else if (newUnit === 'oz') newVal = g / 28.3495;
        else if (newUnit === 'lb') newVal = g / 453.592;
        else if (newUnit === 'cup') newVal = g / 240;
        else newVal = g; 

        dom.servingInput.value = newVal.toFixed(1).replace(/\.0$/, '');
        currentUnit = newUnit;
        updateUnitBtns();
        updateAddFoodMacros();
      });
    });

    // Settings
    dom.settingsBtn.addEventListener('click', openSettings);
    dom.closeSettingsBtn.addEventListener('click', () => closeModal(dom.settingsModal));
    dom.saveSettingsBtn.addEventListener('click', saveSettings);
    dom.clearTodayBtn.addEventListener('click', () => {
      if (confirm('Clear all entries for today?')) {
        clearDay(currentDate);
        closeModal(dom.settingsModal);
        refreshUI();
      }
    });

    dom.hardRefreshBtn.addEventListener('click', () => {
      if (confirm('Hard refresh the app? This will clear caches and reload. Your data will be safe.')) {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
              registration.unregister();
            }
            window.location.reload(true);
          });
        } else {
          window.location.reload(true);
        }
      }
    });

    // Settings modal backdrop close
    dom.settingsModal.querySelector('.modal-backdrop').addEventListener('click', () => closeModal(dom.settingsModal));

    // Preset buttons
    $$('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        dom.goalCalories.value = btn.dataset.cal;
        dom.goalProtein.value = btn.dataset.p;
        dom.goalCarbs.value = btn.dataset.c;
        dom.goalFat.value = btn.dataset.f;
        updatePresetActive();
      });
    });

    // Smart Macro Quiz Modal Flow
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('#open-quiz-btn');
      if (openBtn) {
        closeModal(dom.settingsModal);
        openModal(dom.quizModal);
        return;
      }

      const closeBtn = e.target.closest('#close-quiz-btn');
      const backdrop = e.target.classList.contains('modal-backdrop') && e.target.closest('#quiz-modal');
      if (closeBtn || backdrop) {
        closeModal(dom.quizModal);
        return;
      }

      const calcBtn = e.target.closest('#calc-quiz-btn');
      if (calcBtn) {
        // Pull values fresh from DOM to avoid any null/stale references
        const sex = $('#quiz-sex').value;
        const age = parseInt($('#quiz-age').value) || 25;
        const weightLbs = parseFloat($('#quiz-weight').value) || 160;
        const heightInches = parseFloat($('#quiz-height').value) || 68;
        const activityMult = parseFloat($('#quiz-activity').value) || 1.55;
        const goalAdjustment = parseFloat($('#quiz-goal').value) || 250;

        const weightKg = weightLbs / 2.20462;
        const heightCm = heightInches * 2.54;

        // Mifflin-St Jeor Equation
        let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
        bmr += (sex === 'male') ? 5 : -161;

        const tdee = bmr * activityMult;
        const targetCalories = Math.round(tdee + goalAdjustment);

        // Protein: ~1g per lb of current weight (rounded to nearest 5)
        const targetProtein = Math.round(weightLbs / 5) * 5;

        // Fat: ~25% of total calories (9 calories per gram)
        const targetFat = Math.round((targetCalories * 0.25) / 9);

        // Carbs: Remaining calories (4 calories per gram)
        const remainingCals = targetCalories - (targetProtein * 4) - (targetFat * 9);
        const targetCarbs = Math.max(0, Math.round(remainingCals / 4));

        // Immediately apply and refresh
        saveGoals({
          calories: targetCalories,
          protein: targetProtein,
          carbs: targetCarbs,
          fat: targetFat
        });
        
        updateGoalLabels();
        refreshUI();
        closeModal(dom.quizModal);
      }
    });

    // Search
    dom.foodSearch.addEventListener('input', () => {
      const q = dom.foodSearch.value.trim();
      const results = searchFoods(q);
      renderSearchResults(results);
    });

    dom.foodSearch.addEventListener('keydown', (e) => {
      const items = dom.searchResults.querySelectorAll('.search-result-item');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeResultIndex = Math.min(activeResultIndex + 1, items.length - 1);
        items.forEach((el, i) => el.classList.toggle('active', i === activeResultIndex));
        items[activeResultIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeResultIndex = Math.max(activeResultIndex - 1, 0);
        items.forEach((el, i) => el.classList.toggle('active', i === activeResultIndex));
        items[activeResultIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter' && activeResultIndex >= 0) {
        e.preventDefault();
        items[activeResultIndex].click();
      }
    });

    // Close search on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#quick-add')) {
        dom.searchResults.classList.add('hidden');
      }
    });

    // Custom add
    dom.customAddBtn.addEventListener('click', openCustomFoodModal);
    dom.closeCustomBtn.addEventListener('click', () => closeModal(dom.customFoodModal));
    dom.customFoodModal.querySelector('.modal-backdrop').addEventListener('click', () => closeModal(dom.customFoodModal));
    dom.confirmCustomBtn.addEventListener('click', confirmCustomFood);

    // Add food modal
    dom.closeAddFoodBtn.addEventListener('click', () => closeModal(dom.addFoodModal));
    dom.addFoodModal.querySelector('.modal-backdrop').addEventListener('click', () => closeModal(dom.addFoodModal));
    dom.confirmAddBtn.addEventListener('click', confirmAddFood);
    dom.servingInput.addEventListener('input', updateAddFoodMacros);
    dom.servingMinus.addEventListener('click', () => {
      const v = parseFloat(dom.servingInput.value) || 0;
      let step = 1;
      if (currentUnit === 'g' || currentUnit === 'ml') step = 10;
      if (currentUnit === 'oz') step = 0.5;
      if (currentUnit === 'lb') step = 0.1;
      if (currentUnit === 'cup') step = 0.25;
      if (currentUnit === 'pcs') step = 1;

      const newVal = Math.max(0, v - step);
      dom.servingInput.value = newVal.toFixed(2).replace(/\.00$/, '').replace(/\.0$/, '');
      updateAddFoodMacros();
    });
    dom.servingPlus.addEventListener('click', () => {
      const v = parseFloat(dom.servingInput.value) || 0;
      let step = 1;
      if (currentUnit === 'g' || currentUnit === 'ml') step = 10;
      if (currentUnit === 'oz') step = 0.5;
      if (currentUnit === 'lb') step = 0.1;
      if (currentUnit === 'cup') step = 0.25;
      if (currentUnit === 'pcs') step = 1;

      const newVal = Math.min(2000, v + step);
      dom.servingInput.value = newVal.toFixed(2).replace(/\.00$/, '').replace(/\.0$/, '');
      updateAddFoodMacros();
    });

    // Initial render
    refreshUI();
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
