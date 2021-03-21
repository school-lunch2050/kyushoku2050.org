/**
 * Helper functions to make life easier with nuxt.
 */
import { Context } from '@nuxt/types'
// Next line is to make sure that the $content declaration is set.
/* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars */
import { IContentOptions } from '@nuxt/content'
import Vue from 'vue'
import IVueI18n from 'vue-i18n/types'
import sanitize from 'sanitize-html'

const DOMAIN = 'https://kyushoku2050.org'

export function numberStyle (node: HTMLElement, attr: 'width' | 'height' | 'left' | 'top'): number {
  const value = node.style[attr]
  if (value === null || value === undefined || value === '') {
    return 0
  }
  const parts = /^\s*([0-9]*(\.[0-9]+)?)\s*px\s*$/g.exec(value)
  if (!parts) {
    return 0
  }
  return parseFloat(parts[1])
}

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export function styleRect (node: HTMLElement): Rect {
  const width = numberStyle(node, 'width')
  const height = numberStyle(node, 'height')
  return {
    x: numberStyle(node, 'left'),
    y: numberStyle(node, 'top'),
    width,
    height
  }
}

export function toNum (input: string | number | null | undefined): number {
  if (input === null || input === undefined) {
    return 0
  }
  if (typeof input === 'number') {
    return input
  }
  return parseFloat(input)
}

export function toPx (input: string | number | null | undefined): string | undefined {
  if (typeof input === 'string') {
    if (input === '') {
      return
    }
    if (/^\s*[0-9]*(\.[0-9]+)?\s*$/.test(input)) {
      return input + 'px'
    }
    return input
  }
  if (typeof input === 'number') {
    return input.toString() + 'px'
  }
}

export function toStyle (style: { [key: string]: number | string | null | undefined }): string {
  return Object.entries(style)
    .map(([key, value]) => [key, toPx(value)])
    .filter(([_, value]) => Boolean(value))
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')
}

const activeLifecycleMap = new WeakMap<any, Function>()
const activeLifecycleLock = () => {}
export function activeLifecycle <TThis = any> (start: (this: TThis, obj: TThis) => (() => void) | undefined): {
  mounted (): void
  activated (): void
  deactivated (): void
  destroyed (): void
} {
  function activated (this: any) {
    if (activeLifecycleMap.has(this)) {
      return
    }
    // Preventing recursive loops
    activeLifecycleMap.set(this, activeLifecycleLock)
    const cb = start.call(this, this)
    if (cb === undefined || cb === null) {
      activeLifecycleMap.delete(this)
      return
    }
    activeLifecycleMap.set(this, cb)
  }
  function deactivated (this: any) {
    const stop = activeLifecycleMap.get(this)
    if (stop === undefined) {
      return
    }
    activeLifecycleMap.delete(this)
    stop()
  }
  return {
    activated,
    deactivated,
    mounted: activated,
    destroyed: deactivated
  }
}

function meta (name: string, content: string) {
  return {
    hid: name,
    name,
    content: removeRuby(content)
  }
}

function metas (metas: { [name: string]: string }) {
  return Object.entries(metas).map(([name, content]) => meta(name, content))
}

export function removeRuby (text: string): string {
  return text.replace(/<rt>(.*?)<\/rt>|<\/?ruby>|<br>/img, '').split('\n').join('').trim()
}

function countChars (str: string): number {
  return sanitize(removeRuby(str)).length
}

const countCharsCache: { [key: string]: number } = {}
export function countCharsCached (stringy: { toString(): string }): number {
  const str = stringy.toString()
  const cached = countCharsCache[str]
  if (cached !== undefined) {
    return cached
  }
  const count = countChars(str)
  countCharsCache[str] = count
  return count
}

function te (i18n: IVueI18n, key: string): boolean {
  if (i18n.te(key)) {
    return true
  }
  const fb = i18n.fallbackLocale
  if (typeof fb === 'string') {
    return i18n.te(key, fb)
  } else if (Array.isArray(fb)) {
    for (const loc of fb) {
      if (i18n.te(key, loc)) {
        return true
      }
    }
  } else if (typeof fb === 'object') {
    const fallback = fb[i18n.locale]
    if (fallback) {
      for (const locale of fallback) {
        if (i18n.te(key, locale)) {
          return true
        }
      }
    }
  }
  return false
}

