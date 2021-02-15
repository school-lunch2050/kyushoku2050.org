<template>
  <svg
    class="cb"
    width="100%"
    height="100%"
    viewBox="0 0 2586 1770"
    version="1.1"
  >
    <image width="2586" height="1770" href="/img/chalkboard.webp" />
    <g v-if="page === 'start'" class="cb_page">
      <image width="300" height="300" href="/img/logo.webp" />
      <SVGCenterBox width="2235" class="font--tex" height="1401" line-height="270" :text="$t('weblate.introduction.start.text')" />
    </g>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue'

const pages = ['start']

export default Vue.extend({
  props: {
    page: {
      type: String,
      required: true,
      validator: value => pages.includes(value)
    }
  }
})
</script>
<style type="scss">
svg {
  fill: white;
}
.cb_page {
  transform: translate(135px, 135px);
  font-size: 150px;
}

</style>
