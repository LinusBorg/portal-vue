/* global self */
self.$config = {
  landing: true,
  home: 'getting-started.md',
  nav: [
    { title: 'PortalVue', path: '/' },
    { title: 'Getting Started', path: '/getting-started' },
    { title: 'Documentation', type: 'dropdown', items: [
      { title: 'Installation Instructions', type: 'label' },
      { title: 'Installation', path: '/docs/installation' },
      { type: 'sep' },
      { title: 'Components', type: 'label' },
      { title: 'Portal', path: '/docs/portal' },
      { title: 'PortalTarget', path: '/docs/portal-target' },
    ],
    },
    { title: 'Examples', path: '/examples' },
    { title: 'caveats', path: '/caveats' },
  ],
  repo: 'linusborg/portal-vue',
  twitter: 'Linus_Borg',
}
