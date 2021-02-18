
import { Locale, LocaleMessageObject } from 'vue-i18n'
import Vue, { VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import sanitizeHTML from 'sanitize-html'
// Following code is adopted from vue-i18n/src/directive.js

type EHTMlElement = HTMLElement & {
  _vtr?: string
  _locale?: string
  _localeMessage?: LocaleMessageObject
}

function bind (el: EHTMlElement, binding: DirectiveBinding, vnode: VNode): void {
  if (!assert(el, vnode)) { return }

  t(el, binding, vnode)
}

function update (el: EHTMlElement, binding: DirectiveBinding, vnode: VNode): void {
  if (!assert(el, vnode)) { return }

  const i18n: any = vnode.context?.$i18n
  if (localeEqual(el, vnode) &&
    ((!!binding.value && looseEqual(binding.value, binding.oldValue)) &&
     looseEqual(el._localeMessage, i18n.getLocaleMessage(i18n.locale)))) { return }

  t(el, binding, vnode)
}

function unbind (el: EHTMlElement, binding: DirectiveBinding, vnode: VNode): void {
  const vm: any = vnode.context
  if (!vm) {
    warn('Vue instance does not exists in VNode context')
    return
  }

  const i18n: any = vnode.context?.$i18n ?? {}
  if (!binding.modifiers.preserve && !i18n.preserveDirectiveContent) {
    el.textContent = ''
  }
  el._vtr = undefined
  delete el._vtr
  el._locale = undefined
  delete el._locale
  el._localeMessage = undefined
  delete el._localeMessage
}

Vue.directive('tr', {
  bind,
  unbind,
  update
})

function assert (_: any, vnode: any): boolean {
  const vm: any = vnode.context
  if (!vm) {
    warn('Vue instance does not exists in VNode context')
    return false
  }

  if (!vm.$i18n) {
    warn('VueI18n instance does not exists in Vue instance')
    return false
  }

  return true
}

function localeEqual (el: any, vnode: any): boolean {
  const vm: any = vnode.context
  return el._locale === vm.$i18n.locale
}

function t (el: EHTMlElement, binding: DirectiveBinding, vnode: VNode): void {
  const value: any = binding.value

  if (!value) {
    warn(`no value given for expression "${binding.expression}"`)
    return
  }
  const { path, locale, args, choice } = parseValue(value)
  if (!path && !locale && !args) {
    warn(`value "${value}" type not supported`)
    return
  }

  if (!path) {
    warn('`path` is required in v-t directive')
    return
  }

  const vm = vnode.context
  if (vm === undefined) {
    warn('no context')
    return
  }
  const text = (choice != null)
    ? vm.$i18n.tc(path, choice, ...makeParams(locale, args))
    : vm.$i18n.t(path, ...makeParams(locale, args)).toString()

  el._vtr = el.innerHTML = sanitizeHTML(text, {
    allowedTags: ['ruby', 'rt', 'rp', 'rtc', 'br']
  })
  el._locale = vm.$i18n.locale
  el._localeMessage = vm.$i18n.getLocaleMessage(vm.$i18n.locale)
}

function parseValue (value: any): { path?: string, locale?: Locale, args?: any, choice?: number } {
  let path: string | undefined
  let locale: Locale | undefined
  let args: any | undefined
  let choice: number | undefined

  if (isString(value)) {
    path = value
  } else if (isPlainObject(value)) {
    path = value.path
    locale = value.locale
    args = value.args
    choice = value.choice
  }

  return { path, locale, args, choice }
}

function makeParams (locale?: Locale, args?: any): Array<any> {
  const params: Array<any> = []

  locale && params.push(locale)
  if (args && (Array.isArray(args) || isPlainObject(args))) {
    params.push(args)
  }

  return params
}

/**
 * utilities
 */

function warn (msg: string, err?: Error): void {
  if (typeof console !== 'undefined') {
    console.warn('[vue-i18n] ' + msg)
    /* istanbul ignore if */
    if (err) {
      console.warn(err.stack)
    }
  }
}

const isArray = Array.isArray

function isObject (obj: any): obj is Object {
  return obj !== null && typeof obj === 'object'
}

function isString (val: any): val is string {
  return typeof val === 'string'
}

const toString: Function = Object.prototype.toString
const OBJECT_STRING: string = '[object Object]'
function isPlainObject (obj: any): boolean {
  return toString.call(obj) === OBJECT_STRING
}

function looseEqual (a: any, b: any): boolean {
  if (a === b) { return true }
  const isObjectA: boolean = isObject(a)
  const isObjectB: boolean = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA: boolean = isArray(a)
      const isArrayB: boolean = isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e: any, i: number): boolean => {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        const keysA: Array<string> = Object.keys(a)
        const keysB: Array<string> = Object.keys(b)
        return keysA.length === keysB.length && keysA.every((key: string): boolean => {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
