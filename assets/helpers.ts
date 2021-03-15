/**
 * Helper functions to make life easier with nuxt.
 */
import { Context } from '@nuxt/types'
// Next line is to make sure that the $content declaration is set.
/* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars */
import { IContentOptions } from '@nuxt/content'
import Vue from 'vue'
import sanitize from 'sanitize-html'

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

export function head ({ $i18n, $route }: Vue) {
  const siteName = $i18n.t('weblate.title').toString()
  let title = siteName
  let description: string | null = null
  const parts = typeof $route.name === 'string' ? /^(.*?)__/.exec($route.name) : null
  if (parts) {
    const id = parts[1]
    const base = `weblate.pages.${id}`
    const fullKey = `${base}.full`
    const shortKey = `${base}.short`
    if ($i18n.te(shortKey)) {
      title = $i18n.t(shortKey).toString()
    } else if ($i18n.te(fullKey)) {
      title = $i18n.t(fullKey).toString()
    }
    const descriptionKey = `${base}.description`
    if ($i18n.te(descriptionKey)) {
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
