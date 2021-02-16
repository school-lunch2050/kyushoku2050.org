<template>
  <main-menu
    key="main"
    prev="/location"
    next="/main"
    :title="$t('weblate.introduction.scenario.title')"
  />
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  key: route => route.fullPath
})
</script>
