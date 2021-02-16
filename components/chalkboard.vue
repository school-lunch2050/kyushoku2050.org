<template>
  <svg
    class="cb"
    viewBox="0 0 2586 1770"
    version="1.1"
    :x="x"
    :y="y"
    :width="width"
    :height="height"
  >
    <keep-alive>
      <image width="2586" height="1770" href="/img/chalkboard.webp" />
    </keep-alive>
    <NuxtLink v-if="prev" :to="localePath(prev)" class="button--prev font--tex" transform="translate(150, 1500)">
      <g>
        <svg-ruby text-anchor="start" :text="`${$t('weblate.menu.actions.prev')}`" />
        <rect width="400" x="-50" y="-125" height="200" />
      </g>
    </NuxtLink>
    <NuxtLink v-if="next" :to="localePath(next)" class="button--next font--tex" transform="translate(2400, 1500)">
      <g>
        <svg-ruby text-anchor="end" :text="`${$t('weblate.menu.actions.next')}`" />
        <rect width="400" x="-350" y="-125" height="200" />
      </g>
    </NuxtLink>
    <g :class="`cb--content`">
      <slot />
    </g>
  </svg>
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
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100%'
    },
    x: {
      type: [String, Number],
      default: null
    },
    y: {
      type: [String, Number],
      default: null
    }
  }
})
</script>
