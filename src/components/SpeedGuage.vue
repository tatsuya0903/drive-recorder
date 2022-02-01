<template>
  <div class="speed-guage" v-bind:style="styleObject">
    <div ref="target" class="speed-guage__target" />
    <div class="speed-guage__border" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from '@vue/composition-api'

// eslint-disable-next-line no-undef
import GaugeChartOptions = google.visualization.GaugeChartOptions
// eslint-disable-next-line no-undef
import Gauge = google.visualization.Gauge

type State = {}
type Props = {
  speed: number
}
export default defineComponent({
  components: {},
  props: {
    speed: { type: Number, required: true },
  },
  setup(props: Props) {
    const state = reactive<State>({})

    const target = ref<HTMLDivElement>()

    let gauge: Gauge | null = null
    const initChart = () => {
      const element = target.value
      if (!element) {
        return
      }
      // eslint-disable-next-line no-undef
      gauge = new google.visualization.Gauge(element)
    }
    const drawChart = () => {
      const element = target.value
      if (!element) {
        return
      }

      // eslint-disable-next-line no-undef
      const data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        [`${props.speed.toFixed(0)}`, props.speed],
      ])

      const size = element.clientWidth
      const options: GaugeChartOptions = {
        width: size,
        height: size,
        min: -10,
        max: 90,
        yellowFrom: 60,
        yellowTo: 70,
        redFrom: 70,
        redTo: 80,
        minorTicks: 5,
        majorTicks: [-10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((v) => `${v}`),
      }
      gauge?.draw(data, options)
    }

    onMounted(() => {
      // eslint-disable-next-line no-undef
      google.charts.load('current', { packages: ['gauge'] })

      // eslint-disable-next-line no-undef
      google.charts.setOnLoadCallback(() => {
        initChart()
        drawChart()
      })
    })

    watch(
      () => props.speed,
      () => {
        drawChart()
      },
    )

    return {
      ...toRefs(state),
      target,
    }
  },
})
</script>

<style lang="scss" scoped>
.speed-guage {
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  &:before {
    content: '';
    display: block;
    padding-top: 64%; /* 高さを幅の64%に固定 */
  }

  .speed-guage__target {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
  }
  .speed-guage__border {
    position: absolute;
    left: 7%;
    right: 7%;
    bottom: 0px;
    border-bottom: 1px solid gray;
  }
}
</style>
