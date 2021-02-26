<template>
  <main class="main--main-screen">
    <view-box key="main-view-box" class="main-screen" width="2736" height="3200">
      <chalkboard key="chalkboard" :next="next" :prev="prev">
        <slot name="chalkboard" />
      </chalkboard>
      <lunch v-if="lunchType" key="lunch" :type="lunchType">
        <slot name="lunch" />
      </lunch>
    </view-box>
    <slot name="body" />
  </main>
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
  }
})
</script>
