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
        <cb-option title="weblate.introduction.weather.less.text" image="/img/weather_15.webp" />
        <cb-option title="weblate.introduction.weather.more.text" image="/img/weather_2p.webp" />
      </div>
    </template>
  </main-screen>
</template>
<script>
export default {
  name: 'PageWeather',
  key: 'main'
}
</script>
