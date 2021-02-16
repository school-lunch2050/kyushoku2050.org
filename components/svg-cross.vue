<template>
  <g :stroke="stroke">
    <line :x1="x" :y1="y + height / 2" :x2="x + width" :y2="y + height / 2" />
    <line :x1="x + width / 2" :y1="y" :x2="x + width / 2" :y2="y + height" />
  </g>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    x: {
      type: Number,
      required: false,
      default: 0
    },
    y: {
      type: Number,
      required: false,
      default: 0
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    stroke: {
      type: String,
      default: null
    }
  }
})
</script>
