<template>
  <div class="lunch-detail">
    <detail-header :type="type" />
    <main class="main--lunch-detail">
      <lunch :type="type" />
      <view-box ref="viewbox" width="3157" height="2500" :get-viewbox="getViewbox" :unfocus="gotoMain">
        <slot />
      </view-box>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { styleRect, ActivityMap } from '../lib'

const activity = new ActivityMap()

function start (this: Vue) {
  let hash = document.location.hash
  const interval = setInterval(() => {
    const newHash = document.location.hash
    if (newHash !== hash) {
      hash = newHash
      ;(this.$refs.viewbox as Vue).$forceUpdate()
    }
  })
  activity.start(this, () => {
    clearInterval(interval)
  })
}

export default Vue.extend({
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      getViewbox: (container?: HTMLElement) => {
        if (typeof document === 'undefined') {
          return null
        }
        if (!container) {
          return null
        }
        const id = (document.location.hash ?? '').substr(1)
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
  mounted () {
    start.call(this)
  },
  activated () {
    start.call(this)
  },
  deactivated () {
    activity.stop(this)
  },
  destroyed () {
    activity.stop(this)
  },
  methods: {
    gotoMain () {
      const { location } = this.$router.resolve({ hash: '#' }, this.$route)
      this.$router.push(location)
    }
  }
})
</script>
