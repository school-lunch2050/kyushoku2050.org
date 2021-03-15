# PAGES

This directory contains your Application Views and Routes.
The framework reads all the `*.vue` files inside this directory and creates the router of your application.

Every `.vue` file here is supposed to export define two properties:

```javascript
<script>
export default {
  name: '<page-ame>', // Replace "page-name" with an upper-camel-case variant of the file name to make sure that the component is named properly, automatic naming doesnt work well.
  key: route => route.fullPath // To help make sure page changes are smooth, it helps to add this small helper!
}
</script>
```

If you use a typescript it will look a like this:

```typescript
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: '<page-name>',
  key: route => route.fullPath
})
</script>
```

## Content

Pages like `about` and `privacy-policy` are using the `i18nContent

---

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/routing).
