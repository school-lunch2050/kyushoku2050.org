<template>
  <g :transform="`translate(${place.x}, ${place.y})`">
    <svg-center-box
      class="cb--menu--item font--tex"
      x="0"
      font-size="100"
      :width="place.width"
      :height="place.height"
      :text="text"
    />
    <nuxt-link v-if="active" :to="link">
      <rect
        :width="place.width"
        :height="place.height"
        :class="`cb--menu--item-bg ${selected === item ? 'cb--menu--item-active' : 'cb--menu--item-button'}`"
      />
    </nuxt-link>
  </g>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    num: {
      type: String,
      required: true
    },
    item: {
      type: String,
      required: true
    },
    place: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      required: false
    },
    selected: {
      type: String,
      default: null
    }
  },
  computed: {
    text () {
      // @ts-ignore
      const { active, num, item } = this.$props as { active: boolean, item: string, num: string }
      return active ? this.$t(`weblate.${item}.short`) : num
    },
    link () {
      // @ts-ignore
      const { $props: { active, item }, localePath } = (this as { $props: { active: boolean, item: string }, localePath: (str: string) => string })
      return active ? localePath(`/main-${item}`) : null
    }
  }
})
</script>
