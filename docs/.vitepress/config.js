
module.exports = {
  title: 'Portal-Vue',
  description:
    "A set of Vue 3 components to move your content anywhere in the DOM.",
  themeConfig: {
    repo: 'linusborg/portal-vue',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    docsBranch: 'next',
    editLinks: true,
    editLinkText: 'Help improve these docs!',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Installation', link: '/guide/installation' },
      {
        text: 'Guide',
        link: '/guide/getting-started',
        activeMatch: '^/guide/'
      },
      {
        text: 'API',
        link: '/api/portal',
        activeMatch: '^/api/'
      },
      {
        text: 'Docs for v2',
        link: 'https://v2.portal-vue.linusb.org',
      },
    ],
    sidebar: {
      '/guide/': getGuideSidebar(),
      '/api/': getApiSidebar(),
    },
  },
}

function getGuideSidebar() {
  return [
    { text: 'Getting Started', link: '/guide/getting-started' },
    { text: 'Migrating from 2.0', link: '/guide/migration' },
    { text: 'Advanced Usage', link: '/guide/advanced' },
    { text: 'Caveats', link: '/guide/caveats' },
  ]
}
function getApiSidebar() {
  return [
    { text: 'Portal', link: '/api/portal' },
    { text: 'PortalTarget', link: '/api/portal-target' },
    // {
    //   text: 'createPortalTarget',
    //   link: '/api/mounting-portal',
    // },
  ]
}
