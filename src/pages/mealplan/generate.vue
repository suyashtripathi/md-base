<template>
  <q-page class="text-center">
    <h3>Your Meal Plan</h3>
    <!-- <p>Schedule plan for days: {{ mealPreferences.scheduleDays }}<br>
    Non Veg days: {{ mealPreferences.nonVegDays }}<br>
    Meal Type preference : {{ mealPreferences.vegEggNonVegChoice }}<br>
    Breakfast SubCategories : {{ mealPreferences.breakfastSubCtgLst }}<br>
    Lunch SubCategories : {{ mealPreferences.lunchSubCtgLst }}<br>
    Dinner SubCategories : {{ mealPreferences.dinnerSubCtgLst }}</p> -->
    <div class="margin-top20">
      <q-card v-for="(day, index) in mealPreferences.scheduleDays" :key="day">
        <h3>Day {{ day }}</h3>
        <p><strong>Breakfast:</strong> {{ getMealFromMealData('breakfast', index) }}</p>
        <p><strong>Lunch:</strong> {{ getMealFromMealData('lunch', index) }}</p>
        <p><strong>Dinner:</strong> {{ getMealFromMealData('dinner', index) }}</p>
      </q-card>
    </div>

    <q-btn color="secondary"  @click="requestRandomIds(['breakfast', 'lunch', 'dinner'])" class="margin-top-bottom20">Something Else</q-btn>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import mealMixin from '../../components/mixins/utils.js'

export default {
  name: 'generate',
  mixins: [mealMixin],
  data () {
    return {
      mealSchedule: {
        breakfast: [],
        lunch: [],
        dinner: []
      }
    }
  },
  created () {
    this.createSelectedPlan()
    this.getRandomIdxs('breakfast')
    this.getRandomIdxs('lunch')
    this.getRandomIdxs('dinner')
  },
  computed: {
    ...mapState('meals', ['meals', 'mealPreferences', 'selectedMeals'])
  },
  methods: {
    requestRandomIds (reqArr) {
      for (var mealTime of reqArr) {
        this.getRandomIdxs(mealTime)
      }
    },
    getMealFromMealData (mealTime, index) {
      if (this.mealSchedule[mealTime].length > 0) {
        var mealIdx = this.mealSchedule[mealTime][index]
        return this.selectedMeals[mealTime][mealIdx].name
      } else {
        return 'Not Available'
      }
    },
    createSelectedPlan () {
      var mealArr = []
      var subCtgArr = []

      for (var mealTime of ['breakfast', 'lunch', 'dinner']) {
        var planArr = []
        mealArr = this.meals.filter(m => m.mealTime === mealTime)
        console.log('MealArr ' + mealTime + ' Length: ' + mealArr.length)
        if (mealArr.length > 0) {
          switch (mealTime) {
            case 'breakfast':
              subCtgArr = this.mealPreferences.breakfastSubCtgLst
              break
            case 'lunch':
              subCtgArr = this.mealPreferences.lunchSubCtgLst
              break
            case 'dinner':
              subCtgArr = this.mealPreferences.dinnerSubCtgLst
              break
          }

          // This mealArr contains all the meals even from
          // the sub categories not selected by the user
          // time to clean this mealArr and have meals only
          // based on the categories opted by the user
          // which we are planning to acheive in the code below

          for (var arr in subCtgArr) {
            console.log('Searching for subCategory: ' + subCtgArr[arr].name)
            // var filteredArr = mealArr.filter(m => m.subCategories.indexOf(subCtgArr[arr].name) !== -1)
            var filteredArr = mealArr.filter(m => m.subCategories.indexOf((subCtgArr[arr].name)) !== -1)
            for (var s = 0; s < filteredArr.length; s++) {
              console.log('Searched for ' + (subCtgArr[arr].name) + ' and matched with ' + filteredArr[s].subCategories)
            }
            planArr = planArr.concat(filteredArr)
          }
          planArr = this.removeDuplicates(planArr)

          // Push selected meals to state
          this.callVuexActionWrapper(mealTime + 'SelectedMeals', planArr)
        }
      }
    },
    getRandomIdxs (mealTime) {
      var idxArr = []
      var n = 0
      // get the respective selected array
      var selectedMealArr = this.selectedMeals[mealTime]

      while ((n < this.mealPreferences.scheduleDays) && (selectedMealArr.length > 0)) {
        var randNum = Math.floor(Math.random() * selectedMealArr.length)
        if (!idxArr.includes(randNum)) {
          idxArr.push(randNum)
          n++
        }
      }
      this.mealSchedule[mealTime] = idxArr
    }
  }
}
</script>
<style scoped>
.q-card {
  margin: 0px 13px;
  padding: 0px 5px 20px 5px;
}
.margin-top-bottom20 {
  margin:20px 0px 20px 0px;
}
</style>
