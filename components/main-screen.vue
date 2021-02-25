<template>
  <keep-alive>
    <main class="main--main-screen">
      <keep-alive>
        <view-box
          class="main-screen"
          width="2736"
          height="3200"
        >
          <div class="cb--box">
            <chalkboard
              :width="cb"
              :height="cb / 2586 * 1770"
              style="left: 40px; top: 50px"
              :next="next"
              :prev="prev"
            >
              <slot name="chalkboard" />
            </chalkboard>
          </div>
          <lunch
            v-if="lunchType"
            x="100"
            y="1850"
            :width="lun"
            :height="lun / 3874 * 1926"
            :type="lunchType"
          />
        </view-box>
      </keep-alive>
      <slot name="body" />
    </main>
  </keep-alive>
</template>
<script lang="ts">
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
</style>
