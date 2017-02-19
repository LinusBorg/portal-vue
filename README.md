# PortalVue

> A Portal Component for Vuejs, to render DOM outside of a component, anywhere in the document.

<p style="tex-align: center">
  <img src="http://portal-vue.github.io" alt="PortalVue Logo">
</p>


For more detailed documentation and additional Information, visit <a href="http://portal-vue.github.io">the docs</a>

## Installation

```
npm install -g portal-vue

// in .js
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
  This component can be located anwhere in your App.
  The slot content of the above portal component will be rendered here.
  -->
</portal-target>
```
