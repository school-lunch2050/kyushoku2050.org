<template>
  <div class="container">
    <div>
      <Chalkboard page="scenarios" prev="/scenarios">
        <CBMenu
          :title="$t('weblate.main.title')"
          :a="$t('weblate.garden.short')"
          :b="$t('weblate.cosmopolitan.short')"
          :c="$t('weblate.gamble.short')"
          :d="$t('weblate.desperate.short')"
        />
      </Chalkboard>
    </div>
  </div>
</template>
