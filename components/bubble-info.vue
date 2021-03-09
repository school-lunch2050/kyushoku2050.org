<template>
  <div class="bubble-info">
    <nuxt-link v-for="ingredient in bubble.ingredients" :to="`#ingredient-${ingredient.key}`" :key="ingredient.key">
      <div :style="ingredient.iconStyle" :class="`bubble-info--ingredient bubble-info--ingredient-${lunch.id}`">
        <text-box :key="`weblate.ingredients.${ingredient.key}.name`" />
      </div>
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { lunchForBubble } from '~/assets/lunches'
import { bubbles, Bubble } from '~/assets/bubbles'

export default Vue.extend({
  data () {
    const bubbleKey = this.$vnode.key as Bubble
    const bubble = bubbles[bubbleKey]
    if (!bubble) {
      return {}
    }
    const lunch = lunchForBubble(bubbleKey)
    return {
      bubble,
      lunch
    }
  }
})
</script>
