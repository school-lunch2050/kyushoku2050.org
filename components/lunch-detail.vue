<template>
  <div class="lunch-detail">
    <detail-header :type="type" />
    <main class="main--lunch-detail">
      <div class="lunch-detail--lunch">
        <lunch :type="type" />
      </div>
      <div class="lunch-detail--spacer">
        <text-box key="weblate.scenario.actions.more" class="font--tex" />
      </div>
      <view-box
        ref="viewbox"
        :data-hash="$route.hash || ''"
        width="3157"
        height="2500"
        :get-viewbox="getViewbox"
        :unfocus="gotoMain"
      >
        <slot />
      </view-box>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Store } from 'vuex/types'
import { styleRect } from '../lib'

function mark (store: Store<any>, type: string) {
  store.commit('progress/mark', type)
}

export default Vue.extend({
  name: 'LunchDetail',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      getViewbox: (container?: HTMLElement) => {
        if (!container) {
          mark(this.$store, this.$props.type)
          return null
        }
        const id = (this.$route.hash ?? '').substr(1)
        const elem = container.querySelector(`.box--${id}`)
        if (!(elem instanceof HTMLElement)) {
          mark(this.$store, this.$props.type)
          return null
        }
        mark(this.$store, `${this.$props.type}.${id}`)
        return {
          id,
          rect: styleRect(elem)
        }
      }
    }
  },
  methods: {
    gotoMain () {
      const { location } = this.$router.resolve({ hash: '#' }, this.$route)
      this.$router.push(location)
    }
  }
})
</script>
