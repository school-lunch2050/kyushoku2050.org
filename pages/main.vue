<template>
  <main-menu prev="/scenarios" active />
</template>
<script>
export default {
  name: 'PageMain',
  key: route => route.fullPath
}
</script>
