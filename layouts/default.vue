<template>
  <div id="layout">
    <language-header />
    <Nuxt :nuxt-child-key="'default'" />
    <kyushoku-footer />
  </div>
</template>
<script>
import { layoutDefaults } from '../lib'
export default {
  name: 'DefaultLayout',
  ...layoutDefaults
}
</script>
