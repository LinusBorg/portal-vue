/* global docuteIframe docute */
docute.init({
  landing: true,
  home: 'guide.md',
  nav: [
    { title: 'PortalVue', path: '/' },
    { title: 'Usage Guide', path: '/guide' },
    { title: 'Examples', path: '/examples' },
    {
      title: 'Documentation',
      type: 'dropdown',
      items: [
        { title: 'Current: v1.5.0', path: '#' },
        { title: 'Installation Instructions', type: 'label' },
        { title: 'Installation', path: '/docs/installation' },
        { type: 'sep' },
        { title: 'Components', type: 'label' },
        { title: 'Portal', path: '/docs/portal' },
        { title: 'PortalTarget', path: '/docs/portal-target' },
        { title: 'Special Objects', type: 'label' },
        { title: 'Wormhole', path: '/docs/wormhole' },
      ],
    },
    { title: 'Caveats', path: '/docs/caveats' },
  ],
  repo: 'linusborg/portal-vue',
  twitter: 'Linus_Borg',
  plugins: [docuteIframe()],
})
