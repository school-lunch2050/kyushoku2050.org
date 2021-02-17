<template>
  <div class="lunch-detail">
    <detail-header :type="type" />
    <main class="main--lunch-detail">
      <lunch :type="type" />
      <div ref="container" class="lunch-detail--container">
        <div ref="canvas" class="lunch-detail--canvas" style="width: 3157px; height: 2500px;">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { clear, styleRect, clearMap } from '../lib'

const transition = 'all cubic-bezier(0.445, 0.05, 0.55, 0.95) 1s'

export default Vue.extend({
  props: {
    type: {
      type: String,
      required: true
    }
  },
  mounted () {
    clear(this)
    let hash = document.location.hash
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
      const id = hash.substr(1)
      const selector = `.box--${id}`
      const elem = canvas.querySelector(selector)
      const target = (elem instanceof HTMLElement) ? styleRect(elem) : full
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

      canvas.style.transition = smooth ? transition : ''
      const transform = `scale(${scale}) translate(${-target.x - target.width / 2 + viewPort.width / (2 * scale)}px, ${-target.y - target.height / 2 + viewPort.height / (2 * scale)}px)`
      console.log({ transform })
      canvas.style.transform = transform
    }
    const interval = setInterval(() => {
      const newHash = document.location.hash
      if (newHash !== hash) {
        hash = newHash
        updateTarget(true)
      }
    })
    const onresize = () => {
      updateTarget(false)
    }
    window.addEventListener('resize', onresize)
    clearMap.set(this, () => {
      clearInterval(interval)
      window.removeEventListener('resize', onresize)
    })
    updateTarget(false)
  },
  beforeDestroy () {
    clear(this)
  }
})
</script>