export function head ({ $i18n, $route }: Vue) {
  const siteName = $i18n.t('weblate.title').toString()
  let title = siteName
  let image = $i18n.t('weblate.image').toString()
  let description: string | null = null
  const parts = typeof $route.name === 'string' ? /^(.*?)__/.exec($route.name) : null
  if (parts) {
    const id = parts[1]
    const base = `weblate.pages.${id}`
    const fullKey = `${base}.full`
    const shortKey = `${base}.short`
    if (te($i18n, shortKey)) {
      title = $i18n.t(shortKey).toString()
    } else if (te($i18n, fullKey)) {
      title = $i18n.t(fullKey).toString()
    }
    const imgKey = `${base}.image`
    if (te($i18n, imgKey)) {
      image = $i18n.t(imgKey).toString()
    }
    const descriptionKey = `${base}.description`
    if (te($i18n, descriptionKey)) {
      description = $i18n.t(descriptionKey).toString()
    }
  }
  return {
    htmlAttrs: {
      lang: $i18n.locale
    },
    meta: metas({
      'apple-mobile-web-app-title': siteName,
      'og:site_name': siteName,
      'og:title': title,
      'og:image': `${DOMAIN}/img/${image}`,
      'og:url': `${DOMAIN}${$route.path}`,
      'og:description': description ?? $i18n.t('weblate.description').toString()
    })
  }
}

export const layoutDefaults = {
  head
}

export async function i18nContent (options: string | { name: string, map: { [from: string]: string }}, context: Context): Promise<{ page: { [key: string]: any } }> {
  const { $content, app: { i18n: { locales } } } = context
  const page: { [key: string]: any } = {}
  const pageName = typeof options === 'string' ? options : options.name
  const map = typeof options === 'string' ? {} : options.map
  const list: Array<Promise<{ code: string, data: any }>> = (locales as Array<{ code: string}>)
    .map(async ({ code }: { code: string }): Promise<{ code: string, data: any }> => {
      const actualCode = map[code] ?? code
      return {
        code,
        data: await $content(`${pageName}_${actualCode}`).fetch()
      }
    })
  for (const { code, data } of await Promise.all(list)) {
    page[code] = data
  }
  return {
    page
  }
}

export function clearTextSelection () {
  if (typeof window === 'undefined') {
    return
  }
  if (window.getSelection) {
    const selection = window.getSelection()
    if (selection === null) {
      return
    }
    if (typeof selection.empty === 'function') { // Chrome
      selection.empty()
    } else if (typeof selection.removeAllRanges === 'function') { // Firefox
      selection.removeAllRanges()
    }
  }
}

export function getI18nSize (input: { [locale: string]: number }, i18n: IVueI18n): number | null {
  for (const locale of getI18nLookups(i18n.locale)) {
    const size = input[locale]
    if (typeof size === 'number' || typeof size === 'string') {
      return size
    }
  }
  return null
}

const i18nLookups: { [key: string]: string[] } = {}

export function getI18nLookups (locale: string): string[] {
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

export function i18nStyle (properties: Object, i18n: IVueI18n): { isDynamic: boolean, style: () => string } {
  const cache: { [key: string]: string } = {}
  const create = () => {
    let isDynamic = false
    const style: { [key: string]: any } = {}
    for (const [key, value] of Object.entries(properties)) {
      if (value !== null && typeof value === 'object') {
        isDynamic = true
        style[key] = getI18nSize(value, i18n)
      } else {
        style[key] = value
      }
    }
    const styleStr = toStyle(style)
    cache[i18n.locale] = styleStr
    return {
      isDynamic,
      styleStr
    }
  }
  return {
    isDynamic: create().isDynamic,
    style: () => {
      const cached = cache[i18n.locale]
      if (cached !== undefined) {
        return cached
      }
      return create().styleStr
    }
  }
}
