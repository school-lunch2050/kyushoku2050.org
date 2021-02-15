<template>
  <MainScreen key="main" prev="/introduction" next="/location" lunch-type="!">
    <SVGCenterBox
      class="font--tex cb--question--title"
      width="2235"
      height="400"
      y="100"
      line-height="220"
      :text="$t('weblate.introduction.weather.title')"
    />
    <CBOption :title="$t('weblate.introduction.weather.less.text')" image="/img/weather_15.webp" x="400" y="600" />
    <CBOption :title="$t('weblate.introduction.weather.more.text')" image="/img/weather_2p.webp" x="1300" y="600" />
  </MainScreen>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  key: route => route.fullPath
})
</script>
