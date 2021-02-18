<template>
  <keep-alive>
    <div class="cb">
      <img width="2586" height="1770" src="/img/chalkboard.webp">
      <div :class="`cb--content`">
        <slot />
      </div>
      <div class="cb--button-bar">
        <NuxtLink v-if="prev" :to="localePath(prev)" class="button--prev font--tex">
          <text-box key="weblate.menu.actions.prev" />
        </NuxtLink>
        <NuxtLink v-if="next" :to="localePath(next)" class="button--next font--tex">
          <text-box key="weblate.menu.actions.next" />
        </NuxtLink>
      </div>
    </div>
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
