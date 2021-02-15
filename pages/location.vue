<template>
  <MainScreen key="main" prev="/weather" next="/scenarios" lunch-type="!">
    <SVGCenterBox
      class="font--tex cb--question--title"
      width="2235"
      height="400"
      y="100"
      line-height="220"
      :text="$t('weblate.introduction.location.title')"
    />
    <CBOption :title="$t('weblate.introduction.location.near.text')" image="/img/place_local.webp" x="400" y="600" />
    <CBOption :title="$t('weblate.introduction.location.far.text')" image="/img/place_global.webp" x="1300" y="600" />
  </MainScreen>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  key: route => route.fullPath
})
</script>
