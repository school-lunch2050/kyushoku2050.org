<template>
  <main-screen key="main" next="/lunch">
    <template #chalkboard>
      <kyushoku-img width="500" height="500" src="logo" />
      <text-box
        key="weblate.introduction.start.text"
        class="font--tex"
        align="center center"
        y="0"
        width="2235"
        height="1401"
      />
    </template>
  </main-screen>
</template>
<script>
export default {
  name: 'PageIndex',
  key: route => route.fullPath
}
</script>
