---
sidebar: auto
---

# Examples

:::tip Call for Examples
This section is pretty empty right now. It could need some more lovely examples.

PRs are welcome :)
:::

## Basic

This is the starter example from the "Getting Started" page, demonstrating the basic usage.

<SplitDisplay active="code">
  <Examples-Basic slot="example" />
  <<< @/docs/.vuepress/components/Examples/Basic.vue{8,17}
</SplitDisplay>

## Dynamic sidebar content

By selectively rendering different `<Portal>` components that all send to the same `<PortalTarget>` (but not at the same time), we can replace the `<PortalTarget>`'s content on demand, e.g. to put something into a sidebar area from the main component:

## More to follow

More examples are in the works and will follow soon!
