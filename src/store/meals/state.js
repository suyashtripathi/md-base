/* ============
 * State of the products module
 * ============
 *
 * The initial state of the products module.
 * These values define the central state of the entire app module
 * These values have been initialized with default values.
 * These values shall get updated through respective mutations
 *
 */
import mealDb from 'src/statics/BreakfastOptions.json'

const state = {
  mealPreferences: {
    scheduleDays: 7,
    vegEggNonVegChoice: 'veg',
    nonVegDays: [1, 2, 3, 4, 5, 6, 7],
    breakfastSubCtgLst: [], // of the format [{name:dal, model: false},{name:idli, model:true},...]
    lunchSubCtgLst: [], // of the format [{name:dal, model: false},{name:idli, model:true},...]
    dinnerSubCtgLst: [] // of the format [{name:dal, model: false},{name:idli, model:true},...]
  },
  meals: mealDb.meals,
  selectedMeals: {// These are going to have full blown structure just as mealDb. A part of meal Array but selected as preference
    breakfast: [],
    lunch: [],
    dinner: []
  },
  breakfastCtgLst: [],
  lunchCtgLst: [],
  dinnerCtgLst: []
}

export default state
