import { onBeforeMount, onBeforeUnmount, ref } from '@vue/composition-api'
import { Geo } from '@/models/geo'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGeoLocation = () => {
  const geo = ref<Geo | null>(null)

  let watchId: number | null = null
  onBeforeMount(() => {
    const options: PositionOptions = {
      enableHighAccuracy: true,
    }
    watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, options)
  })
  onBeforeUnmount(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
    }
  })

  const successCallback: PositionCallback = (position: GeolocationPosition) => {
    geo.value = Geo.create(position)
  }
  const errorCallback: PositionErrorCallback = (positionError: GeolocationPositionError) => {
    // TODO: エラー処理を実装
  }

  return { geo }
}
