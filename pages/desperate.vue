<template>
  <main-menu prev="/main" active selected="desperate" />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageDesperate',
  key: route => route.fullPath
})
</script>
