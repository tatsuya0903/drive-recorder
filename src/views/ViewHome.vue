<template>
  <div>
    <template v-if="acc === null">
      <div>Acceleration is NULL</div>
    </template>
    <template v-else>
      <div style="display: flex; justify-content: center">
        <AccMeter v-bind:acc="acc" />
      </div>
    </template>
    <div
      style="
        padding: 8px;
        position: fixed;
        right: 16px;
        top: 64px;
        font-size: 20px;
        color: red;
        text-align: right;
      "
    >
      <template v-if="geo === null">
        <div>Geo is NULL</div>
      </template>
      <template v-else>
        <div>速度：{{ geo.speedMs.toFixed(1) }}(m/s)</div>
        <div>速度：{{ geo.speedKmh.toFixed(1) }}(km/h)</div>
        <div>高度：{{ geo.altitudeAccuracy.toFixed(1) }}(m)</div>
        <div>精度：{{ geo.accuracy.toFixed(1) }}(m)</div>
      </template>
    </div>

    <div style="width: 200px; position: absolute; left: 0px; top: 0px">
      <SpeedGuage v-bind:speed="speed" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from '@vue/composition-api'
import { useDeviceMotion } from '@/composables/useDeviceMotion'
import AccMeter from '@/components/AccMeter.vue'
import { useGeoLocation } from '@/composables/useGeoLocation'
import SpeedGuage from '@/components/SpeedGuage.vue'

type State = {}
export default defineComponent({
  components: { SpeedGuage, AccMeter },
  setup() {
    const state = reactive<State>({ debugSpeed: null })
    const { acc } = useDeviceMotion()
    const { geo } = useGeoLocation()

    const speed = computed(() => {
      return geo.value?.speedKmh ?? 0
    })

    return {
      ...toRefs(state),
      acc,
      geo,
      speed,
    }
  },
})
</script>

<style lang="scss" scoped></style>
