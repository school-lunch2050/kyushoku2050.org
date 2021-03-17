<template>
  <div
    ref="container"
    :class="{
      'view-box': true,
      'view-box--focussed': viewbox() !== null,
      'view-box--full': viewbox() === null
    }"
  >
    <nuxt-link
      ref="unfocus"
      class="view-box--unfocus font--tex"
      :tabindex="viewbox() === null ? '-1' : '0'"
      :to="typeof unfocus !== 'function' && unfocus !== null ? unfocus : '#'"
      @click="typeof unfocus === 'function' ? unfocus : null"
    >
      <text-box key="weblate.scenario.actions.unfocus" />
    </nuxt-link>
    <div
      ref="canvas"
      :style="size"
      class="view-box--canvas"
    >
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import textBox from './text-box.vue'
import { activeLifecycle, styleRect, toStyle, Rect, clearTextSelection } from '~/assets/helpers'

const updateMap = new WeakMap<any, Function>()
interface Viewbox {
  id: string | null
  viewRect: Rect & { padding?: Rect }
}
type ViewboxFN = () => Viewbox | null

function getViewbox (vue: Vue): Viewbox | null {
  const { getViewbox } = vue.$props as { getViewbox?: ViewboxFN }
  if (!getViewbox) {
    return null
  }
  return getViewbox()
}

function getShadow (vue: Vue, width: number, height: number): string | null {
  const viewbox = getViewbox(vue)
  if (viewbox === null) {
    return null
  }
  const { viewRect: rect } = viewbox
  return `M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z ` +
    `M ${rect.x} ${rect.y} L ${rect.x + rect.width} ${rect.y} L ${rect.x + rect.width} ${rect.y + rect.height} L ${rect.x} ${rect.y + rect.height} Z`
}

export default Vue.extend({
  components: { textBox },
  props: {
    width: {
      type: [String, Number],
      required: true
    },
    height: {
      type: [String, Number],
      required: true
    },
    transition: {
      type: String,
      default: 'transform cubic-bezier(0.445, 0.05, 0.55, 0.95) 1s'
    },
    getViewbox: {
      type: [Function],
      default: null
    },
    unfocus: {
      type: [Object, String, Function, Boolean],
      default: null
    }
  },
  data () {
    const width = parseFloat(this.$props.width)
    const height = parseFloat(this.$props.height)
    return {
      shadow: getShadow.bind(null, this, width, height),
      viewbox: getViewbox.bind(null, this),
      size: toStyle({
        width,
        height
      })
    }
  },
  ...activeLifecycle<Vue>(function (this: Vue): (() => void) | undefined {
    const { container, canvas } = this.$refs
    if (updateMap.get(this)) {
      return
    }
    if (!(container instanceof HTMLElement)) {
      return
    }
    if (!(canvas instanceof HTMLElement)) {
      return
    }
    const full: Viewbox = {
      id: null,
      viewRect: styleRect(canvas)
    }
    let first = true
    const updateTarget = (smooth: boolean) => {
      if (!document.body.parentElement?.classList.contains('wf-active')) {
        setTimeout(() => updateTarget(smooth), 20)
        return
      }
      container.classList.toggle('ready', true)
      const viewbox = getViewbox(this)
      const { id, viewRect: target } = viewbox ?? full
      const actualPadding = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        ...(target.padding ?? {})
      }
      if (viewbox !== null) {
        actualPadding.bottom += 40 // unfocus text!
      }
      const viewPort = {
        x: actualPadding.left,
        y: actualPadding.top,
        height: container.offsetHeight - actualPadding.top - actualPadding.bottom,
        width: container.offsetWidth - actualPadding.left - actualPadding.right
      }
      const vRatio = viewPort.width / viewPort.height
      const tRatio = target.width / target.height
      const scale = vRatio < tRatio
        ? full.viewRect.width / target.width * viewPort.width / full.viewRect.width
        : full.viewRect.height / target.height * viewPort.height / full.viewRect.height

      if ((canvas.dataset.id ?? null) !== id) {
        clearTextSelection()
        const unfocus = container.querySelector('.view-box--unfocus')
        const previous = container.querySelector(`.box--${canvas.dataset.id}`)
        if (previous) {
          previous.parentElement?.parentElement?.classList.toggle('bubble-text--active', false)
        }
        if (!id) {
          delete canvas.dataset.id
          if (!first && previous instanceof HTMLElement) {
            previous.focus()
          }
        } else {
          canvas.dataset.id = id
          if (!first && unfocus instanceof HTMLElement) {
            unfocus.focus()
          }
        }
        container.querySelector(`.box--${id}`)?.parentElement?.parentElement?.classList.toggle('bubble-text--active', true)
        this.$forceUpdate()
      }
      first = false
      canvas.style.transition = smooth ? this.$props.transition : ''
      const transform = `scale(${scale}) translate(${-target.x - target.width / 2 + viewPort.width / (2 * scale)}px, ${-target.y - target.height / 2 + viewPort.height / (2 * scale)}px)`
      canvas.style.fontSize = `${40 / scale}px`
      canvas.style.transform = transform
    }
    const onresize = () => {
      updateTarget(false)
    }
    window.addEventListener('resize', onresize)
    updateMap.set(this, updateTarget)
    updateTarget(false)
    return () => {
      updateMap.delete(this)
      window.removeEventListener('resize', onresize)
    }
  }),
  updated () {
    const updateTarget = updateMap.get(this)
    if (updateTarget) {
      updateTarget(true)
    }
  }
})
</script>
