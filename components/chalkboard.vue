<template>
  <div class="cb" :aria-label="$t('weblate.menu.chalkboard')">
    <kyushoku-img width="2586" height="1770" src="chalkboard" aria-hidden="true" />
    <div class="cb--content">
      <slot />
    </div>
    <div class="cb--button-bar">
      <NuxtLink v-if="next" :to="localePath(next)" class="button--next font--tex" :aria-label="$t('weblate.menu.actions.next.title')">
        <text-box key="weblate.menu.actions.next.label" />
      </NuxtLink>
      <NuxtLink v-if="prev" :to="localePath(prev)" class="button--prev font--tex" :aria-label="$t('weblate.menu.actions.prev.title')">
        <text-box key="weblate.menu.actions.prev.label" />
      </NuxtLink>
    </div>
  </div>
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
    }
  }
})
</script>
