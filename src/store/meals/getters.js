/* ============
 * Getters for the meals module
 * ============
 */

export default {
  // allMeals: state => state.meals, // would need action/mutation if data fetched async
  fetchNumMeals: (state) => {
    return (state.meals) ? state.meals.length : 0
  },
  fetchMeals: (state) => {
    return state.meals
  }
  // fetchAllMeals: (state) => {
  //   // Mock server request
  //   // let promise = new Promise(resolve => resolve(slug))
  //   return state.products.cards
  // },
  // fetchBrCtgLst: (state) => {
  //   // Fetch Breakfast Categories List
  //   var brCtgLst = []
  //   var meals = state.meals
  //   var numMeals = state.meals.length
  //   var idx = 0
  //   for (var i = 0; i < numMeals; i++) {
  //     var obj = {}
  //     var meal = meals[i]
  //     if (meal.mealTime === 'breakfast') {
  //       if (brCtgLst.findIndex(m => m.category === meal.category) === -1) {
  //         obj['id'] = idx
  //         obj['type'] = meal.mealTime
  //         obj['category'] = meal.category
  //         // obj['subCategories'] = meal.subCategories.split(',')
  //         obj['subCategories'] = meal.subCategories
  //         // console.log('fetchBrCtgLst: subCategories: ' + obj['subCategories'] + ' Iteration : ' + i)
  //         idx++
  //         brCtgLst.push(obj)
  //       } else {
  //         var ctg = brCtgLst.find(c => c.category === meal.category)
  //         // console.log('fetchBrCtgLst: ctg = ' + ctg)
  //         // var numSubCtg = meal.subCategories.length
  //         // var subCtg = meal.subCategories.split(',')
  //         var subCtg = meal.subCategories
  //         // ctg.subCategories.push(subCtg)
  //         for (var j = 0; j < subCtg.length; j++) {
  //           if (ctg.subCategories) {
  //             if (ctg.subCategories.indexOf(subCtg[j]) === -1) {
  //               console.log('Going to push: ' + subCtg[j])
  //               ctg.subCategories.push(subCtg[j])
  //             }
  //           } else {
  //             ctg.subCategories.push(subCtg[j])
  //           }
  //         }
  //         console.log('After adding new category: ' + ctg.subCategories)
  //       }
  //     }
  //   }
  //   // return state.meals.filter(m => m.mealTime === 'breakfast')
  //   return brCtgLst
  // },
  // fetchBrSubCtgLst: (state, getters) => (mealTime) => {
  //   var brCtgLst = getters.fetchBrCtgLst
  //   // Fetch Breakfast Sub Categories
  //   var subCtgLst = []
  //   // var breakfastCtg = state.meals.filter(m => m.mealTime === 'breakfast')
  //   for (var i = 0; i < brCtgLst.length; i++) {
  //     var subCtgLen = brCtgLst[i].subCategories.length
  //     console.log('subCtgLen: ' + subCtgLen)
  //     for (var k = 0; k < subCtgLen; k++) {
  //       var subCtg = brCtgLst[i].subCategories[k]
  //       if (subCtgLst) {
  //         if (subCtgLst.indexOf(subCtg) === -1) {
  //           subCtgLst.push(subCtg)
  //         }
  //       } else {
  //         subCtgLst.push(subCtg)
  //       }
  //     }
  //   }
  //   console.log('SubCtg: ' + subCtgLst)
  //   return subCtgLst
  //   // return state.breakfastCtg.find(b => b.id === categoryId).subCtg
  // },
  // fetchAllBreakfast: (state) => {
  //   return state.meals.find(m => m.mealTime === 'breakfast')
  // }
}
