// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts', // 必須パラメータ
      title: process.env.VUE_APP_TITLE,
    },
  },

  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: process.env.NODE_ENV !== 'production',

  transpileDependencies: ['vuetify'],

  // PWA
  configureWebpack: (config) => {
    config.plugins.push(
      new GenerateSW({
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp('^https://www.gstatic.com/charts/'),
            handler: 'cacheFirst',
            options: {
              cacheName: 'google-charts',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      }),
    )
  },
}
