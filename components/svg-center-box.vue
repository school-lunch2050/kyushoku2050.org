<template>
  <g :transform="transform" :height="height">
    <svg
      v-for="line in lines"
      :key="line.index"
      :width="width"
      :height="lineHeight"
      :y="line.y"
    ><svg-ruby x="50%" y="50%" text-anchor="middle" :text="line.text" /></svg>
  </g>
</template>
<script lang="ts">
import Vue from 'vue'

function toNumber (input: string | number | null | undefined, fallback: number = 0): number {
  if (typeof input === 'string') {
    return parseFloat(input)
  }
  if (typeof input === 'number') {
    return input
  }
  return fallback
}

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
    transform () {
      // @ts-ignore
      const { x: xRaw, y: yRaw } = this.$props as { x?: string | number, y?: string | number }
      const x = toNumber(xRaw)
      const y = toNumber(yRaw)
      if (x !== 0 || y !== 0) {
        return `translate(${x}, ${y})`
      }
      return null
    },
    lines () {
      // @ts-ignore - The types of vue seem to be off when we have a computed element
      const { lineHeight: lineHeightRaw, height: heightRaw } = this.$props as Record<string, any>
      const lineHeight = toNumber(lineHeightRaw)
      const height = toNumber(heightRaw)
      const lines = String(this.$props.text).split('\n')
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
