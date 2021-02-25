<template>
  <client-only>
    <main-menu prev="/scenarios" active />
  </client-only>
</template>
<script>
export default {
  name: 'PageMain',
  key: route => route.fullPath
}
</script>
