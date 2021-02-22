<template>
  <main-screen key="main" prev="/lunch" next="/weather" lunch-type="!">
    <text-box
      key="weblate.introduction.introduction.text"
      class="font--tex"
      align="center center"
      width="2235"
      height="1401"
    />
  </main-screen>
</template>
<script>
export default {
  name: 'PageIntroduction',
  key: route => route.fullPath
}
</script>
<style lang="scss">
.i18n-img--logo {
  display: inline-block;
  position: relative;
  margin: 0 0.25em;
  img {
    position: relative;
    top: 0.4em;
    height: 1.2em;
  }
}
</style>
