# PortalVue

> A Portal Component for Vuejs, to render DOM outside of a component, anywhere in the document.

<!-- markdownlint-disable MD033 -->
<p style="tex-align: center">
  <img src="https://portal-vue.linusb.org/logo.png" alt="PortalVue Logo">
</p>

<p>
<a href='https://ko-fi.com/R6R7QW4D' target='_blank'>
  <img height='36' style='border:0px;height:36px;margin-bottom:30px;' src='https://az743702.vo.msecnd.net/cdn/kofi4.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' />
</a>
<p>

For more detailed documentation and additional Information, [please visit the docs](https://portal-vue.linusb.org).

> Looking for version 1.\*? [Docs for version 1 are here](https://v1.portal-vue.linusb.org)

## Installation

```bash
npm i portal-vue

# or

yarn add portal-vue
```

```javascript
import PortalVue from 'portal-vue'
Vue.use(PortalVue)
```

## Usage

```html
<portal to="destination">
  <p>This slot content will be rendered wherever the <portal-target> with name 'destination'
    is  located.</p>
</portal>

<portal-target name="destination">
  <!--
  This component can be located anywhere in your App.
  The slot content of the above portal component will be rendered here.
  -->
</portal-target>
```

## Nuxt module

Add `portal-vue/nuxt` to modules section of `nuxt.config.js`

```javascript
{
  modules: ['portal-vue/nuxt']
}
```
