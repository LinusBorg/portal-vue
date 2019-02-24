const webpack = require('webpack')
const { version } = require('../../package.json')
module.exports = {
  base: process.env.PORTAL_VUE_DOCS_PATH || '/portal-vue/',
  title: 'Portal-Vue',
  description:
    "A Vue component to render your component's template anywhere in the DOM.",
  markdown: {
    lineNumbers: true,
  },
  chainWebpack: config => {
    config.plugin('version-env').use(webpack.EnvironmentPlugin, [
      {
        VERSION: version,
      },
    ])
  },
  themeConfig: {
    repo: 'linusborg/portal-vue',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    docsBranch: 'next',
    editLinks: true,
    editLinkText: 'Help improve these docs!',
    sidebarDepth: 2,
    nav: [
      { text: 'Installation', link: '/guide/installation' },
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: "What's new in 2.0", link: '/guide/migration' },
          { text: 'Advanced Usage', link: '/guide/advanced' },
          { text: 'Caveats', link: '/guide/caveats' },
        ],
      },
      {
        text: 'API',
        items: [
          {
            text: 'Components',
            items: [
              { text: 'Portal', link: '/api/portal' },
              { text: 'PortalTarget', link: '/api/portal-target' },
              {
                text: 'MountingPortal',
                link: '/api/mounting-portal',
              },
            ],
          },
          {
            text: 'Other Objects',
            items: [{ text: 'Wormhole', link: '/api/wormhole' }],
          },
        ],
      },
      {
        text: 'Examples',
        link: '/examples',
      },
      {
        text: 'Old docs (v1)',
        link: genOldDocsLink(),
      },
    ],
  },
}

function genOldDocsLink() {
  return this.process.env.NODE_ENV === 'production'
    ? 'https://linusborg.github.io/portal-vue/index.html#/guide'
    : 'http://localhost:8080/portal-vue/index.html#/guide'
}
