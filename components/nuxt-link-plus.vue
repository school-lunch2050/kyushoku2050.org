<template>
  <nuxt-link v-if="to" :to="to" :append="append" :replace="replace">
    <slot />
  </nuxt-link>
  <fragment v-else>
    <slot />
  </fragment>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    to: {
      type: String,
      default: null
    },
    append: {
      type: Boolean,
      default: false
    },
    replace: {
      type: Boolean,
      default: false
    }
  }
})
</script>
