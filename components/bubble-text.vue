<template>
  <g>
    <svg-center-box
      :x="rect.x"
      :y="rect.y"
      :width="rect.width"
      :height="rect.height"
      line-height="20"
      :text="text"
      class="font--tex"
    />
  </g>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true
    },
    bubble: {
      type: [String, Object],
      required: true
    },
    viewRect: {
      type: Object,
      required: true
    },
    rect: {
      type: Object,
      required: true
    }
  },
  computed: {
    text () {
      const path = this.$props.id.split('.')
      path.splice(1, 0, 'bubbles')
      return this.$t(`weblate.${path.join('.')}.text`)
    }
  }
})
</script>
