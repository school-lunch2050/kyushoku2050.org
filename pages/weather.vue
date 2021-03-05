<template>
  <main-screen key="main" prev="/introduction" next="/location" lunch-type="!">
    <template #chalkboard>
      <text-box
        key="weblate.introduction.weather.title"
        class="font--tex cb--question--title"
        align="center center"
        y="100"
        width="2235"
        height="300"
      />
      <div class="cb-options">
        <cb-option title="weblate.introduction.weather.less.text" image="weather_15" />
        <cb-option title="weblate.introduction.weather.more.text" image="weather_2p" />
      </div>
    </template>
  </main-screen>
</template>
<script>
export default {
  name: 'PageWeather',
  key: route => route.fullPath
}
</script>
