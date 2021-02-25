<template>
  <main-screen key="main" prev="/lunch" next="/weather" lunch-type="!">
    <template #chalkboard>
      <text-box
        key="weblate.introduction.introduction.text"
        class="font--tex"
        align="center center"
        width="2235"
        height="1401"
      />
    </template>
  </main-screen>
</template>
<script>
export default {
  name: 'PageIntroduction',
  key: 'main'
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
