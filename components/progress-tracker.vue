<template>
  <client-only>
    <div v-if="percent() > 0" class="progress font--tex">
      <text-box :key="percent() === 100 ? 'weblate.scenario.progress.finished' : 'weblate.scenario.progress.active'" :values="{ percent: percent() }" />
    </div>
  </client-only>
</template>
<script lang="ts">
import Vue from 'vue'
import { percentage } from '../store/progress'
import { activeLifecycle } from '~/lib'

export default Vue.extend({
  // ↓ This is an ugly workaround to react to store changes.
  // eslint-disable-next-line no-extra-parens
  ...activeLifecycle<Vue & { percent(): number }>(function () {
    let current = this.percent()
    return this.$store.subscribe(
      (mutation) => {
        if (mutation.type.startsWith('progress/')) {
          const perc = this.percent()
          if (current !== perc) {
            current = perc
            this.$forceUpdate()
          }
        }
      })
  }),
  methods: {
    percent () {
      return Math.round(percentage(this.$store.state.progress ?? {}) * 100)
    }
  }
})
</script>
