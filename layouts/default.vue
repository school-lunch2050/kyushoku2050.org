<template>
  <div id="layout">
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
