# Installation

## Possible ways to install

### NPM

This is the recommended way to install this Plugin.

Install with npm as a dependency:

```bash
npm i portal-vue

# or with yarn, respectively:
yarn add portal-vue
```

Then include the package in your application and register it with Vue:

```javascript
import PortalVue from 'portal-vue' // as ES6 module
var PortalVue = require('portal-vue') // OR as a commonjs require

Vue.use(PortalVue)
```

### CDN

PortalVue is available through a couple of CDNs, I recommend
<a href="http://www.unpkg.com">unpkg.com</a>

Just include the script tag _after_ the one of Vue.js

```html
<scipt src="https://unpkg.com/vue/dist/vue.js"></scipt>
<script src="https://unpkg.com/portal-vue/dist/portal-vue.js"></script>
```

In this case, the plugin will auto-install itself, so there is no need to call Vue.use().

The components will be named `<portal>` and `<portal-target>`, respectively.

### Local copy

Of course you can include PortalVue into your page as a local file on your server as well.

The same rules and restrictions as for CDN apply.

### Nuxt Module

Add `portal-vue/nuxt` to modules section of `nuxt.config.js`

```javascript
{
  modules: ['portal-vue/nuxt']
}
```

## Options

When installing with `Vue.use()`, you can pass options to change the component names.

```javascript
Vue.use(PortalVue, {
  portalName: 'my-portal', // default: 'portal'
  portalTargetName: 'my-target', // default:'portal-target'
})
```

These options would make the components available globally as `<my-portal>` and `<my-target>` respectively.

## Using the components locally

If you don't want to register the components globally, don't do `Vue.use('PortalVue')`

Instead, import the component(s) in those components that you need them in and register them locally:

```javascript
import PortalVue from 'portal-vue'

export default {
  components: {
    Portal: PortalVue.Portal,
    PortalTarget: PortalVue.PortalTarget,
  },
}
```
