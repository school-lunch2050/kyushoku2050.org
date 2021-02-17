<template>
  <keep-alive>
    <main-screen :prev="prev" :next="next" :lunch-type="selected ? selected : '!'">
      <g class="cb--menu">
        <svg-center-box
          class="font--tex cb--menu--title"
          width="2235"
          height="300"
          :y="padding"
          line-height="220"
          :text="title ? title : $t('weblate.main.title')"
        />
        <svg-cross :width="width" :height="height" :x="x" :y="y" stroke="white" />
        <image href="/img/weather_15.webp" :x="x - iconWidth - padding" :y="y + (height / 4 * 1) - (iconWidth / 2)" :width="iconWidth" :height="iconWidth" />
        <image href="/img/weather_2p.webp" :x="x - iconWidth - padding" :y="y + (height / 4 * 3) - (iconWidth / 2)" :width="iconWidth" :height="iconWidth" />
        <image href="/img/place_local.webp" :x="x + (width / 4 * 1) - (iconWidth / 2)" :y="y + height + padding" :width="iconWidth" :height="iconWidth" />
        <image href="/img/place_global.webp" :x="x + (width / 4 * 3) - (iconWidth / 2)" :y="y + height + padding" :width="iconWidth" :height="iconWidth" />
        <main-menu-item
          num="1"
          item="garden"
          :active="active"
          :selected="selected"
          :place="{ x, y, ...item }"
        />
        <main-menu-item
          num="2"
          item="cosmopolitan"
          :active="active"
          :selected="selected"
          :place="{ x: x + item.width, y, ...item }"
        />
        <main-menu-item
          num="3"
          item="gamble"
          :active="active"
          :selected="selected"
          :place="{ x, y: y + item.height, ...item }"
        />
        <main-menu-item
          num="4"
          item="desperate"
          :active="active"
          :selected="selected"
          :place="{ x: x + item.width, y: y + item.height, ...item }"
        />
      </g>
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
