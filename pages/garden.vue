<template>
  <main-menu prev="/main" active selected="garden" />
</template>
<script>
export default {
  name: 'PageGarden',
  key: route => route.fullPath
}
</script>
