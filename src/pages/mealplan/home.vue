<template>
  <q-page class="flex flex-center">
    <h3 class="margin-top-bottom20 text-weight-light">Select your preferences</h3>
    <q-btn-toggle
      v-model="btnToggle"
      toggle-color="primary"
      @input="btnToggled()"
      :options="[
        {label: 'Breakfast', value: 'breakfast'},
        {label: 'Lunch', value: 'lunch'},
        {label: 'Dinner', value: 'dinner'}
      ]"
    />
    <div id="breakfast" v-if="btnToggle === 'breakfast'" class="text-center margin-top20">
      <q-card inline style="width:100px;height:80px;margin:5px;" @click.native="showModal(ctg.id)" v-for="ctg in breakfastCtgLst" :key="ctg.id">
        <p class="ctg-text relative-position text-weight-medium">{{ ctg.category }}</p>
      </q-card>
      <div id="modals">
        <q-modal v-model="opened" content-css="padding: 50px">
          <div v-for="ctg in breakfastCtgLst" :key="ctg.id" v-if="shouldIAppear('modal-' + ctg.id)">
            <h4>{{ ctg.name }}</h4>
            <q-checkbox v-for="subCtg in ctg.subCategories" :key="subCtg" v-model="selectedSubCtgs[ctg.type].find(sub => sub.name === subCtg).model" checked="true" :val="subCtg" :label="subCtg" :style="{display: 'block'}" @input="checkboxChanged(subCtg, ctg)"/>
          </div>
          <q-btn
            color="primary"
            @click="opened = false"
            label="Close"
            class="margin-top40"
          />
        </q-modal>
      </div>
    </div>
    <div id="lunch" v-if="btnToggle === 'lunch'" class="text-center margin-top20">
      <q-card inline style="width:100px;height:80px;margin:5px;" @click.native="showModal(ctg.id)" v-for="ctg in lunchCtgLst" :key="ctg.id">
        <p class="ctg-text relative-position text-weight-medium">{{ ctg.category }}</p>
      </q-card>
      <div id="modals">
        <q-modal v-model="opened" content-css="padding: 50px">
          <div v-for="ctg in lunchCtgLst" :key="ctg.id" v-if="shouldIAppear('modal-' + ctg.id)">
            <h4>{{ ctg.name }}</h4>
            <q-checkbox v-for="subCtg in ctg.subCategories" :key="subCtg" v-model="selectedSubCtgs[ctg.type].find(sub => sub.name === subCtg).model" checked="true" :val="subCtg" :label="subCtg" :style="{display: 'block'}" @input="checkboxChanged(subCtg, ctg)"/>
          </div>
          <q-btn
            color="primary"
            @click="opened = false"
            label="Close"
            class="margin-top40"
          />
        </q-modal>
      </div>
    </div>
    <div id="dinner" v-if="btnToggle === 'dinner'" class="text-center margin-top20">
      <q-card inline style="width:100px;height:80px;margin:5px;" @click.native="showModal(ctg.id)" v-for="ctg in dinnerCtgLst" :key="ctg.id">
        <p class="ctg-text relative-position text-weight-medium">{{ ctg.category }}</p>
      </q-card>
      <div id="modals">
        <q-modal v-model="opened" content-css="padding: 50px">
          <div v-for="ctg in dinnerCtgLst" :key="ctg.id" v-if="shouldIAppear('modal-' + ctg.id)">
            <h4>{{ ctg.name }}</h4>
            <q-checkbox v-for="subCtg in ctg.subCategories" :key="subCtg" v-model="selectedSubCtgs[ctg.type].find(sub => sub.name === subCtg).model" checked="true" :val="subCtg" :label="subCtg" :style="{display: 'block'}" @input="checkboxChanged(subCtg, ctg)"/>
          </div>
          <q-btn
            color="primary"
            @click="opened = false"
            label="Close"
            class="margin-top40"
          />
        </q-modal>
      </div>
    </div>
    <router-link
      :to="{ name: 'plan' }"
      active-class="active"
      class="nav-link"
    >
      <q-btn color="secondary" class="margin-top-bottom20">Generate My Plan</q-btn>
    </router-link>
  </q-page>
</template>
<script>
import { mapState } from 'vuex'
import mealMixin from '../../components/mixins/utils.js'

