<template>
  <header class="detail-header font--tex">
    <nuxt-link :to="{ path: localePath('/main'), hash: type }" class="detail-header--back">
      &lt;
    </nuxt-link>
    <h1 class="detail-header--title">
      <text-box :key="`weblate.pages.${type}.short`" />
    </h1>
    <div class="detail-header--progress">
      <text-box key="weblate.scenario.progress.active" :values="{ percent: percent() }" />
    </div>
  </header>
</template>
<script lang="ts">
import Vue from 'vue'
import { percentage } from '../store/progress'
import { ActivityMap } from '../lib'

const activity = new ActivityMap()

// ↓ This is an ugly workaround to react to store changes.
function activate (this: Vue & { percent: () => number }) {
  activity.stop(this)
  let current = this.percent()
  const unwatch = this.$store.subscribe(
    (mutation) => {
      if (mutation.type.startsWith('progress/')) {
        const perc = this.percent()
        if (current !== perc) {
          current = perc
          this.$forceUpdate()
        }
      }
    })
  activity.start(this, unwatch)
}

export default Vue.extend({
  props: {
    type: {
      type: String,
      required: true
    }
  },
  mounted: activate,
  activated: activate,
  deactivated () {
    activity.stop(this)
  },
  methods: {
    percent () {
      return Math.round(percentage(this.$store.state.progress ?? {}) * 100)
    }
  }
})
</script>
