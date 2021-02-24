<template>
  <div class="layout layout--detail">
    <Nuxt :nuxt-child-key="'detail'" />
  </div>
</template>
<script>
import { layoutDefaults } from '../lib'
export default {
  name: 'DetailLayout',
  ...layoutDefaults
}
</script>
