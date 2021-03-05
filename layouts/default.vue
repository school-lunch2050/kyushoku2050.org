<template>
  <div class="layout layout--default">
    <browser-test />
    <sidebar />
    <Nuxt :nuxt-child-key="'default'" />
    <progress-tracker />
  </div>
</template>
<script>
import { layoutDefaults } from '../lib'
export default {
  name: 'DefaultLayout',
  ...layoutDefaults
}
</script>
