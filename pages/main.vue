<template>
  <main-menu prev="/scenarios" active :selected="($route.hash || '').substr(1)" />
</template>
<script>
export default {
  name: 'PageMain',
  key: route => route.fullPath
}
</script>