export default {
  name: 'categories-home',
  mixins: [mealMixin],
  data () {
    return {
      selectedTab: 'breakfast',
      openModalRef: '',
      opened: false,
      checked: true,
      btnToggle: 'breakfast',
      selectedSubCtgs: {
        breakfast: [],
        lunch: [],
        dinner: []
      }
    }
  },
  created () {
    this.initMeals()
  },
  computed: {
    ...mapState('meals', ['meals', 'mealPreferences', 'breakfastSubCtgLst', 'lunchSubCtgLst', 'dinnerSubCtgLst', 'breakfastCtgLst', 'lunchCtgLst', 'dinnerCtgLst'])
    // breakfastCategories: 'meals/fetchBrCtgLst', // Breakfast Categories
    // subCategories: 'meals/fetchBrSubCtgLst' // Breakfast Sub Categories
  },
  methods: {
    btnToggled () {
      this.selectedTab = this.btnToggled
    },
    showModal (modalRefId) {
      // console.log('Card clicked')
      this.openModalRefId = modalRefId
      this.opened = true
    },
    shouldIAppear (modalRef) {
      if (('modal-' + this.openModalRefId) === modalRef) {
        return true
      } else {
        return false
      }
    },
    checkboxChanged (subCtg, ctg) {
      this.callVuexActionWrapper(ctg.type + 'SubCtgLst', this.selectedSubCtgs[ctg.type])
    },
    refineMealList () {
      var refMeals = []
      // Initially few relevant questions would be asked to know more about the preference
      // we need to adjust the meal list accordingly based on the user input
      // As of 5-May-18 three questions are being asked - Num of day, veg/egg/non-veg and non-veg days
      // Out of these as of now veg/egg/non-veg is the input that will affect meal list. Lets do it.
      // In future, more questions would come up and they can be handled here.

      // vegeggnonveg choice
      // non-veg - everything remains as is. no change
      // veg-egg - nonveg needs to be removed
      // veg - both vegegg and nonveg need to be removed
      switch (this.mealPreferences.vegEggNonVegChoice) {
        case 'veg':
          refMeals = this.meals.filter(m => (m.mealType === 'veg'))
          break
        case 'vegegg':
          refMeals = this.meals.filter(m => (m.mealType !== 'nonveg'))
          break
        default:
          refMeals = this.meals
          break
      }
      console.log('Refmeals length: ' + refMeals.length)
      return refMeals
    },
    mealCtgLst (mealTime) {
      // Fetch Breakfast Categories List
      var mealCtgLst = []
      var numMeals = 0
      var idx = 0
      var meals = []
      // Based on the initial questions meals list need to be pruned
      meals = this.refineMealList()
      numMeals = meals.length
      // console.log('mealCtgLst invoked with ' + mealTime)
      for (var i = 0; i < numMeals; i++) {
        var obj = {}
        var meal = meals[i]
        if (meal.mealTime === mealTime) {
          if (mealCtgLst.findIndex(m => m.category === meal.category) === -1) {
            obj['id'] = idx
            obj['type'] = meal.mealTime
            obj['category'] = meal.category
            obj['subCategories'] = meal.subCategories
            console.log('fetchMealCtgLst: subCategories: ' + obj['subCategories'] + ' Iteration : ' + i)
            idx++
            mealCtgLst.push(obj)
          } else {
            var ctg = mealCtgLst.find(c => c.category === meal.category)
            var subCtg = meal.subCategories
            for (var j = 0; j < subCtg.length; j++) {
              if (ctg.subCategories) {
                if (ctg.subCategories.indexOf(subCtg[j]) === -1) {
                  ctg.subCategories.push(subCtg[j])
                }
              } else {
                ctg.subCategories.push(subCtg[j])
              }
            }
          }
        }
      }
      return mealCtgLst
    },
    mealSubCtgLst (mealTime, mealCtgLst) {
      // Fetch Breakfast Sub Categories
      var subCtgLst = []
      for (var i = 0; i < mealCtgLst.length; i++) {
        // var subCtgLen = mealCtgLst[i].subCategories.length
        // for (var k = 0; k < subCtgLen; k++) {
        //   var subCtg = mealCtgLst[i].subCategories[k]
        //   if (subCtgLst.length > 0) {
        //     if (subCtgLst.indexOf(subCtg) === -1) {
        //       subCtgLst.push(subCtg)
        //     }
        //   } else {
        //     subCtgLst.push(subCtg)
        //   }
        // }
        subCtgLst = subCtgLst.concat(mealCtgLst[i].subCategories)
      }
      subCtgLst = this.removeDuplicates(subCtgLst)
      return subCtgLst
    },
    initMeals () {
      for (var mealTime of ['breakfast', 'lunch', 'dinner']) {
        var mealCtgLst = this.mealCtgLst(mealTime)
        this.callVuexActionWrapper(mealTime + 'CtgLst', mealCtgLst)

        var subCtgLst = this.mealSubCtgLst(mealTime, mealCtgLst)
        var numSubs = subCtgLst.length

        for (var i = 0; i < numSubs; i++) {
          var obj = {}
          obj['name'] = subCtgLst[i]
          obj['model'] = true
          this.selectedSubCtgs[mealTime].push(obj)
        }
        this.callVuexActionWrapper(mealTime + 'SubCtgLst', this.selectedSubCtgs[mealTime])
      }
    }
  }
}
</script>
<style scoped>
.q-card {
  width:100px;
  height:80px;
  margin:5px;
}
.ctg-text {
  margin-top:17px;
  margin-left:5px;
  margin-right:5px;
  word-wrap: break-word;
}
.margin-top40 {
  margin-top:40px;
}
.margin-top20 {
  margin-top:20px;
}
.margin-top-bottom20 {
  margin:20px 0px 20px 0px;
}
</style>
