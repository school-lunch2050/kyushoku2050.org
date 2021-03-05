<template>
  <picture>
    <source :srcset="`/img/${src}.webp`" type="image/webp" :alt="alt">
    <img :src="`/img/${src}.${fallback}`" :width="width" :height="height" :alt="alt">
  </picture>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    fallback: {
      type: String,
      default: 'png'
    }
  }
})
</script>
