<template>
  <g :transform="`translate(${x}, ${y})`">
    <SVGCenterBox line-height="150" width="400" height="90" :text="title" class="cb--option--title font--tex" />
    <image y="100" width="400" height="400" :href="image" />
  </g>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    x: {
      type: String,
      required: true
    },
    y: {
      type: String,
      required: true
    }
  }
})
</script>
