<template>
  <main-screen
    :data-hash="$route.hash || ''"
    :prev="prev"
    :next="next"
    :lunch-type="selected ? selected : '!'"
  >
    <template #chalkboard>
      <div class="cb--menu">
        <h1 class="cb--menu--title font--tex">
          <text-box :key="title" />
        </h1>
        <table key="menu-table" class="cb--menu--table" aria-label="Choices">
          <tbody>
            <tr>
              <th class="cb--menu--weather">
                <kyushoku-img src="weather_15" :alt="$t('weblate.main.row', { row: $t('weblate.main.grid.warm') })" />
              </th>
              <main-menu-item
                key="item-1"
                num="1"
                item="garden"
                :active="active"
                :selected="selected"
              />
              <main-menu-item
                key="item-2"
                num="2"
                item="cosmopolitan"
                :active="active"
                :selected="selected"
              />
            </tr>
            <tr>
              <th class="cb--menu--weather">
                <kyushoku-img src="weather_2p" :alt="$t('weblate.main.row', { row: $t('weblate.main.grid.hot') })" />
              </th>
              <main-menu-item
                key="item-3"
                num="3"
                item="desperate"
                :active="active"
                :selected="selected"
              />
              <main-menu-item
                key="item-4"
                num="4"
                item="gamble"
                :active="active"
                :selected="selected"
              />
            </tr>
            <tr class="cb--menu--place">
              <td aria-label="hidden" />
              <th><kyushoku-img src="place_local" :alt="$t('weblate.main.column', { column: $t('weblate.main.grid.near') })" /></th>
              <th><kyushoku-img src="place_global" :alt="$t('weblate.main.column', { column: $t('weblate.main.grid.far') })" /></th>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template v-if="lunch" #lunch>
      <lunch-item v-for="ingredient in lunch.ingredients" :key="ingredient.key" />
    </template>
    <template v-if="lunch" #body>
      <div class="lunch-detail--spacer">
        <text-box key="weblate.scenario.actions.more" class="font--tex" />
      </div>
      <view-box
        :key="`illustration-${lunch.id}`"
        class="view-box--illustration"
        :data-hash="$route.hash || ''"
        :get-viewbox="getViewbox"
        :unfocus="gotoMain"
        width="3157"
        height="2500"
      >
        <kyushoku-img class="illustration--image" width="3157" height="2500" :src="`illustration/${lunch.id}`" fallback="jpg" />
        <text-box :key="`weblate.main.grid.${lunch.weather.type}`" align="center center" :class="`illustration--weather--${lunch.weather.type} font--tex`" :custom-style="lunch.weather.style" />
        <text-box :key="`weblate.main.grid.${lunch.location.type}`" align="center center" class="illustration--location font--tex" :custom-style="lunch.location.style" />
        <text-box :key="`weblate.pages.${lunch.id}.full`" class="illustration--title font--tex" :custom-style="lunch.title" font-size="100" align="center center" />
        <bubble-text v-for="(bubble, index) in lunch.bubbles" :key="bubble.id" :nr="index + 1" />
      </view-box>
      <!--<bubble-info v-if="getBubble()" :key="getBubble().id" />-->
    </template>
  </main-screen>
</template>
<script lang="ts">
import Vue from 'vue'
import { Store } from 'vuex/types'
import { Bubble, bubbles } from '../assets/bubbles'
import { Lunch, lunches } from '../assets/lunches'

function mark (store: Store<any>, type: string) {
  store.commit('progress/mark', type)
}

export default Vue.extend({
  props: {
    prev: {
      type: String,
      default: null
    },
    next: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: 'weblate.main.title'
    },
    selected: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const lunch = lunches[this.$props.selected as Lunch]
    const getBubble = () => {
      const bubbleKey = (this.$route.hash ?? '').substr(1) as Bubble
      return bubbles[bubbleKey]
    }
    return {
      lunch,
      getBubble,
      getViewbox: () => {
        const bubbleData = getBubble()
        if (!bubbleData) {
          mark(this.$store, this.$props.selected)
          return null
        }
        mark(this.$store, `bubble.${bubbleData.id}`)
        return bubbleData
      }
    }
  },
  methods: {
    gotoMain () {
      const { location } = this.$router.resolve({ hash: '#' }, this.$route)
      this.$router.push(location)
    }
  }
})
</script>
