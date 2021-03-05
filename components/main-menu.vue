<template>
  <main-screen
    :data-hash="$route.hash || ''"
    :prev="prev"
    :next="next"
    :lunch-type="selected ? selected : '!'"
  >
    <template #chalkboard>
      <div class="cb--menu">
        <text-box
          :key="title ? 'title' : 'weblate.main.title'"
          :text="title ? title : null"
          class="font--tex cb--menu--title"
          align="center center"
          width="2235"
          height="300"
          :y="padding"
        />
        <table key="menu-table" class="cb--menu--table">
          <tbody>
            <tr>
              <th class="cb--menu--weather">
                <kyushoku-img src="weather_15" />
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
                <kyushoku-img src="weather_2p" />
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
              <td />
              <th><kyushoku-img src="place_local" /></th>
              <th><kyushoku-img src="place_global" /></th>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #lunch>
      <slot name="lunch" />
    </template>
    <template v-if="selected" #body>
      <div class="lunch-detail--spacer">
        <text-box key="weblate.scenario.actions.more" class="font--tex" />
      </div>
      <view-box
        :key="`illustration-${selected}`"
        class="view-box--illustration"
        :data-hash="$route.hash || ''"
        :get-viewbox="getViewbox"
        :unfocus="gotoMain"
        width="3157"
        height="2500"
      >
        <slot name="illustration" />
      </view-box>
    </template>
  </main-screen>
</template>
<script lang="ts">
import Vue from 'vue'

import { Store } from 'vuex/types'
import { styleRect } from '../lib'

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
      default: null
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
    const x = 300
    const y = 350
    const width = 1850
    const height = 600
    return {
      x,
      y,
      width,
      height,
      iconWidth: 275,
      padding: 18,
      item: {
        width: width / 2,
        height: height / 2
      },
      getViewbox: (container?: HTMLElement) => {
        if (!container) {
          mark(this.$store, this.$props.selected)
          return null
        }
        const id = (this.$route.hash ?? '').substr(1)
        const elem = container.querySelector(`.box--${id}`)
        if (!(elem instanceof HTMLElement)) {
          mark(this.$store, this.$props.selected)
          return null
        }
        mark(this.$store, `${this.$props.selected}.${id}`)
        return {
          id,
          rect: styleRect(elem)
        }
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
