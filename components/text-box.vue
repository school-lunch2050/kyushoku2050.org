<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-if="useDiv" :key="this.$i18n.locale" :style="style" class="i18n-box"><span v-html="html" /></div>
  <span v-else :key="this.$i18n.locale" :style="style" class="i18n-box" v-html="html" />
</template>
<script lang="ts">
import Vue from 'vue'
import sanitize from 'sanitize-html'
import { toStyle } from '../lib'

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
    }
  },
  data () {
    const { x, y, width, height, fontSize, lineHeight, align, verticalAlign } = this.$props
    const alignContent = verticalAlign === 'center' ? 'center' : verticalAlign === 'right' ? 'end' : null
    const justifyContent = align === 'center' ? 'center' : align === 'right' ? 'end' : null
    const absolute = (x ?? y ?? null) !== null
    return {
      useDiv: absolute || justifyContent !== null || alignContent !== null,
      style: toStyle({
        alignContent,
        justifyContent,
        position: absolute ? 'absolute' : null,
        left: x,
        top: y,
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
