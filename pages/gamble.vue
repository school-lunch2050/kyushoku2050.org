<template>
  <main-menu prev="/main" active selected="gamble" />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PageGamble',
  key: route => route.fullPath
})
</script>
