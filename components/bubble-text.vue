<template>
  <div class="bubble-text">
    <div class="bubble-text--content font--tex" :style="textStyle">
      <div class="bubble-text--padding" :style="paddingStyle">
        <text-box :key="i18nkey" :line-height="lineHeight" :class="{ 'bubble-text--seen': seen() }" :font-size="fontSize" :custom-style="spanStyle()" />
      </div>
    </div>
    <svg viewBox="0 0 3157 2500" class="bubble-text--shadow">
      <path fill="#000" :d="focusPath" fill-rule="even-odd" />
    </svg>
    <nuxt-link :to="{ hash }" :style="boxStyle" :class="`bubble-text--link box--${hash}`">
      <div class="bubble-text--rounded-rect" :style="roundedRectStyle">
        &nbsp;
      </div>
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { toStyle, activeLifecycle, countCharsCached, Rect } from '../lib'

function scaleRect (source: any, f: number = 0.98) {
  const width = source.width * f
  const height = source.height * f
  return {
    x: source.x + (source.width - width) / 2,
    y: source.y + (source.height - height) / 2,
    width,
    height
  }
}

function roundedRectPath (source: Rect & { r: number }): string {
  const { x, y, width: w, height: h, r } = source
  const a = (x: number, y: number) => `A ${r} ${r} 90 0 0 ${x},${y}`
  return `M ${x} ${y + r} L ${x} ${y + h - r} ${a(x + r, y + h)} L ${x + w - r} ${y + h} ${a(x + w, y + h - r)} L ${x + w} ${y + r} ${a(x + w - r, y)} L ${x + r}  ${y} ${a(x, y + r)} Z`
}

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
    const { viewRect, rect, padding } = this.$props
    const path = String(this.$vnode.key).split('.')
    path.splice(1, 0, 'bubbles')
    const i18nkey = `weblate.${path.join('.')}.text`
    const width = 3157
    const height = 2500
    const roundedRect: Rect & { r: number } = scaleRect(viewRect) as any
    roundedRect.r = Math.max(roundedRect.width, roundedRect.height) * 0.02
    const borderWidth = 1
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
      paddingStyle: toStyle({
        padding
      }),
      roundedRectStyle: toStyle({
        left: roundedRect.x - viewRect.x - borderWidth,
        top: roundedRect.y - viewRect.y - borderWidth,
        width: roundedRect.width,
        height: roundedRect.height,
        borderRadius: roundedRect.r + borderWidth,
        position: 'absolute',
        borderWidth
      }),
      focusPath: `M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z ${roundedRectPath(roundedRect)}`,
      hash: path[2],
      i18nkey
    }
  },
  // eslint-disable-next-line no-extra-parens
  ...activeLifecycle<Vue & { seen(): boolean }>(function () {
    let current = this.seen()
    return this.$store.subscribe(
      (mutation) => {
        if (mutation.type.startsWith('progress/')) {
          const seen = this.seen()
          if (current !== seen) {
            current = seen
            this.$forceUpdate()
          }
        }
      })
  }),
  methods: {
    spanStyle () {
      const width = countCharsCached(this.$i18n.t(this.i18nkey)) * (this.$i18n.locale === 'ja' || this.$i18n.locale === 'ja-simple' ? 48 : 25)
      return {
        'background-size': `${width}px 8000px`
      }
    },
    seen () {
      return this.$store.state.progress[String(this.$vnode.key)] === 1
    }
  }
})
</script>
