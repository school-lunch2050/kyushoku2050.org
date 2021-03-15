<template>
  <div class="layout layout--default">
    <Nuxt :nuxt-child-key="'default'" />
    <progress-tracker />
    <sidebar />
  </div>
</template>
<script>
import { layoutDefaults } from '../assets/helpers'
export default {
  name: 'DefaultLayout',
  ...layoutDefaults
}
</script>
