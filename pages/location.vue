<template>
  <main-screen key="main" prev="/weather" next="/scenarios" lunch-type="!">
    <template #chalkboard>
      <text-box
        key="weblate.introduction.location.title"
        class="font--tex cb--question--title"
        align="center center"
        y="100"
        width="2235"
        height="300"
      />
      <div class="cb-options">
        <cb-option title="weblate.introduction.location.near.text" image="place_local" />
        <cb-option title="weblate.introduction.location.far.text" image="place_global" />
      </div>
    </template>
  </main-screen>
</template>
<script>
export default {
  name: 'PageLocation',
  key: route => route.fullPath
}
</script>
