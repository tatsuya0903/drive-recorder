import { onBeforeMount, onBeforeUnmount, ref } from '@vue/composition-api'
import { Acc } from '@/models/acc'
import { LowPathFilter } from '@/modules/lowPathFilter'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDeviceMotion = () => {
  const acc = ref<Acc | null>(null)

  onBeforeMount(() => {
    window.addEventListener('devicemotion', handle)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('devicemotion', handle)
  })

  const lowPathFilter = new LowPathFilter()
  const handle = (e: DeviceMotionEvent) => {
    // acc.value = Acc.create(e.acceleration)

    const value = Acc.create(e.accelerationIncludingGravity)
    if (value !== null) {
      lowPathFilter.add(value)
      acc.value = lowPathFilter.renew()
    }
  }

  return { acc }
}
