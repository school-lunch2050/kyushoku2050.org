<template>
  <main-menu
    key="main"
    prev="/location"
    next="/main"
    title="weblate.introduction.scenario.title"
  />
</template>
<script>
export default {
  name: 'PageScenarios',
  key: route => route.fullPath
}
</script>
