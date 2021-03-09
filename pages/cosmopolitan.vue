<template>
  <main-menu prev="/main" active selected="cosmopolitan" />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageCosmopolitan',
  key: route => route.fullPath
})
</script>
