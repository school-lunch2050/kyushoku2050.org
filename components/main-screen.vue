<template>
  <keep-alive>
    <main class="main--main-screen">
      <keep-alive>
        <view-box
          :class="`main-screen ${lunchType === null ? 'main-screen--cb-only' : 'main-screen--cb-lunch'}`"
          width="2736"
          height="3200"
        >
          <div class="cb--box">
            <chalkboard
              :width="cb"
              :height="cb / 2586 * 1770"
              style="left: 150px; top: 50px"
              :next="next"
              :prev="prev"
            >
              <slot />
            </chalkboard>
          </div>
          <nuxt-link-plus
            :to="lunchType && lunchType !== '!' ? localePath(`/${lunchType}`) : ''"
            class="lunch--box"
          >
            <lunch
              x="100"
              y="1850"
              :width="lun"
              :height="lun / 3874 * 1926"
              :type="lunchType || '?'"
            />
          </nuxt-link-plus>
        </view-box>
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
      default: '100vmin'
    },
    height: {
      type: [String, Number],
      default: '100vmin'
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
.cb--box {
  position: relative;
  z-index: 1;
}
.lunch--box,
.cb--box {
  transition: all 2s;
}
.main-screen--cb-only .lunch--box {
  opacity: 0;
}
.main-screen--cb-lunch .lunch--box {
  opacity: 1;
}
.main-screen--cb-only .cb--box {
  transform: translateY(620px);
}
.main-screen--cb-lunch .cb--box {
  transform: translate(0px);
}
</style>
