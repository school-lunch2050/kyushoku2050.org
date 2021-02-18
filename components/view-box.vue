<template>
  <div ref="container" class="view-box">
    <div ref="canvas" class="view-box--canvas" :style="size">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { ActivityMap, styleRect, toStyle, toPx } from '../lib'

const activity = new ActivityMap()
const updateMap = new WeakMap<any, Function>()

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
  const full = styleRect(canvas)
  const updateTarget = (smooth: boolean) => {
    const target = (this.$props.getViewbox ? this.$props.getViewbox(container) : null) ?? full
    const viewPort = {
      x: 0,
      y: 0,
      height: container.offsetHeight,
      width: container.offsetWidth
    }
    const vRatio = viewPort.width / viewPort.height
    const scale = vRatio < target.ratio
      ? full.width / target.width * viewPort.width / full.width
      : full.height / target.height * viewPort.height / full.height

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
    }
  },
  data () {
    return {
      size: toStyle({
        width: toPx(this.$props.width),
        height: toPx(this.$props.height)
      })
    }
  },
  mounted () {
    start.call(this)
  },
  activated () {
    start.call(this)
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
