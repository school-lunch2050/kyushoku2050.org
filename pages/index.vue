<template>
  <MainScreen key="main" next="/lunch">
    <image width="500" height="500" href="/img/logo.webp" />
    <SVGCenterBox class="font--tex" width="2235" height="1401" line-height="270" :text="$t('weblate.introduction.start.text')" />
  </MainScreen>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  key: route => route.fullPath
})
</script>
