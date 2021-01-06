module.exports = [
  {
    path: 'dist/portal-vue.esm.js',
    name: 'Total',
    limit: '3 KB',
  },
  {
    path: 'dist/portal-vue.esm.js',
    name: 'Portal',
    import: '{ Portal }',
    limit: '2 KB',
  },
  {
    path: 'dist/portal-vue.esm.js',
    name: 'PortalTarget',
    import: '{ PortalTarget }',
    limit: '2 KB',
  },
  {
    path: 'dist/portal-vue.esm.js',
    name: 'MountingPortal',
    import: '{ MountingPortal }',
    limit: '2.5 KB',
  },
  {
    path: 'dist/portal-vue.esm.js',
    name: 'Wormhole',
    import: '{ Wormhole }',
    limit: '2 KB',
  },
]
