const { defineConfig } = require('vitepress')
const { version } = require('../../package.json')

module.exports = defineConfig({
  title: 'Portal-Vue',
  description:
    'A set of Vue 3 components to move your content anywhere in the DOM.',

  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/linusborg/portal-vue',
      },
    ],
    siteTitle: 'Portal-Vue',
    repo: 'linusborg/portal-vue',
    repoLabel: 'GitHub',

    outline: 'deep',
    outlineTitle: 'On this page',
    editLink: {
      pattern: 'https://github.com/linusborg/portal-vue/edit/docs/:path',
      text: 'Edit this page on GitHub',
    },
    lastUpdatedText: 'Last Updated',
    nav: [
      {
        text: 'Guide',
        link: '/guide/getting-started',
        activeMatch: '^/guide/',
      },
      {
        text: 'API',
        link: '/api/portal',
        activeMatch: '^/api/',
      },
      {
        text: 'Docs for v2',
        link: 'https://v2.portal-vue.linusb.org',
      },
    ],
    sidebar: {
      '/guide/': [{ text: 'Guide', items: getGuideSidebar() }],
      '/api/': [{ text: 'API', items: getApiSidebar() }],
    },
  },
  vite: {
    define: {
      __PORTAL_VUE_VERSION__: JSON.stringify(version),
    },
  },
})

function getGuideSidebar() {
  return [
    { text: 'Installation', link: '/guide/installation' },
    { text: 'Getting Started', link: '/guide/getting-started' },
    { text: 'Advanced Usage', link: '/guide/advanced' },
    { text: 'Caveats', link: '/guide/caveats' },
    { text: 'Migrating from 2.0', link: '/guide/migration' },
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
