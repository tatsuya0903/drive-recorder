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

    <div style="position: fixed; left: 0px; bottom: 0px; width: 100%; max-width: 50vw">
      <LineChart v-bind:value="lineChartValue" />
    </div>
    <div style="position: fixed; right: 0px; bottom: 8px; width: 100%; max-width: 50vw">
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
import LineChart, { Value } from '@/components/LineChart.vue'

type State = {}
export default defineComponent({
  components: { LineChart, SpeedGuage, AccMeter },
  setup() {
    const state = reactive<State>({ debugSpeed: null })
    const { acc } = useDeviceMotion()
    const { geo } = useGeoLocation()

    const speed = computed(() => {
      return geo.value?.speedKmh ?? 0
    })

    const lineChartValue = computed<Value | null>(() => {
      if (acc.value === null && geo.value === null) {
        return null
      }
      return {
        time: new Date().getTime(),
        accX: acc.value?.x ?? 0,
        accY: acc.value?.y ?? 0,
        accZ: acc.value?.z ?? 0,
        speed: speed.value,
      }
    })

    return {
      ...toRefs(state),
      acc,
      geo,
      speed,
      lineChartValue,
    }
  },
})
</script>

<style lang="scss" scoped></style>
