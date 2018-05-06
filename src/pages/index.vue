<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="text-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
    <div id="q1" v-if="amIVisible(1)">
      <div class="q-headline text-weight-light margin15vh10vh">
        Your Meal Preference?
      </div>
      <div class="margin40-0" >
        <q-btn class="min-width214 text-weight-medium" color="secondary" size="lg" label="Vegetarian" @click="mealTypeInput('veg')"/>
      </div>
      <div class="margin40-0">
        <q-btn class="min-width214 text-weight-medium" color="secondary" size="lg" label="Vegetarian + Egg" @click="mealTypeInput('vegegg')"/>
      </div>
      <div class="margin40-0" >
        <q-btn class="min-width214 text-weight-medium" color="secondary" size="lg" label="Non-Vegetarian" @click="mealTypeInput('nonveg')"/>
      </div>
    </div>
    <div id="q2" v-if="amIVisible(2)">
      <div class="q-headline text-weight-light margin15vh10vh">
        Days you need the meal plan for?
      </div>
      <div class="margin40-0" >
        <q-btn class="min-width214 text-weight-medium" color="secondary" size="lg" label="5 Days" @click="scheduleDaysInput(5)"/>
      </div>
      <div class="margin40-0">
        <q-btn class="min-width214 text-weight-medium" color="secondary" size="lg" label="7 Days" @click="scheduleDaysInput(7)"/>
      </div>
      <div class="margin40-0" >
        <q-btn class="min-width214 text-weight-medium" color="secondary" size="lg" label="14 Days" @click="scheduleDaysInput(14)"/>
      </div>
      <div class="row" style="margin-top:9vh">
        <div class="col-4">
          <a class="min-width214 flat text-weight-medium" size="lg" label="Back" @click="goBack(1)"><q-icon name="arrow_back" style="font-size: 35px"/></a>
        </div>
        <div class="col-4"></div>
        <div class="col-4" v-if="this.filters.find(p => p.type === 'mealType').value !== 'nonveg'">
          <router-link
            :to="{ name: 'preferences' }"
            active-class="active"
            class="nav-link"
          >
            <q-icon name="arrow_forward" style="font-size: 35px"/>
          </router-link>
        </div>
      </div>
    </div>
    <div id="q3" v-if="amIVisible(3)">
      <div class="q-headline text-weight-light margin15vh10vh">
        Days you would prefer to have Non-veg?
      </div>
      <q-option-group
        class="text-left mgn-l-20"
        color="secondary"
        type="toggle"
        @input="optChanged"
        v-model="group"
        :options="[
          { label: 'Monday', value: 1, },
          { label: 'Tuesday', value: 2 },
          { label: 'Wednesday', value: 3 },
          { label: 'Thursday', value: 4 },
          { label: 'Friday', value: 5 },
          { label: 'Saturday', value: 6 },
          { label: 'Sunday', value: 7 }
        ]"
      />
      <div class="row" style="margin-top:9vh">
        <div class="col-4">
          <a class="min-width214 flat text-weight-medium" size="lg" label="Back" @click="goBack(1)"><q-icon name="arrow_back" style="font-size: 35px"/></a>
        </div>
        <div class="col-4"></div>
        <div class="col-4">
          <router-link
            :to="{ name: 'preferences' }"
            active-class="active"
            class="nav-link"
          >
            <q-icon name="arrow_forward" style="font-size: 35px"/>
          </router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import mealMixin from '../components/mixins/utils.js'

export default {
  name: 'PageIndex',
  mixins: [mealMixin],
  data () {
    return {
      qSelection: 1,
      group: [],
      filters: [
        {
          id: 1,
          type: 'mealType',
          answered: false,
          value: ''
        },
        {
          id: 2,
          type: 'daysCount',
          answered: false,
          value: ''
        },
        {
          id: 3,
          type: 'nonVegDays',
          answered: false,
          value: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      meals: 'meals/fetchMeals'
    })
  },
  methods: {
    // callVuexActionWrapper (attr, payload) {
    //   var preferencesObj = {}
    //   preferencesObj['attr'] = attr
    //   preferencesObj['payload'] = payload
    //   this.$store.dispatch('meals/updMealPreferences', preferencesObj).then(() => {
    //     console.log('Successfully called action')
    //   }, (err) => {
    //     console.log(`Error Reported${err.message}`)
    //   })
    // },
    mealTypeInput (pref) {
      var filter = this.filters.find(p => p.type === 'mealType')
      filter.value = pref
      filter.answered = true
      this.qSelection = this.filters.find(p => p.answered === false).id
      this.callVuexActionWrapper('vegEggNonVegChoice', pref)
    },
    scheduleDaysInput (days) {
      var filter = this.filters.find(p => p.type === 'daysCount')
      filter.value = days
      filter.answered = true
      this.qSelection = this.filters.find(p => p.answered === false).id
      this.callVuexActionWrapper('scheduleDays', days)
      if (this.filters.find(p => p.type === 'mealType').value !== 'nonveg') {
        this.$router.push({ path: 'preferences' })
      }
    },
    goBack () {
      var currQId = this.qSelection
      var prevQId = currQId - 1
      this.qSelection = prevQId
      var filter = this.filters.find(p => p.id === prevQId)
      filter.answered = false
      filter.value = ''
    },
    amIVisible (qId) {
      if (qId === this.qSelection) {
        if (this.filters.find(p => p.id === qId).type === 'nonVegDays') {
          if (this.filters.find(p => p.type === 'mealType').value === 'nonveg') {
            return true
          } else {
            return false
          }
        }
        return true
      } else {
        return false
      }
    },
    optChanged () {
      console.log('changed ' + this.group)
      this.callVuexActionWrapper('nonVegDays', this.group)
    }
  }
}
</script>

<style scoped>
.min-width214 {
  min-width:214px;
}
.margin40-0 {
  margin:40px 0px;
}
.margin15vh10vh {
  margin:15vh 5vw 0vh 5vw;
  /* margin-bottom:10vh; */
}
.mgn-l-20 {
  margin-left:20px;
}
.q-option {
  margin:20px;
}
</style>
