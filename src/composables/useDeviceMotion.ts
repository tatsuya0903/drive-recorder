import { onBeforeMount, onBeforeUnmount, ref } from '@vue/composition-api'
import { Acc } from '@/models/acc'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDeviceMotion = () => {
  const acc = ref<Acc | null>(null)

  onBeforeMount(() => {
    window.addEventListener('devicemotion', handle)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('devicemotion', handle)
  })
  const handle = (e: DeviceMotionEvent) => {
    // acc.value = Acc.create(e.acceleration)
    acc.value = Acc.create(e.accelerationIncludingGravity)
  }
  return { acc }
}
