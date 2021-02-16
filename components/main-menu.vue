<template>
  <main-screen :prev="prev" :next="next" lunch-type="!">
    <g class="cb--menu">
      <svg-center-box
        class="font--tex cb--menu--title"
        width="2235"
        height="400"
        :y="padding"
        line-height="220"
        :text="title"
      />
      <svg-cross :width="width" :height="height" :x="x" :y="y" stroke="white" />
      <image href="/img/weather_15.webp" :x="x - iconWidth - padding" :y="y + (height / 4 * 1) - (iconWidth / 2)" :width="iconWidth" :height="iconWidth" />
      <image href="/img/weather_2p.webp" :x="x - iconWidth - padding" :y="y + (height / 4 * 3) - (iconWidth / 2)" :width="iconWidth" :height="iconWidth" />
      <image href="/img/place_local.webp" :x="x + (width / 4 * 1) - (iconWidth / 2)" :y="y + height + padding" :width="iconWidth" :height="iconWidth" />
      <image href="/img/place_global.webp" :x="x + (width / 4 * 3) - (iconWidth / 2)" :y="y + height + padding" :width="iconWidth" :height="iconWidth" />
      <svg-center-box
        class="cb--menu--item font--tex"
        :line-height="lineHeight"
        :x="x"
        :y="y + lineHeight * 0.3"
        :width="width / 2"
        :height="height / 2"
        :text="a"
      />
      <svg-center-box
        class="cb--menu--item font--tex"
        :line-height="lineHeight"
        :x="x + (width / 2)"
        :y="y + lineHeight * 0.3"
        :width="width / 2"
        :height="height / 2"
        :text="b"
      />
      <svg-center-box
        class="cb--menu--item font--tex"
        :line-height="lineHeight"
        :x="x"
        :y="y + height / 2 + lineHeight * 0.3"
        :width="width / 2"
        :height="height / 2"
        :text="c"
      />
      <svg-center-box
        class="cb--menu--item font--tex"
        :line-height="lineHeight"
        :x="x + (width / 2)"
        :y="y + height / 2 + lineHeight * 0.3"
        :width="width / 2"
        :height="height / 2"
        :text="d"
      />
    </g>
  </main-screen>
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
      required: true
    },
    a: {
      type: String,
      default: '1'
    },
    b: {
      type: String,
      default: '2'
    },
    c: {
      type: String,
      default: '3'
    },
    d: {
      type: String,
      default: '4'
    }
  },
  data () {
    return {
      x: 350,
      y: 425,
      lineHeight: 180,
      width: 1850,
      height: 600,
      iconWidth: 275,
      padding: 20
    }
  }
})
</script>
