<template>
  <keep-alive>
    <main>
      <keep-alive>
        <svg
          :class="`main ${lunchType === null ? 'main--cb-only' : 'main--cb-lunch'}`"
          :x="x"
          :y="y"
          :width="width"
          :height="height"
          viewBox="0 0 2736 3200"
          version="1.1"
          style="max-width: 100vh; max-height: 100vw;"
        >
          <g
            class="lunch--box">
            <lunch
              x="100"
              y="1850"
              :width="lun"
              :height="lun / 3874 * 1926"
              :type="lunchType"
            />
          </g>
          <g class="cb--box">
            <chalkboard
              :width="cb"
              :height="cb / 2586 * 1770"
              x="150"
              y="50"
              :next="next"
              :prev="prev"
            >
              <slot />
            </chalkboard>
          </g>
        </svg>
      </keep-alive>
    </main>
  </keep-alive>
</template>
<script type="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    lunchType: {
      type: String,
      default: null
    },
    prev: {
      type: String,
      default: null
    },
    next: {
      type: String,
      default: null
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100%'
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
    return {
      cb: 2586,
      lun: 2636
    }
  }
})
</script>
<style scoped>
.lunch--box,
.cb--box {
  transition: all 2s;
}
.main--cb-only .lunch--box {
  opacity: 0;
}
.main--cb-lunch .lunch--box {
  opacity: 1;
}
.main--cb-only .cb--box {
  transform: translateY(620px);
}
.main--cb-lunch .cb--box {
  transform: translate(0px);
}
</style>
