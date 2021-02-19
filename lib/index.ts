import { Context } from '@nuxt/types'
// Next line is to make sure that the $content declaration is set.
/* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars */
import { IContentOptions } from '@nuxt/content'

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
  ratio: number
}

export function styleRect (node: HTMLElement): Rect {
  const width = numberStyle(node, 'width')
  const height = numberStyle(node, 'height')
  return {
    x: numberStyle(node, 'left'),
    y: numberStyle(node, 'top'),
    width,
    height,
    ratio: width / height
  }
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

export class ActivityMap {
  map = new WeakMap<any, Function>()

  start (obj: any, close: Function): void {
    this.stop(obj)
    this.map.set(obj, close)
  }

  stop (obj: any): void {
    const prev = this.map.get(obj)
    if (prev) {
      prev()
    }
  }
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
        code: actualCode,
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
