<template>
  <div class="speed-guage">
    <div ref="target" class="speed-guage__target" />
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
      const width = element.clientWidth
      const height = element.clientHeight
      // eslint-disable-next-line no-undef
      const data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['km/h', props.speed],
      ])

      const options: GaugeChartOptions = {
        width: width,
        height: height,
        min: 0,
        max: 80,
        yellowFrom: 60,
        yellowTo: 70,
        redFrom: 70,
        redTo: 80,
        minorTicks: 5,
        majorTicks: [0, 10, 20, 30, 40, 50, 60, 70, 80].map((v) => `${v}`),
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
        console.log(`watch >> ${props.speed}`)
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
  width: 100%;
  padding-top: 100%;
  .speed-guage__target {
    position: absolute;
    left: 0px;
    top: 0px;
    left: 0px;
    bottom: 0px;
  }
}
</style>
