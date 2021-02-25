<template>
  <main-screen key="main" prev="/" next="/introduction" lunch-type="?">
    <template #chalkboard>
      <img width="500" height="500" src="/img/logo.webp">
      <text-box
        key="weblate.introduction.lunch.text"
        class="font--tex"
        align="center center"
        y="0"
        width="2235"
        height="1401"
      />
    </template>
  </main-screen>
</template>
<script>
export default {
  name: 'PageLunch',
  key: route => route.fullPath
}
</script>
