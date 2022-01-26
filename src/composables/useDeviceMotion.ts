import { onBeforeMount, onBeforeUnmount, ref } from '@vue/composition-api'

export const useDeviceMotion = () => {
  const x = ref<number | null>(null)
  const y = ref<number | null>(null)
  const z = ref<number | null>(null)

  onBeforeMount(() => {
    window.addEventListener('devicemotion', handle)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('devicemotion', handle)
  })
  const handle = (e: DeviceMotionEvent) => {
    x.value = e.accelerationIncludingGravity?.x ?? null
    y.value = e.accelerationIncludingGravity?.y ?? null
    z.value = e.accelerationIncludingGravity?.z ?? null
  }
  return { x, y, z }
}
