<template>
  <div class="lunch-detail">
    <detail-header :type="type" />
    <main class="main--lunch-detail">
      <lunch :type="type" />
      <div ref="box" class="lunch-detail--zoom-box">
        <svg
          width="100vw"
          height="100vh"
          viewBox="0 0 3157 2500"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <slot />
        </svg>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    type: {
      type: String,
      required: true
    }
  }
})
</script>
