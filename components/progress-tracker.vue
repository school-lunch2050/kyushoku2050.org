<template>
  <client-only>
    <div v-if="percent() === 100" class="progress font--tex progress--done" role="status">
      <a :href="$t('weblate.links.feedback')" target="_blank" class="progress--feedback--link">
        <svg class="progress--feedback-star" viewBox="-1.25 -1.25 2.5 2.5" xmlns="http://www.w3.org/2000/svg">
          <circle class="progress--feedback--star-bg" r="1.2" fill="rgba(0, 0, 0, 0.25)" />
          <path :d="`${circle} ${star(5, 0.8, 0.4)}`" fill-rule="even-odd" fill="white" />
        </svg>
        <div class="progress--feedback">
          <svg class="progress--feedback--bg" viewBox="0 0 200 50" preserveAspectRatio="none">
            <path class="progress--feedback--bg-shadow" d="M 0 15 L 90 12 L 100 0 L 112 14 L 200 15 L 195 50 L 1 48 Z" fill="rgba(0, 0, 0, 0.6)" />
          </svg>
          <div class="progress--feedback--button">
            <text-box key="weblate.scenario.progress.click" />
          </div>
        </div>
        <text-box key="weblate.scenario.progress.finished" class="progress--text" />
      </a>
      <progress-reset />
    </div>
    <div v-else-if="percent() > 0" class="progress font--tex progress--active" role="status">
      <svg class="progress--percent" viewBox="-1.25 -1.25 2.5 2.5" xmlns="http://www.w3.org/2000/svg">
        <circle r="1.2" fill="rgba(0, 0, 0, 0.25)" />
        <path
          :d="`${circle} M ${x(75, 0.95)} ${y(75, 0.95)} A 0.95 0.95 0 ${percent() > 50 ? '0' : '1'} 0 ${x(75 + percent(), 0.95)} ${y(75 + percent(), 0.95)} L 0 0 Z`"
          fill-rule="odd-even"
          fill="rgba(255, 255, 255, 0.8)"
        />
      </svg>
      <text-box key="weblate.scenario.progress.active" class="progress--text" :values="{ percent: percent() }" />
      <progress-reset />
    </div>
    <div v-else />
  </client-only>
</template>
<script lang="ts">
import Vue from 'vue'
import { percentage } from '~/store/progress'
import { activeLifecycle } from '~/assets/helpers'

function x (perc: number, radius: number = 1) {
  return Math.cos(perc * Math.PI * 0.02) * radius
}

function y (perc: number, radius: number = 1) {
  return Math.sin(perc * Math.PI * 0.02) * radius
}

function star (corners: number, r1: number, r2: number) {
  const points: Array<{ x: number, y: number }> = []
  const offset = -25
  const step = 100 / corners
  for (let i = 0; i < corners; i++) {
    const p1 = i * step + offset
    const p2 = (i + 0.5) * step + offset
    points.push({ x: x(p1, r1), y: y(p1, r1) })
    points.push({ x: x(p2, r2), y: y(p2, r2) })
  }
  return points.reverse().map((entry, index) => `${index === 0 ? 'M' : 'L'} ${entry.x} ${entry.y} `) + 'Z'
}

export default Vue.extend({
  data () {
    return {
      circle: 'M 1.1 0 A 1.1 1.1 0 1 1 -1.1 0 A 1.1 1.1 0 1 1 1.1 0 Z'
    }
  },
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
    star,
    x,
    y,
    percent () {
      return Math.round(percentage(this.$store.state.progress ?? {}) * 100)
    }
  }
})
</script>
