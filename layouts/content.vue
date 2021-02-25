<template>
  <div class="layout layout--content">
    <sidebar />
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
        <Nuxt :nuxt-child-key="'detail'" />
      </div>
    </article>
  </div>
</template>
<script>
import { layoutDefaults } from '../lib'

export default {
  name: 'LongText',
  ...layoutDefaults
}
</script>
