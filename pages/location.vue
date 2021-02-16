<template>
  <main-screen key="main" prev="/weather" next="/scenarios" lunch-type="!">
    <svg-center-box
      class="font--tex cb--question--title"
      width="2235"
      height="400"
      y="100"
      line-height="220"
      :text="$t('weblate.introduction.location.title')"
    />
    <cb-option :title="$t('weblate.introduction.location.near.text')" image="/img/place_local.webp" x="400" y="600" />
    <cb-option :title="$t('weblate.introduction.location.far.text')" image="/img/place_global.webp" x="1300" y="600" />
  </main-screen>
</template>
<script>
export default {
  name: 'PageLocation',
  key: route => route.fullPath
}
</script>
