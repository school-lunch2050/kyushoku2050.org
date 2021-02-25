<template>
  <div class="bubble-text">
    <div class="bubble-text--content font--tex" :style="textStyle">
      <div class="bubble-text--padding" :style="paddingStyle">
        <text-box :key="i18nkey" :line-height="lineHeight" :class="{ 'bubble-text--seen': seen() }" :font-size="fontSize" :custom-style="spanStyle()" />
      </div>
    </div>
    <nuxt-link :to="{ hash }" :style="boxStyle" :class="`bubble-text--link box--${hash}`">
      &nbsp;
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { toStyle, ActivityMap, countCharsCached } from '../lib'

const activity = new ActivityMap()

// ↓ This is an ugly workaround to react to store changes.
function activate (this: Vue & { seen: () => boolean }) {
  activity.stop(this)
  let current = this.seen()
  const unwatch = this.$store.subscribe(
    (mutation) => {
      if (mutation.type.startsWith('progress/')) {
        const seen = this.seen()
        if (current !== seen) {
          current = seen
          this.$forceUpdate()
        }
      }
    })
  activity.start(this, unwatch)
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
      hash: path[2],
      i18nkey
    }
  },
  mounted: activate,
  activated: activate,
  deactivated () {
    activity.stop(this)
  },
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
