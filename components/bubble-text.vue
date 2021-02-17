<template>
  <div class="bubble-text">
    <text-box
      :key="i18nkey"
      :x="rect.x"
      :y="rect.y"
      :width="rect.width"
      :height="rect.height"
      line-height="20"
      class="font--tex"
    />
    <nuxt-link :to="{ hash }" :style="boxStyle" :class="`bubble-text--link box--${hash}`">&nbsp;</nuxt-link>
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
    }
  },
  data () {
    const { viewRect } = this.$props
    const path = String(this.$vnode.key).split('.')
    path.splice(1, 0, 'bubbles')
    return {
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
