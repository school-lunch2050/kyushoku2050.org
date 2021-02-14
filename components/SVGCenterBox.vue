<template>
  <g :x="x" :y="y" :width="width" :height="height">
    <svg
      v-for="line in lines"
      :key="line.index"
      :width="width"
      :height="lineHeight"
      :y="line.y"
    ><SVGRuby x="50%" y="50%" text-anchor="middle" :text="line.text" /></svg>
  </g>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    lineHeight: {
      type: [String, Number],
      required: true
    },
    width: {
      type: [String, Number],
      required: true
    },
    height: {
      type: [String, Number],
      required: true
    },
    x: {
      type: [String, Number],
      default: null
    },
    y: {
      type: [String, Number],
      default: null
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    lines () {
      const lines = this.$props.text.split('\n')
      if (lines[lines.length - 1] === '') {
        lines.pop()
      }
      const height = lines.length * parseFloat(this.$props.lineHeight)
      const yOffset = (parseFloat(this.$props.height) - height) / 2
      return lines.map((text, index) => {
        return { text, index, y: yOffset + (index * this.$props.lineHeight) }
      })
    }
  }
})
</script>
