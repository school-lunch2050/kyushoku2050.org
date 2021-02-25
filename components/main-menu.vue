<template>
  <keep-alive>
    <main-screen
      :key="`main-menu-${selected}`"
      :data-hash="$route.hash || ''"
      :prev="prev"
      :next="next"
      :lunch-type="selected ? selected : '!'"
    >
      <template #chalkboard>
        <div class="cb--menu">
          <text-box
            :key="title ? null : 'weblate.main.title'"
            :text="title ? title : null"
            class="font--tex cb--menu--title"
            align="center center"
            width="2235"
            height="300"
            :y="padding"
          />
          <table class="cb--menu--table">
            <tbody>
              <tr>
                <th class="cb--menu--weather">
                  <img src="/img/weather_15.webp">
                </th>
                <main-menu-item
                  num="1"
                  item="garden"
                  :active="active"
                  :selected="selected"
                />
                <main-menu-item
                  num="2"
                  item="cosmopolitan"
                  :active="active"
                  :selected="selected"
                />
              </tr>
              <tr>
                <th class="cb--menu--weather">
                  <img src="/img/weather_2p.webp">
                </th>
                <main-menu-item
                  num="3"
                  item="gamble"
                  :active="active"
                  :selected="selected"
                />
                <main-menu-item
                  num="4"
                  item="desperate"
                  :active="active"
                  :selected="selected"
                />
              </tr>
              <tr class="cb--menu--place">
                <td />
                <th><img src="/img/place_local.webp"></th>
                <th><img src="/img/place_global.webp"></th>
              </tr>
            </tbody>
          </table>
        </div>
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
          <slot />
        </view-box>
      </template>
    </main-screen>
  </keep-alive>
</template>
<script lang="ts">
import Vue from 'vue'

import { Store } from 'vuex/types'
import { styleRect } from '../lib'

function mark (store: Store<any>, type: string) {
  store.commit('progress/mark', type)
}

function onActive (this: Vue) {
  if (!this.$props.selected) {
    this.$store.commit('progress/mark', 'menu')
  }
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
  mounted: onActive,
  updated: onActive,
  methods: {
    gotoMain () {
      const { location } = this.$router.resolve({ hash: '#' }, this.$route)
      this.$router.push(location)
    }
  }
})
</script>
