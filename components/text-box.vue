<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-if="useDiv" :key="$i18n.locale" :style="style()" class="i18n-box i18n-box--placed">
    <span v-html="html" />
  </div>
  <span v-else :key="$i18n.locale" :style="style()" class="i18n-box i18n-box--span" v-html="html" />
</template>
<script lang="ts">
import Vue from 'vue'
import sanitize from 'sanitize-html'
import IVueI18n from 'vue-i18n/types'
import { i18nStyle } from '~/assets/helpers'

interface Options {
  x?: number | string | null
  y?: number | string | null
  width?: number | string | null
  height?: number | string | null
  fontSize: any | null
  lineHeight?: any | null
  align?: string | null
  verticalAlign?: string | null
  padding?: string | null
  margin?: string | null,
  customStyle?: Object | null
}

function removeNulls <T> (obj: T): T {
  for (const key in obj) {
    if (obj[key] === null) {
      delete obj[key]
    }
  }
  return obj
}

function createStyle (options: Options, i18n: IVueI18n): { isDynamic: boolean, style: () => string, useDiv: boolean } {
  const { customStyle } = options
  let additionalStyle = {}
  if (customStyle) {
    options = {
      ...customStyle,
      ...removeNulls(options)
    }
    additionalStyle = removeNulls({
      ...customStyle,
      // removing all the used properties
      x: null,
      y: null,
      width: null,
      height: null,
      padding: null,
      margin: null,
      align: null,
      verticalAlign: null,
      fontSize: null,
      lineHeight: null
    })
  }
  const { x, y, width, height, padding, margin, fontSize, lineHeight } = options
  let { align, verticalAlign } = options
  if (align && /\w+\s+\w+/.test(align)) {
    const parts = align.split(' ')
    align = parts[0]
    verticalAlign = verticalAlign ?? parts[1]
  }
  const alignItems = verticalAlign === 'center' ? 'center' : verticalAlign === 'right' ? 'end' : null
  const textAlign = align === 'center' ? 'center' : align === 'right' ? 'right' : null
  const justifyContent = align === 'center' ? 'center' : align === 'right' ? 'end' : null
  const absolute = (x ?? y ?? width ?? height ?? null) !== null
  return {
    ...i18nStyle({
      alignItems,
      textAlign,
      justifyContent,
      position: absolute ? 'absolute' : null,
      left: x,
      top: y,
      fontSize,
      lineHeight,
      padding,
      margin,
      width,
      height,
      ...additionalStyle
    }, i18n),
    useDiv: absolute || textAlign !== null || alignItems !== null
  }
}

function exists (i18n: IVueI18n, key: string, locale?: string): boolean {
  try {
    return i18n.te(key, locale)
  } catch (err) {
    return false
  }
}

function findKeyWithFallback (i18n: IVueI18n, key: string | null): { key: string, locale: string } | null {
  if (key === null) {
    return null
  }
  if (exists(i18n, key)) {
    return { key, locale: i18n.locale }
  }
  let { fallbackLocale: fbLocales } = i18n
  if (fbLocales === false || fbLocales === null || fbLocales === undefined) {
    return null
  }
  if (typeof fbLocales === 'string') {
    fbLocales = [fbLocales]
  } else if (!Array.isArray(fbLocales)) {
    fbLocales = fbLocales[i18n.locale]
    if (!fbLocales) {
      return null
    }
  }
  for (const locale of fbLocales) {
    if (exists(i18n, key, locale)) {
      return { key, locale }
    }
  }
  return null
}

function getKey (vue: Vue): string | null {
  const { key } = vue.$vnode
  if (key === null || key === undefined) {
    return null
  }
  return typeof key === 'number'
    ? String(key)
    : key.replace(/#(.*)/, '')
}

const validHTMLCache: { [translated: string]: string } = {}
function cachedValidHTML (translated: string): string {
  let valid = validHTMLCache[translated]
  if (valid === undefined) {
    valid = sanitize(
      translated,
      {
        allowedTags: ['ruby', 'rt', 'rtc', 'br']
      }
    ).replace(
      /@\[(.*?)\|(.*?)\|(.*?)\]/g,
      (_, name, src, alt) =>
        `<span class="i18n-img i18n-img--${name}"><picture><source srcset="/img/${src}.webp" type="image/webp" /><img src="/img/${src}.png" alt="${encodeURIComponent(alt)}" /></picture></span>`
    )
    validHTMLCache[translated] = valid
  }
  return valid
}

export default Vue.extend({
  props: {
    align: {
      type: [String],
      default: null
    },
    verticalAlign: {
      type: [String],
      default: null
    },
    lineHeight: {
      type: [String, Number, Object],
      default: null
    },
    fontSize: {
      type: [String, Number, Object],
      default: null
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    x: {
      type: [String, Number],
      default: null
    },
    y: {
      type: [String, Number],
      default: null
    },
    padding: {
      type: String,
      default: null
    },
    margin: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    values: {
      type: Object,
      default: null
    },
    customStyle: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      i18nKey: getKey(this as any),
      ...createStyle(this.$props as Options, this.$i18n)
    }
  },
  computed: {
    html () {
      const { i18nKey: key } = this as { i18nKey: string }
      const keySet = findKeyWithFallback(this.$i18n as any, key)
      const { text, values } = this.$props as any
      const base = text ?? (keySet ? this.$t(keySet.key, keySet.locale, values) : null)
      return base ? cachedValidHTML(base) : key
    }
  }
})
</script>
