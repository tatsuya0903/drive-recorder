import type { defineComponent } from '@vue/composition-api'
declare module '*.vue' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: defineComponent<{}, {}, unknown>
  export default component
}

import google from 'google.visualization'
declare global {
  interface Window {
    google: google
  }
}
