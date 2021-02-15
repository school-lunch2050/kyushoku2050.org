<template>
  <svg
    class="cb"
    width="100%"
    height="100%"
    viewBox="0 0 2586 1770"
    version="1.1"
  >
    <keep-alive>
      <image width="2586" height="1770" href="/img/chalkboard.webp" />
    </keep-alive>
    <NuxtLink v-if="prev" :to="localePath(prev)" class="button--prev font--tex" transform="translate(150, 1500)">
      <g>
        <SVGRuby text-anchor="start" :text="`${$t('weblate.menu.actions.prev')}`" />
        <rect width="400" x="-50" y="-125" height="200" />
      </g>
    </NuxtLink>
    <NuxtLink v-if="next" :to="localePath(next)" class="button--next font--tex" transform="translate(2400, 1500)">
      <g>
        <SVGRuby text-anchor="end" :text="`${$t('weblate.menu.actions.next')}`" />
        <rect width="400" x="-350" y="-125" height="200" />
      </g>
    </NuxtLink>
    <g v-if="page === 'start'" class="cb--page cb--start">
      <image width="500" height="500" href="/img/logo.webp" />
      <SVGCenterBox class="font--tex" width="2235" height="1401" line-height="270" :text="$t('weblate.introduction.start.text')" />
    </g>
    <g v-if="page === 'lunch'" class="cb--page cb--lunch">
      <image width="500" height="500" href="/img/logo.webp" />
      <SVGCenterBox class="font--tex" width="2235" height="1401" line-height="270" :text="$t('weblate.introduction.lunch.text')" />
    </g>
    <g v-if="page === 'introduction'" class="cb--page cb--introduction">
      <SVGCenterBox class="font--tex" width="2235" height="1401" line-height="270" :text="$t('weblate.introduction.introduction.text')" />
    </g>
    <g v-if="page === 'weather'" class="cb--page cb--weather">
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
    </g>
    <g v-if="page === 'location'" class="cb--page cb--location">
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
    </g>
    <g v-if="page === 'scenarios' || page== 'main'" :class="`cb--page cb--${page}`">
      <slot />
    </g>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue'

const pages = ['start', 'lunch', 'introduction', 'weather', 'location', 'scenarios', 'main']

export default Vue.extend({
  props: {
    page: {
      type: String,
      required: true,
      validator: value => pages.includes(value)
    },
    prev: {
      type: String,
      default: null
    },
    next: {
      type: String,
      default: null
    }
  }
})
</script>
