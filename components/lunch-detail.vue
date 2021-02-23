<template>
  <div class="lunch-detail">
    <detail-header :type="type" />
    <main class="main--lunch-detail">
      <div class="lunch-detail--lunch">
        <lunch :type="type" />
      </div>
      <div class="lunch-detail--spacer">
        <text-box key="weblate.scenario.actions.more" class="font--tex" />
      </div>
      <view-box
        ref="viewbox"
        :data-hash="$route.hash || ''"
        width="3157"
        height="2500"
        :get-viewbox="getViewbox"
        :unfocus="gotoMain"
      >
        <slot />
      </view-box>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { styleRect } from '../lib'

export default Vue.extend({
  name: 'LunchDetail',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      getViewbox: (container?: HTMLElement) => {
        if (!container) {
          return null
        }
        const id = (this.$route.hash ?? '').substr(1)
        const elem = container.querySelector(`.box--${id}`)
        return (elem instanceof HTMLElement)
          ? {
              id,
              rect: styleRect(elem)
            }
          : null
      }
    }
  },
  methods: {
    gotoMain () {
      const { location } = this.$router.resolve({ hash: '#' }, this.$route)
      this.$router.push(location)
    }
  }
})
</script>
