<template>
  <nuxt-link v-if="to" :to="to" :append="append" :replace="Boolean(replace)">
    <slot />
  </nuxt-link>
  <div v-else>
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    to: {
      type: [String, Object],
      default: null
    },
    append: {
      type: [Boolean, String],
      default: false
    },
    replace: {
      type: [Boolean, String],
      default: false
    }
  }
})
</script>
