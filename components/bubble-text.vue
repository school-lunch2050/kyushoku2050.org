<template>
  <div class="bubble-text">
    <div class="bubble-text--content font--tex" :style="textStyle">
      <div class="bubble-text--padding" :style="paddingStyle">
        <text-box :key="i18nkey" :class="{ 'bubble-text--seen': seen() }" :font-size="bubble && bubble.fontSize" :custom-style="spanStyle()" />
      </div>
    </div>
    <svg viewBox="0 0 3157 2500" class="bubble-text--shadow">
      <path fill="#000" :d="focusPath" fill-rule="even-odd" />
    </svg>
    <div :style="boxStyle" class="bubble-text--viewbox">
      <nuxt-link :to="{ hash: $vnode.key }" :class="`bubble-text--link box--${$vnode.key}`" :title="$t('weblate.scenario.actions.focus', { nr })">
        <div class="bubble-text--rounded-rect" :style="roundedRectStyle">
          &nbsp;
        </div>
      </nuxt-link>
      <div v-if="bubble" ref="bubble" :class="`bubble-info font--nav bubble-info--buttons-${bubble.infoButton === 'right' ? 'right' : 'left'}`" :style="infoStyle">
        <img
          class="bubble-info--open"
          src="/img/icon_info.svg"
          tabindex="0"
          @click="toggleInfo"
          @keypress="toggleInfo"
        >
        <img class="bubble-info--close" src="/img/icon_close_dark.svg" tabindex="0" @click="toggleInfo" @keypress="toggleInfo">
        <div class="bubble-info--container">
          <div class="bubble-info--content">
            <h2><text-box key="weblate.scenario.info.title" /></h2>
            <div v-if="explanationKey">
              <h3><text-box key="weblate.scenario.info.explanation" /></h3>
              <p>
                <text-box :key="explanationKey" />
              </p>
            </div>
            <div v-if="bubble.ingredients.length > 0">
              <h3><text-box key="weblate.scenario.info.ingredients" class="bubble-info--ingredients" /></h3>
              <div v-for="ingredient in bubble.ingredients" :key="ingredient.key">
                <div class="bubble-info--ingredient-box">
                  <div :style="ingredient.iconStyle" :class="`bubble-info--ingredient bubble-info--ingredient-${lunch.id}`">
                    <text-box key="weblate.scenario.info.lunch" :values="{ name: $t(`weblate.ingredients.${ingredient.key}.name`) }" />
                  </div>
                  <text-box :key="`weblate.ingredients.${ingredient.key}.name`" class="bubble-info--ingredient-text" />
                </div>
              </div>
            </div>
            <div v-if="bubble.links.length > 0" class="bubble-info--links">
              <h3><text-box v-if="bubble.links" key="weblate.scenario.info.links" class="bubble-info--links" /></h3>
              <ul>
                <bubble-link v-for="(link, index) in bubble.links" :key="`link-${index}-${$i18n.locale}`" :link="link" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { lunchForBubble } from '~/assets/lunches'
import { bubbles, Bubble } from '~/assets/bubbles'
import { toStyle, activeLifecycle, countCharsCached, Rect } from '~/lib'

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
    nr: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    const bubbleKey = this.$vnode.key as Bubble
    const bubble = bubbles[bubbleKey]
    if (!bubble) {
      return {}
    }
    const lunch = lunchForBubble(bubbleKey)
    if (!lunch) {
      return {}
    }
    const { viewRect, rect, padding } = bubble
    const i18nkey = `weblate.bubbles.${bubbleKey}`
    const width = 3157
    const height = 2500
    const vRatio = width / height
    const roundedRect: Rect & { r: number } = scaleRect(viewRect) as any
    roundedRect.r = Math.max(roundedRect.width, roundedRect.height) * 0.02
    const bRatio = roundedRect.width / roundedRect.height
    const borderWidth = 1
    const roundedRectStyle = {
      left: roundedRect.x - viewRect.x - borderWidth,
      top: roundedRect.y - viewRect.y - borderWidth,
      width: roundedRect.width,
      height: roundedRect.height,
      borderRadius: roundedRect.r + borderWidth,
      position: 'absolute',
      borderWidth
    }
    const ratioFontSizeEffect = bRatio < 1
      ? 1 - (1 - bRatio) * 0.3
      : (bRatio - 1) * 0.4 + 1
    let explanationKey: string | null = `weblate.explanations.${bubbleKey}`
    try {
      if (!this.$i18n.te(explanationKey)) {
        explanationKey = null
      }
    } catch (err) {
      explanationKey = null
    }
    return {
      explanationKey,
      lunch,
      bubble,
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
      paddingStyle: toStyle({ padding }),
      roundedRectStyle: toStyle(roundedRectStyle),
      infoStyle: toStyle({
        ...roundedRectStyle,
        fontSize: `${180 * (vRatio > bRatio ? roundedRect.width / width : roundedRect.height / height) * ratioFontSizeEffect}px`
      }),
      focusPath: `M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z ${roundedRectPath(roundedRect)}`,
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
      const width = countCharsCached(this.$i18n.t(String(this.i18nkey))) * (this.$i18n.locale === 'ja' || this.$i18n.locale === 'ja-simple' ? 48 : 25)
      return {
        'background-size': `${width}px 8000px`
      }
    },
    seen () {
      return this.$store.state.progress[`bubble.${String(this.$vnode.key)}`] === 1
    },
    toggleInfo () {
      const { bubble } = this.$refs
      if (!(bubble instanceof HTMLElement)) {
        return
      }
      bubble.classList.toggle('bubble-info--active')
      return false
    }
  }
})
</script>
