/* global docuteIframe docute */
docute.init({
  landing: true,
  home: 'getting-started.md',
  nav: [
    { title: 'PortalVue', path: '/' },
    { title: 'Getting Started', path: '/getting-started' },
    { title: 'Examples', path: '/examples' },
    { title: 'Documentation', type: 'dropdown', items: [
      { title: 'Installation Instructions', type: 'label' },
      { title: 'Installation', path: '/docs/installation' },
      { type: 'sep' },
      { title: 'Components', type: 'label' },
      { title: 'Portal', path: '/docs/portal' },
      { title: 'PortalTarget', path: '/docs/portal-target' },
      { title: 'Special Objects' },
      { title: 'Wormhole', path: '/doc/wormhole' },
    ],
    },
    { title: 'Caveats', path: '/docs/caveats' },
  ],
  repo: 'linusborg/portal-vue',
  twitter: 'Linus_Borg',
  plugins: [
    docuteIframe(),
  ],
})
