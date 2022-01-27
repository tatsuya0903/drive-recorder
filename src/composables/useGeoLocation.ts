import { onBeforeMount, onBeforeUnmount, ref } from '@vue/composition-api'
import { Geo } from '@/models/geo'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGeoLocation = () => {
  const geo = ref<Geo | null>(null)

  let watchId: number | null = null
  onBeforeMount(() => {
    watchId = navigator.geolocation.watchPosition(handle)
  })
  onBeforeUnmount(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
    }
  })

  const handle: PositionCallback = (position: GeolocationPosition) => {
    geo.value = Geo.create(position)
  }

  return { geo }
}
