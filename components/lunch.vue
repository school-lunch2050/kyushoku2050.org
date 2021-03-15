<template>
  <div ref="lunch" class="lunch" :aria-label="$t('weblate.lunch.label', { name: type == '?' ? $t('weblate.lunch.question') : type === '!' ? $t('weblate.lunch.alert') : $t(`weblate.pages.${type}.full`) })">
    <svg class="lunch--image" viewBox="0 0 3874 1926" version="1.1">
      <defs>
        <clipPath id="lunchMask">
          <path d="M2995.08984,7.8359375 C3043.88281,7.8359375 3089.56641,20.5820313 3126.35156,43.515625 C3163.13672,66.4492188 3194.95054,99.1093191 3203.59766,135.425781 C3218.4733,197.901041 3251.64255,286.390474 3366.48047,373.375 C3423.89992,416.867634 3505.72266,475.417969 3545.10547,583.03125 C3550.48599,597.733491 3568.30505,646.539152 3585.17969,697.363281 C3660.777,925.052128 3825.25929,1421.90475 3854.21094,1518.96484 C3872.20267,1579.28195 3869.57058,1647.36109 3853.30078,1705.15234 C3836.38867,1765.22512 3798.82555,1814.40952 3756.01172,1844.74609 C3672.86749,1903.65955 3619.42188,1913.51953 3538.45313,1915.26172 C3457.48438,1917.00391 3350.96035,1888.44212 3284.12891,1845.71484 C3242.21484,1818.91797 3147.53747,1756.59278 3002.29297,1708.94531 C2855.21732,1660.69714 2628.90269,1668.50984 2379.93359,1674.24219 C2280.99324,1676.52022 1673.35669,1674.13719 1357.84375,1669.41797 C1220.87732,1667.36932 1111.92553,1663.44922 1062.46875,1663.44922 C900.955987,1663.44922 721.663429,1713.90357 592.210937,1793.02734 C488.85729,1856.19902 381.899842,1906.91349 261.71875,1889.62109 C194.50811,1879.95041 154.127553,1868.9181 86.9179688,1806.78516 C48.9845611,1771.71703 27.8938497,1735.10107 17.5117188,1688.69922 C2.64734086,1622.26443 14.5842467,1549.69948 24.8359375,1514.51953 C48.8978761,1431.948 237.92321,873.578038 309.253906,667.457031 C361.343315,516.936683 426.359721,470.115815 489.035156,423.652344 C512.590445,406.189992 571.512965,347.46567 584.722656,329.257813 C613.980469,288.929688 627.283305,256.934247 650.703125,185.019531 C664.078125,143.949219 686.524788,117.465275 729.277344,90.6796875 C772.274237,63.7410163 822.242328,51.6606254 881.019531,51.03125 C931.438407,50.491374 1261.65913,43.6635613 1647.17188,36.734375 C2033.5317,29.7899634 2482.83769,20.1571509 2995.08984,7.8359375 Z" />
        </clipPath>
      </defs>
      <client-only>
        <image :href="image" clip-path="url(#lunchMask)" width="3874" height="1926" aria-hidden="true" />
      </client-only>
      <text :class="{ 'lunch--alert': true, 'lunch--alert--visible': type === '?' || type === '!' }" x="1850" y="600" aria-hidden="true">{{ type === '?' || type === '!' ? type : '' }}</text>
    </svg>
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { activeLifecycle } from '~/assets/helpers'
const { platform, appVersion } = typeof window !== 'undefined' ? window.navigator : { platform: '', appVersion: '' }
let iOS = -1
if (/iP(hone|od|ad)/.test(platform)) {
  const v = appVersion.match(/OS (\d+)/)
  if (v) {
    iOS = parseInt(v[1])
  }
}

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: null
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100%'
    },
    x: {
      type: [String, Number],
      default: null
    },
    y: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    image () {
      const { type } = this.$props
      return `/img/lunch/${type === '?' || type === '!' ? 'empty' : type}.${(iOS === -1 || iOS >= 14) ? 'webp' : 'jpg'}`
    },
    entries () {
      const { lunch } = this.$refs
      if (!(lunch instanceof HTMLElement)) {
        return []
      }
      const entries = []
      for (const elem of Array.from(lunch.querySelectorAll('.lunch-item--marker')) as HTMLDivElement[]) {
        entries.push({
          x: parseFloat(elem.style.left),
          y: parseFloat(elem.style.top),
          elem
        })
      }
      return entries
    }
  },
  ...activeLifecycle<Vue & { entries: Array<any> }>(function () {
    let previous: any = null
    const { lunch } = this.$refs
    if (!(lunch instanceof HTMLElement)) {
      return
    }
    const update = (e?: MouseEvent | TouchEvent) => {
      let closest = null
      let max = Number.POSITIVE_INFINITY
      if (e && e.type !== 'mouseout') {
        const rect = lunch.getBoundingClientRect()
        const scale = 2636 / rect.width
        const root = (e instanceof MouseEvent) ? e : e.touches[0]
        const pos = {
          x: (root.pageX - rect.x - window.scrollX) * scale,
          y: (root.pageY - rect.y - window.scrollY) * scale
        }
        for (const entry of this.entries) {
          const xDiff = Math.abs(entry.x - pos.x)
          const yDiff = Math.abs(entry.y - pos.y)
          const xS = xDiff * xDiff
          const yS = yDiff * yDiff
          const dist = Math.sqrt(xS + yS)
          if (closest === null || max > dist) {
            closest = entry.elem
            max = dist
          }
        }
      }
      if (closest === previous) {
        return
      }
      if (closest !== null) {
        closest.focus()
      } else if (previous !== null) {
        previous.blur()
      }
      previous = closest
    }
    update()
    lunch.addEventListener('mousemove', update)
    lunch.addEventListener('mouseout', update)
    window.addEventListener('touchstart', update)
    window.addEventListener('touchend', update)
    window.addEventListener('touchmove', update)
    return () => {
      lunch.removeEventListener('mousemove', update)
      lunch.removeEventListener('mouseout', update)
      window.removeEventListener('touchstart', update)
      window.removeEventListener('touchend', update)
      window.removeEventListener('touchmove', update)
    }
  })
})
</script>
