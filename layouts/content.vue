<template>
  <div class="layout layout--content">
    <header>
      <nuxt-link :to="localePath('/')">
        <img src="~/static/img/logo.webp" :alt="$t('weblate.title')">
      </nuxt-link>
    </header>
    <article class="font--article">
      <div class="content--box">
        <h1 id="top">
          <text-box :key="`weblate.pages.${$route.name.substr(0, $route.name.indexOf('_'))}.full`" />
        </h1>
        <Nuxt :nuxt-child-key="'detail'" />
      </div>
    </article>
    <kyushoku-footer />
  </div>
</template>
<script>
import { layoutDefaults } from '../lib'

export default {
  name: 'LongText',
  ...layoutDefaults
}
</script>
