<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-if="useDiv" :key="this.$i18n.locale" :style="style" class="i18n-box">
    <span v-html="html" />
  </div>
  <span v-else :key="this.$i18n.locale" :style="style" class="i18n-box" v-html="html" />
</template>
<script lang="ts">
import Vue from 'vue'
import sanitize from 'sanitize-html'
import { toStyle, toPx } from '../lib'

export default Vue.extend({
  props: {
    align: {
      type: [String],
      default: null
    },
    verticalAlign: {
      type: [String],
      default: null
    },
    lineHeight: {
      type: [String, Number],
      default: null
    },
    fontSize: {
      type: [String, Number],
      default: null
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    x: {
      type: [String, Number],
      default: null
    },
    y: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    const { x, y, width, height, fontSize, lineHeight } = this.$props
    let { align, verticalAlign } = this.$props
    if (/\w+\s+\w+/.test(align)) {
      const parts = align.split(' ')
      align = parts[0]
      verticalAlign = verticalAlign ?? parts[1]
    }
    const alignItems = verticalAlign === 'center' ? 'center' : verticalAlign === 'right' ? 'end' : null
    const textAlign = align === 'center' ? 'center' : align === 'right' ? 'right' : null
    const justifyContent = align === 'center' ? 'center' : align === 'right' ? 'end' : null
    const absolute = (x ?? y ?? width ?? height ?? null) !== null
    return {
      useDiv: absolute || textAlign !== null || alignItems !== null,
      style: toStyle({
        alignItems,
        textAlign,
        justifyContent,
        position: absolute ? 'absolute' : null,
        left: toPx(x),
        top: toPx(y),
        fontSize,
        lineHeight,
        width,
        height
      })
    }
  },
  computed: {
    html () {
      return sanitize(this.$i18n.t(String(this.$vnode.key)).toString(), {
        allowedTags: ['ruby', 'rt', 'rtc', 'br']
      })
    }
  }
})
</script>
