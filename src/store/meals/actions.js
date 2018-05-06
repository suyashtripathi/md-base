/* ============
 * Actions for the meal update module
 * ============
 *
 * The actions that are available on the
 *  module.
 */
import * as types from './mutation-types'

export const updMealPreferences = ({ commit }, preferences) => {
  commit(types.UPDATE_MEAL_PREFERENCES, {
    preferences: preferences
  })
}

export default {
  updMealPreferences
}
