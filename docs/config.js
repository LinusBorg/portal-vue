/* global docuteIframe Docute */
new Docute({
  target: '#app',
  nav: [
    { title: 'PortalVue', link: '/' },

    {
      title: 'Documentation',
      link: '/guide',
    },
    {
      title: 'Github',
      link: 'https://github.com/linusborg/portal-vue',
    },
  ],
  sidebar: [
    {
      title: 'Guide',
      links: [
        { title: 'Usage Guide', link: '/guide' },
        { title: 'Examples', link: '/examples' },
      ],
    },
    {
      title: 'API Documentation',
      links: [
        { title: 'Portal', link: '/docs/portal' },
        { title: 'PortalTarget', link: '/docs/portal-target' },
        { title: 'Wormhole', link: '/docs/wormhole' },
      ],
    },
    {
      title: 'Other',
      links: [{ title: 'Caveats', link: '/docs/caveats' }],
    },
  ],
})
