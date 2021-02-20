<template>
  <div class="bubble-text">
    <div class="bubble-text--content font--tex" :style="textStyle">
      <text-box :key="i18nkey" :line-height="lineHeight" :font-size="fontSize" :padding="padding" />
    </div>
    <nuxt-link :to="{ hash }" :style="boxStyle" :class="`bubble-text--link box--${hash}`">
      &nbsp;
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { toStyle } from '../lib'

export default Vue.extend({
  props: {
    bubble: {
      type: [String, Object],
      required: true
    },
    viewRect: {
      type: Object,
      required: true
    },
    rect: {
      type: Object,
      required: true
    },
    fontSize: {
      type: [String, Number, Object],
      default: null
    },
    lineHeight: {
      type: [String, Number, Object],
      default: null
    },
    padding: {
      type: String,
      default: null
    }
  },
  data () {
    const { viewRect, rect } = this.$props
    const path = String(this.$vnode.key).split('.')
    path.splice(1, 0, 'bubbles')
    return {
      textStyle: toStyle({
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height
      }),
      boxStyle: toStyle({
        left: viewRect.x,
        top: viewRect.y,
        width: viewRect.width,
        height: viewRect.height
      }),
      hash: path[2],
      i18nkey: `weblate.${path.join('.')}.text`
    }
  }
})
</script>
