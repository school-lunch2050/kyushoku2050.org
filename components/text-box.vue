<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-if="useDiv" :key="this.$i18n.locale" :style="isDynamic ? dynamicStyle() : style" class="i18n-box i18n-box--center">
    <span v-html="html" />
  </div>
  <span v-else :key="this.$i18n.locale" :style="isDynamic ? dynamicStyle() : style" class="i18n-box i18n-box--span" v-html="html" />
</template>
<script lang="ts">
import Vue from 'vue'
import sanitize from 'sanitize-html'
import IVueI18n from 'vue-i18n/types'
import { toStyle, toPx } from '../lib'

interface Options {
  x: number | string | null
  y: number | string | null
  width: number | string | null
  height: number | string | null
  fontSize: any | null
  lineHeight: any | null
  align: string | null
  verticalAlign: string | null
  padding: string | null
}

const i18nLookups: { [key: string]: string[] } = {}

function getI18nLookups (locale: string): string[] {
  let lookups: string[] = i18nLookups[locale]
  if (lookups === undefined) {
    lookups = []
    const parts = locale.split('-')
    while (parts.length > 0) {
      lookups.push(parts.join('-'))
      parts.pop()
    }
    i18nLookups[locale] = lookups
  }
  return lookups
}

function getI18nSize (input: { [locale: string]: number }, i18n: IVueI18n): number | null {
  for (const locale of getI18nLookups(i18n.locale)) {
    const size = input[locale]
    if (typeof size === 'number' || typeof size === 'string') {
      return size
    }
  }
  return null
}

function createStyle (options: Options, i18n: IVueI18n): { isDynamic: boolean, style: string, useDiv: boolean } {
  const { x, y, width, height, padding } = options
  let { align, verticalAlign, fontSize, lineHeight } = options
  if (align && /\w+\s+\w+/.test(align)) {
    const parts = align.split(' ')
    align = parts[0]
    verticalAlign = verticalAlign ?? parts[1]
  }
  const alignItems = verticalAlign === 'center' ? 'center' : verticalAlign === 'right' ? 'end' : null
  const textAlign = align === 'center' ? 'center' : align === 'right' ? 'right' : null
  const justifyContent = align === 'center' ? 'center' : align === 'right' ? 'end' : null
  const absolute = (x ?? y ?? width ?? height ?? null) !== null
  let isDynamic = false
  if (fontSize !== null && typeof fontSize === 'object') {
    isDynamic = true
    fontSize = getI18nSize(fontSize, i18n)
  }
  if (lineHeight !== null && typeof lineHeight === 'object') {
    isDynamic = true
    lineHeight = getI18nSize(lineHeight, i18n)
  }
  return {
    isDynamic,
    useDiv: absolute || textAlign !== null || alignItems !== null,
    style: toStyle({
      alignItems,
      textAlign,
      justifyContent,
      position: absolute ? 'absolute' : null,
      left: toPx(x),
      top: toPx(y),
      fontSize,
      lineHeight,
      padding,
      width,
      height
    })
  }
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
    }
  },
  data () {
    return createStyle(this.$props as Options, this.$i18n)
  },
  computed: {
    html () {
      return sanitize(this.$i18n.t(String(this.$vnode.key)).toString(), {
        allowedTags: ['ruby', 'rt', 'rtc', 'br']
      })
    }
  },
  methods: {
    dynamicStyle (): string {
      return createStyle(this.$props as Options, this.$i18n).style
    }
  }
})
</script>
