<template>
  <div>
    <div>ViewHome.vue</div>
    <div>x: {{ x === null ? 'NULL' : x.toFixed(1) }}</div>
    <div>y: {{ y === null ? 'NULL' : y.toFixed(1) }}</div>
    <div>z: {{ z === null ? 'NULL' : z.toFixed(1) }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { useDeviceMotion } from '@/composables/useDeviceMotion'

type State = {}
export default defineComponent({
  components: {},
  setup() {
    const state = reactive<State>({})
    const { x, y, z } = useDeviceMotion()

    return {
      ...toRefs(state),
      x,
      y,
      z,
    }
  },
})
</script>

<style lang="scss" scoped></style>
