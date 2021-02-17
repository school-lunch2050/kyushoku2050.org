<template>
  <!-- eslint-disable vue/no-v-html -->
  <text
    ref="main"
    :x="x"
    :y="y"
    :text-anchor="textAnchor"
    :font-size="fontSize"
    v-html="html"
  />
</template>
<script lang="ts">
import { encode } from 'html-entities'
import Vue from 'vue'

function isElement (elem: Vue | Element | Vue[] | Element[]): elem is Element {
  if (Array.isArray(elem)) {
    return false
  }
  return elem instanceof Node
}

export default Vue.extend({
  props: {
    x: {
      type: [String, Number],
      required: false,
      default: null
    },
    y: {
      type: [String, Number],
      required: false,
      default: null
    },
    textAnchor: {
      type: String,
      required: false,
      default: null
    },
    text: {
      type: String,
      required: true
    },
    fontSize: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    html () {
      const { text } = this.$props
      const blocks = []
      let prev = 0
      const ruby = /<ruby>(.*?)<\/ruby>/ig
      let rubyPart
      while ((rubyPart = ruby.exec(text)) !== null) {
        if (rubyPart.index !== prev) {
          blocks.push({ text: text.substring(prev, rubyPart.index) })
        }
        const content = rubyPart[1]
        const rt = /(.*?)<rt>(.*?)<\/rt>/ig
        let prevRt = 0
        let rtPart
        while ((rtPart = rt.exec(content)) !== null) {
          if (rtPart.index !== prevRt) {
            blocks.push({ text: text.substring(prevRt, rtPart.index) })
          }
          blocks.push({ text: rtPart[1], ruby: rtPart[2] })
          prevRt = rtPart.index + rtPart[0].length
        }
        if (prevRt < content.length) {
          blocks.push({ text: content.substr(prevRt) })
        }
        prev = rubyPart.index + rubyPart[0].length
      }
      if (prev < text.length) {
        blocks.push({ text: text.substr(prev) })
      }
      const htmlW = blocks.map(({ text, ruby }) => `<tspan${ruby ? ` data-ruby="${ruby}"` : ''}>${encode(text)}</tspan>`).join('')
      return htmlW
    }
  },
  mounted () {
    // @ts-ignore - The types of vue seem to be off when we have a computed element
    const { main } = this.$refs as { [key: string]: Vue | Element | Vue[] | Element[] }
    if (!isElement(main)) {
      return
    }
    // TODO: find better way to do this...
    if (main.getAttribute('has-ruby')) {
      return
    }
    main.setAttribute('has-ruby', 'true')
    let parent = main.parentNode as Element
    let rootSvg
    while (parent !== document.body) {
      if (parent.nodeName === 'svg' && parent.getAttribute('viewBox')) {
        rootSvg = parent
        break
      }
      parent = parent.parentNode as Element
    }
    if (!rootSvg) {
      return
    }
    const viewBox = rootSvg.getAttribute('viewBox')
    if (typeof viewBox !== 'string') {
      return
    }
    const nodes = Array.from(main.querySelectorAll('tspan[data-ruby]'))
    if (nodes.length === 0) {
      return
    }
    const svgBounds = rootSvg.getBoundingClientRect()
    const baseCoord = viewBox.split(/\s+/).map(entry => parseFloat(entry))
    const measure = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    const baseRect = {
      width: baseCoord[2],
      height: baseCoord[3]
    }
    measure.setAttribute('x', baseCoord[0].toString())
    measure.setAttribute('y', baseCoord[1].toString())
    measure.setAttribute('width', baseRect.width.toString())
    measure.setAttribute('height', baseRect.height.toString())
    rootSvg.appendChild(measure)
    const measureBounds = measure.getBoundingClientRect()
    rootSvg.removeChild(measure)
    const fSvg = svgBounds.width / svgBounds.height
    const fBase = baseRect.width / baseRect.height
    const scale = fSvg < fBase ? baseRect.width / svgBounds.width : baseRect.height / svgBounds.height
    for (const node of nodes) {
      const ruby = node.getAttribute('data-ruby')
      if (typeof ruby !== 'string') {
        continue
      }
      const bounds = node.getBoundingClientRect()
      const rel = {
        x: (bounds.x - measureBounds.x) * scale,
        y: (bounds.y - measureBounds.y) * scale,
        width: bounds.width * scale,
        height: bounds.height * scale
      }
      const height = (rel.height * 0.3)
      const container = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      container.setAttribute('width', rel.width.toString())
      container.setAttribute('height', (height * 2).toString())
      container.setAttribute('x', rel.x.toString())
      container.setAttribute('y', (rel.y - height).toString())
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.innerHTML = ruby
      text.classList.add('font--ruby')
      text.style.fontSize = `${height.toString()}px`
      text.setAttribute('x', '50%')
      text.setAttribute('y', '50%')
      text.setAttribute('text-anchor', 'middle')
      container.appendChild(text)
      rootSvg.appendChild(container)
    }
  }
})
</script>
