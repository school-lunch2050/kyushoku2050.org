<template>
  <MainScreen key="main" prev="/lunch" next="/weather" lunch-type="!">
    <SVGCenterBox class="font--tex" width="2235" height="1401" line-height="270" :text="$t('weblate.introduction.introduction.text')" />
  </MainScreen>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  key: route => route.fullPath
})
</script>
