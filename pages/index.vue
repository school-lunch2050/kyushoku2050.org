<template>
  <main-screen key="main" next="/lunch">
    <image width="500" height="500" href="/img/logo.webp" />
    <svg-center-box class="font--tex" width="2235" height="1401" line-height="270" :text="$t('weblate.introduction.start.text')" />
  </main-screen>
</template>
<script>
export default {
  name: 'PageIndex',
  key: route => route.fullPath
}
</script>
