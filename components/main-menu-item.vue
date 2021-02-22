<template>
  <td :class="`cb--menu--item font--tex ${selected === item ? 'cb--menu--item--active' : active ? 'cb--menu--item--button' : ''}`">
    <nuxt-link-plus :to="link" replace="true">
      <text-box :key="text" />
    </nuxt-link-plus>
  </td>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    num: {
      type: String,
      required: true
    },
    item: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false
    },
    selected: {
      type: String,
      default: null
    }
  },
  computed: {
    text () {
      // @ts-ignore
      const { active, num, item } = this.$props as { active: boolean, item: string, num: string }
      return active ? `weblate.${item}.short` : num
    },
    link () {
      // @ts-ignore
      const { $props: { active, item }, localePath } = (this as { $props: { active: boolean, item: string }, localePath: (str: string) => string })
      return active ? localePath(`/main-${item}`) : null
    }
  }
})
</script>
