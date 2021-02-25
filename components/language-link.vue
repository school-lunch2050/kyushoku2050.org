<template>
  <fragment>
    <div v-if="active" :class="`active lang--link font--nav--${locale.code}`">
      {{ name }}
    </div>
    <nuxt-link
      v-else
      :to="switchLocalePath(locale.code)"
      :class="`lang--link font--nav--${locale.code}`"
    >
      {{ name }}
    </nuxt-link>
  </fragment>
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
