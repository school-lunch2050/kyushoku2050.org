<template>
  <main-screen key="main" prev="/lunch" next="/weather" lunch-type="!">
    <svg-center-box class="font--tex" width="2235" height="1401" line-height="270" :text="$t('weblate.introduction.introduction.text')" />
  </main-screen>
</template>
<script>
export default { key: route => route.fullPath }
</script>
