<template>
  <img ref="main" v-on:click="toggle" />
</template>
<script lang="ts">
import Vue from 'vue'

const mask = {
  shape: 'M2995.08984,7.8359375 C3043.88281,7.8359375 3089.56641,20.5820313 3126.35156,43.515625 C3163.13672,66.4492188 3194.95054,99.1093191 3203.59766,135.425781 C3218.4733,197.901041 3251.64255,286.390474 3366.48047,373.375 C3423.89992,416.867634 3505.72266,475.417969 3545.10547,583.03125 C3550.48599,597.733491 3568.30505,646.539152 3585.17969,697.363281 C3660.777,925.052128 3825.25929,1421.90475 3854.21094,1518.96484 C3872.20267,1579.28195 3869.57058,1647.36109 3853.30078,1705.15234 C3836.38867,1765.22512 3798.82555,1814.40952 3756.01172,1844.74609 C3672.86749,1903.65955 3619.42188,1913.51953 3538.45313,1915.26172 C3457.48438,1917.00391 3350.96035,1888.44212 3284.12891,1845.71484 C3242.21484,1818.91797 3147.53747,1756.59278 3002.29297,1708.94531 C2855.21732,1660.69714 2628.90269,1668.50984 2379.93359,1674.24219 C2280.99324,1676.52022 1673.35669,1674.13719 1357.84375,1669.41797 C1220.87732,1667.36932 1111.92553,1663.44922 1062.46875,1663.44922 C900.955987,1663.44922 721.663429,1713.90357 592.210937,1793.02734 C488.85729,1856.19902 381.899842,1906.91349 261.71875,1889.62109 C194.50811,1879.95041 154.127553,1868.9181 86.9179688,1806.78516 C48.9845611,1771.71703 27.8938497,1735.10107 17.5117188,1688.69922 C2.64734086,1622.26443 14.5842467,1549.69948 24.8359375,1514.51953 C48.8978761,1431.948 237.92321,873.578038 309.253906,667.457031 C361.343315,516.936683 426.359721,470.115815 489.035156,423.652344 C512.590445,406.189992 571.512965,347.46567 584.722656,329.257813 C613.980469,288.929688 627.283305,256.934247 650.703125,185.019531 C664.078125,143.949219 686.524788,117.465275 729.277344,90.6796875 C772.274237,63.7410163 822.242328,51.6606254 881.019531,51.03125 C931.438407,50.491374 1261.65913,43.6635613 1647.17188,36.734375 C2033.5317,29.7899634 2482.83769,20.1571509 2995.08984,7.8359375 Z',
  width: 7748 / 2,
  height: 3852 / 2
}

const types = ['?', '!', 'gamble', 'cosmopolitan', 'desperate', 'garden'] as const
const imageCache: { [url: string]: Promise<string> } = {}

function loadImage (url: string): Promise<string> {
  let cached = imageCache[url]
  if (cached !== undefined) {
    return cached
  }
  cached = fetch(url)
    .then((result) => {
      if (!result.ok) {
        return Promise.reject(new Error(`Http result not ok for "${url}"`))
      }
      return result.blob()
    })
    // .then(blob => blob.arrayBuffer())
    // .then(buffer => new Blob([buffer], { type: 'image/webp' }))
    .then(blob => URL.createObjectURL(blob))
  imageCache[url] = cached
  return cached
}

const lunchCache: { [type in (typeof types[number])]: Promise<string> } = {}

function loadBg (type: Omit<typeof types[number], '?' | '!'> | 'empty'): Promise<string> {
  return loadImage(`/img/lunch/lunch_${type}.webp`)
}

function loadType (type: typeof types[number]): Promise<string> {
  let cached = lunchCache[type]
  if (cached) {
    return cached
  }
  cached = loadBg((type === '?' || type === '!') ? 'empty' : type)
    .then((imgSrc) => {
      const img = document.createElement('img')
      return new Promise<HTMLImageElement>((resolve, reject) => {
        let hasError = false
        img.onerror = (error) => {
          hasError = true
          reject(error)
        }
        img.src = imgSrc
        const next = () => {
          setTimeout(() => {
            if (img.complete) {
              resolve(img)
            } else if (!hasError) {
              next()
            }
          }, 0)
        }
        next()
      })
    })
    .then((img) => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return Promise.reject(new Error('no 2d context available'))
      }
      // TODO: Draw ?! for '?' or '!' type
      ctx.clip(new Path2D(mask.shape))
      ctx.drawImage(img, 0, 0)
      return canvas.toDataURL()
    })
  lunchCache[type] = cached
  return cached
}

let prev: Promise<string> | undefined
for (const type of types) {
  if (prev) {
    prev = prev.then(() => loadType(type))
  } else {
    prev = loadType(type)
  }
}

export default Vue.extend({
  props: {
    type: {
      type: String,
      required: true,
      validator: value => types.includes(value as any)
    }
  },
  mounted () {
    const { main } = this.$refs
    loadType(this.$props.type)
      .then(
        (src) => {
          main.setAttribute('src', src)
        },
        err => console.error(err)
      )
  },
  methods: {
    toggle () {
      const { main } = this.$refs
      loadType(types[((Math.random() * types.length) % types.length) | 0])
        .then(
          (src) => {
            main.setAttribute('src', src)
          },
          err => console.error(err)
        )
    }
  }
})
</script>

<style>
img {
  width: 100%;
}
</style>
