<template>
  <div ref="container" class="view-box">
    <div
      ref="canvas"
      :style="size"
      :class="{
        'view-box--canvas': true,
        'view-box--canvas--focussed': viewbox() !== null,
        'view-box--canvas--full': viewbox() === null
      }"
    >
      <slot />
    </div>
    <nuxt-link
      v-if="unfocus && viewbox()"
      class="view-box--unfocus"
      :to="typeof unfocus !== 'function' ? unfocus : '#'"
      @click="typeof unfocus === 'function' ? unfocus : null"
    >
      &nbsp;
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ActivityMap, styleRect, toStyle, toPx, Rect } from '../lib'

const activity = new ActivityMap()
const updateMap = new WeakMap<any, Function>()
interface Viewbox {
  id: string | null
  rect: Rect
}
type ViewboxFN = (elem: HTMLElement) => Viewbox | null

function getViewbox (vue: Vue): Viewbox | null {
  const { getViewbox } = vue.$props as { getViewbox?: ViewboxFN }
  if (!getViewbox) {
    return null
  }
  const { container } = vue.$refs as { container: HTMLElement }
  if (!container) {
    return null
  }
  return getViewbox(container)
}

function start (this: Vue) {
  const { container, canvas } = this.$refs
  if (!(container instanceof HTMLElement)) {
    console.warn('container is missing!')
    return
  }
  if (!(canvas instanceof HTMLElement)) {
    console.warn('canvas is missing!')
    return
  }
  const full = {
    id: null,
    rect: styleRect(canvas)
  }
  const updateTarget = (smooth: boolean) => {
    const { id, rect: target } = getViewbox(this) ?? full
    const viewPort = {
      x: 0,
      y: 0,
      height: container.offsetHeight,
      width: container.offsetWidth
    }
    const vRatio = viewPort.width / viewPort.height
    const scale = vRatio < target.ratio
      ? full.rect.width / target.width * viewPort.width / full.rect.width
      : full.rect.height / target.height * viewPort.height / full.rect.height

    if ((canvas.dataset.id ?? null) !== id) {
      if (!id) {
        delete canvas.dataset.id
      } else {
        canvas.dataset.id = id
      }
      this.$forceUpdate()
    }
    canvas.style.transition = smooth ? this.$props.transition : ''
    const transform = `scale(${scale}) translate(${-target.x - target.width / 2 + viewPort.width / (2 * scale)}px, ${-target.y - target.height / 2 + viewPort.height / (2 * scale)}px)`
    canvas.style.transform = transform
  }
  const onresize = () => {
    updateTarget(false)
  }
  window.addEventListener('resize', onresize)
  updateMap.set(this, updateTarget)
  activity.start(this, () => {
    updateMap.delete(this)
    window.removeEventListener('resize', onresize)
  })
  updateTarget(false)
}

export default Vue.extend({
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
      default: 'all cubic-bezier(0.445, 0.05, 0.55, 0.95) 1s'
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
    return {
      viewbox: getViewbox.bind(null, this),
      size: toStyle({
        width: toPx(this.$props.width),
        height: toPx(this.$props.height)
      })
    }
  },
  mounted () {
    start.call(this as Vue)
  },
  activated () {
    start.call(this as Vue)
  },
  updated () {
    const updateTarget = updateMap.get(this)
    if (updateTarget) {
      updateTarget(true)
    }
  },
  deactivated () {
    activity.stop(this)
  },
  destroyed () {
    activity.stop(this)
  }
})
</script>