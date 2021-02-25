<template>
  <div id="layout">
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
