<template>
  <main-menu
    key="main"
    prev="/location"
    next="/main"
    :title="$t('weblate.introduction.scenario.title')"
  />
</template>
<script>
export default { key: route => route.fullPath }
</script>
