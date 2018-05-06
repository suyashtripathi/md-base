/* ============
 * Mutations for the products module
 * ============
 *
 * The mutations that are available on the
 * products module.
 */
/* eslint-disable */

import {
  UPDATE_MEAL_PREFERENCES
} from './mutation-types';


export default {
  [UPDATE_MEAL_PREFERENCES](state, {preferences}) {
    var objIdx = preferences.attr
    console.log('STATE::::: attr received: ' + objIdx)

    // switch (preferences.attr) {
    //   case 'breakfast':
    //     objIdx = 'breakfastSubCtgLst'
    //     break;
    //   case 'lunch':
    //     objIdx = 'lunchSubCtgLst'
    //     break;
    //   case 'dinner':
    //     objIdx = 'dinnerSubCtgLst'
    //     break;
    //   case 'scheduleDays':
    //     objIdx = 'scheduleDays'
    //     break;
    //     case 'vegEggNonVegChoice':
    //     objIdx = 'vegEggNonVegChoice'
    //     break;
    //   case 'nonVegDays':
    //     objIdx = 'nonVegDays'
    //     break;
    //   default:
    //     break;
    // }
    switch (preferences.attr) {
      case 'scheduleDays':
      case 'vegEggNonVegChoice':
      case 'nonVegDays':
      case 'breakfastSubCtgLst':
      case 'lunchSubCtgLst':
      case 'dinnerSubCtgLst':
        state.mealPreferences[objIdx] = preferences.payload
        console.log('STATE:::: payload updated' + state.mealPreferences[objIdx])
        break
      case 'breakfastSelectedMeals':
        state.selectedMeals.breakfast = preferences.payload
        break
      case 'lunchSelectedMeals':
        state.selectedMeals.lunch = preferences.payload
        break
      case 'dinnerSelectedMeals':
        state.selectedMeals.dinner = preferences.payload
        break
      default:
        console.log('STATE:::: default case before: ' + state[objIdx])
        state[objIdx] = preferences.payload
        console.log('STATE:::: payload updated' + state[objIdx])
        break
    }
    
    // console.log('Meal Preferences from State: ' + state.mealPreferences.breakfastSubCtgLst + ' for objIdx: ' + objIdx)
    // console.log("State: VegEggNonVeg : " + state.mealPreferences.vegEggNonVegChoice + " State: scheduleDays : " + state.mealPreferences.scheduleDays + " State: nonVegDays : " + state.mealPreferences.nonVegDays)
  }
}