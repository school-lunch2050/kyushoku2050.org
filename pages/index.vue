<template>
  <main-screen key="main" next="/lunch">
    <img width="500" height="500" src="/img/logo.webp">
    <text-box
      key="weblate.introduction.start.text"
      class="font--tex"
      align="center center"
      y="0"
      width="2235"
      height="1401"
    />
  </main-screen>
</template>
<script>
export default {
  name: 'PageIndex',
  key: route => route.fullPath
}
</script>
