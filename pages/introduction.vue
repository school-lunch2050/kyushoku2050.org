<template>
  <main-screen key="main" prev="/lunch" next="/weather" lunch-type="!">
    <template #chalkboard>
      <text-box
        key="weblate.introduction.introduction.text"
        class="font--tex"
        align="center center"
        width="2235"
        height="1401"
      />
    </template>
  </main-screen>
</template>
<script>
export default {
  name: 'PageIntroduction',
  key: route => route.fullPath
}
</script>
