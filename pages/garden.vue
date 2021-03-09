<template>
  <main-menu prev="/main" active selected="garden" />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageGarden',
  key: route => route.fullPath
})
</script>
