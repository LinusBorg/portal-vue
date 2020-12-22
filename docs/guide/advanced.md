---
sidebar: auto
prev: ./getting-started
next: ./caveats
---

# Advanced Usage

## Switching targets & sources

The `to` prop of `<portal>` and the `name` prop of `<portal-target>` can be changed dynamically with `v-bind`, allowing you to send content of one `<portal>` to a different `<portal-target>`, or switch the source of a `<portal-target>` from one `<portal>` to another.

<!-- prettier-ignore -->
```html
<portal v-bind:to="name">
  Content will be dynamically sent to the destination that `name` evaluates to
</portal>

<portal-target v-bind:name="name">
  by changing the 'name', you can define which portal's content should be shown.
</portal-target>
```
## Scoped Slots <Badge text="1.3.0+" />

PortalVue can also be used with [Scoped Slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots)! This allows you to send a scoped slot to a PortalTarget, which can then provide props for the slot content:

<!-- prettier-ignore -->
```html
<portal to="destination">
  <p slot-scope="{message}">{{message}}</p>
</portal>

<portal-target
  name="destination"
  :slot-props="{message: 'Hello from the Target to You!'}"
/>
```

**Result:**

<!-- prettier-ignore -->
```html
<!-- rendered in the target location-->
<p>Hello from the Target to You!</p>
```

## Transitions <Badge text="1.2.0+"/>

### Portal Transitions 

You can pass transitions to a `<portal>` without problems. It will behave just the same when the content is being rendered in the `<portal-target>`:

<!-- prettier-ignore -->
```html
<portal to="destination">
  <transition name="fade">
    <p v-if="hasMessages" key="1">You have {{messages.length}} new messages</p>
    <p v-else key="2">No unread messages</p>
  </transition>
</portal>
```

However, if you use a `<portal-target>` for multiple `<portal>`s, you likely want to define the transition on the target end instead. This is also supported.
#### PortalTarget Transitions <Badge text="3.0.0+" />

<!-- prettier-ignore -->
```html
<portal-target name="target">
  <template v-slot:wrapper="nodes">
    <transition name="fade" mode="out-in">
      <component :is="nodes[0]" />
    </transition>
  </template>
</portal-target>
```

Transitions for Targets underwent a redesign in PortalVue `3.0`. The new syntax is admittedly a bit more verbose and has a hack-ish feel to it, but it's a valid use of Vue's v-slot syntax and was necessary to get rid of some nasty edge cases with target Transitions that we had in PortalVue `2.*`.

Basically, you pass a transisiton to a slot named `wrapper` and get an array called `nodes` from its slot props.

You can the use Vue'S `<component :is="">` to turn those into the content of the transition.

Here's a second example, using a `<transition-group>` instead:

<!-- prettier-ignore -->
```html
<portal-target name="target">
  <template #wrapper="nodes">
    <transition-group name="fade">
      <component :is="node" v-for="node in nodes" :key="node" />
    </transition-group>
  </template>
  </portal-target>
```

## Proper namespacing

In order to move content from `Portals` to `PortalTargets`, some intermediary state management is required to coordinate between the two. We call this the "wormhole".

In PortalVue `<=2.*`, this wormhole was a singleton instance, and as a consequence, the namespace for `to` and `name` properties was also global.

In PortalVue `3.0` we still use a default wormhole, but now also support creating your own wormhole instance(s) and providing them to your portal components in different areas of your app - or different apps on the same page.

This makes working with names a bit less prone to conflicts, especially when 3rd-party libraries that you are using in your projects also use portal-vue to move things around without you even knowing.

So how does it work?

TODO: properly document using `createWormhole()`

## Rendering outside of the Vue-App <Badge text="3.0.0+"/>

TODO: Introduce `createPortalTarget` and explain limited usage scenarios
