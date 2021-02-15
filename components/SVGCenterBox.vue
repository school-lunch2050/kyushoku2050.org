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
      // @ts-ignore - The types of vue seem to be off when we have a computed element
      const { lineHeight: lineHeightRaw, height: heightRaw } = this.$props as Record<string, any>
      const lineHeight = parseFloat(lineHeightRaw)
      const height = parseFloat(heightRaw)
      const lines = this.$props.text.split('\n')
      if (lines[lines.length - 1] === '') {
        lines.pop()
      }
      const blockHeight = lines.length * lineHeight
      const yOffset = (height - blockHeight) / 2
      return lines.map((text: string, index: number) => {
        return { text, index, y: yOffset + (index * lineHeight) }
      })
    }
  }
})
</script>
