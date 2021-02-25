<template>
  <article class="font--article">
    <div class="content--box">
      <header class="font--tex">
        <nuxt-link :to="localePath('/')" class="content--home-link">
          <img src="/img/favicon/android-chrome-144x144.png" :alt="$t('weblate.title')">
        </nuxt-link>
      </header>
      <h1 id="top">
        <text-box :key="`weblate.pages.${$route.name.substr(0, $route.name.indexOf('_'))}.full`" />
      </h1>
      <nuxt-content :document="document" />
    </div>
  </article>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    document: {
      type: [Object, String],
      required: true
    }
  }
})
</script>
