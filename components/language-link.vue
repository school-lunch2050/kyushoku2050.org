<template>
  <nuxt-link
    :to="switchLocalePath(locale.code)"
    :class="{ 'lang--link': true, [`font--nav--${locale.code}`]: true, 'nuxt-link-exact-active': active }"
  >
    {{ name }}
  </nuxt-link>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    locale: {
      type: Object,
      required: true
    }
  },
  computed: {
    name () {
      // @ts-ignore
      return this.$props.locale.name ?? this.$props.locale.code
    },
    active () {
      // @ts-ignore
      return this.$props.locale.code === this.$i18n.locale
    }
  }
})
</script>
