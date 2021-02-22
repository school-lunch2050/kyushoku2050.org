<template>
  <keep-alive>
    <main-screen :prev="prev" :next="next" :lunch-type="selected ? selected : '!'">
      <div class="cb--menu">
        <text-box
          :key="title ? title : 'weblate.main.title'"
          class="font--tex cb--menu--title"
          align="center center"
          width="2235"
          height="300"
          :y="padding"
        />
        <table class="cb--menu--table">
          <tr>
            <th class="cb--menu--weather"><img src="/img/weather_15.webp"></th>
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
            <th class="cb--menu--weather"><img src="/img/weather_2p.webp"></th>
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
        </table>
      </div>
    </main-screen>
  </keep-alive>
</template>
<script lang="ts">
import Vue from 'vue'

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
      }
    }
  }
})
</script>
