export const mealMixin = {
  methods: {
    callVuexActionWrapper (attr, payload) {
      var preferencesObj = {}
      preferencesObj['attr'] = attr
      preferencesObj['payload'] = payload
      this.$store.dispatch('meals/updMealPreferences', preferencesObj).then(() => {
        console.log('Successfully called action')
      }, (err) => {
        console.log(`Error Reported${err.message}`)
      })
    },
    removeDuplicates (arr) {
      let uniqueArray = []
      for (let i = 0; i < arr.length; i++) {
        if (uniqueArray.indexOf(arr[i]) === -1) {
          uniqueArray.push(arr[i])
        }
      }
      return uniqueArray
    }
  }
}

export default mealMixin
