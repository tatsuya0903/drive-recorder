<template>
  <div class="line-chart">
    <div ref="target" class="line-chart__target" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from '@vue/composition-api'
import { Acc } from '@/models/acc'

declare let google: any

export type Value = {
  time: number
  accX: number
  accY: number
  accZ: number
  speed: number
}
type State = {}
type Props = {
  value: Value | null
}
export default defineComponent({
  components: {},
  props: {
    value: { type: null, default: null },
  },
  setup(props: Props) {
    const state = reactive<State>({})

    const values: Value[] = []
    const addValue = () => {
      if (props.value === null) {
        return
      }
      const lastTime = values.length > 0 ? values[0].time : null
      if (props.value.time === lastTime) {
        return
      }
      console.warn(`addValue >> ${values.length}, ${values.map((v) => v.time).join(', ')}`)
      const value = Object.assign({}, props.value)
      value.speed = Math.abs(value.speed)
      value.accX = Math.abs(value.accX / Acc.gravity)
      value.accY = Math.abs(value.accY / Acc.gravity)
      value.accZ = Math.abs(value.accZ / Acc.gravity)
      values.unshift(value)
      values.splice(100)
    }

    const target = ref<HTMLDivElement>()

    let chart: any | null = null
    const initChart = () => {
      const element = target.value
      if (!element) {
        return
      }

      // eslint-disable-next-line no-undef
      chart = new google.visualization.LineChart(element)
    }
    const drawChart = (values: Value[]) => {
      const data = new google.visualization.DataTable()
      data.addColumn('number')
      data.addColumn('number', '速度')
      data.addColumn('number', '加速度(X)')
      data.addColumn('number', '加速度(Y)')
      data.addColumn('number', '加速度(Z)')

      const now = new Date().getTime()
      for (const value of values) {
        const time = Math.abs(value.time - now) / 1000
        if (time <= 10) {
          data.addRow([time, value.speed, value.accX, value.accY, value.accZ])
        }
      }
      const options = {
        chart: {
          title: '',
        },
        width: '60vh',
        height: '60vh',
        series: {
          0: { targetAxisIndex: 0, color: 'red', lineWidth: 1 },
          1: { targetAxisIndex: 1, color: 'blue', lineWidth: 1 },
          2: { targetAxisIndex: 1, color: 'orange', lineWidth: 1 },
          3: { targetAxisIndex: 1, color: 'green', lineWidth: 1 },
        },
        vAxes: {
          0: { title: '速度(km/h)', minValue: 0, maxValue: 60 },
          1: { title: '加速度(G)', minValue: 0, maxValue: 0.3 },
        },
        hAxis: {
          ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      }
      chart.draw(data, options)
    }

    onMounted(() => {
      // eslint-disable-next-line no-undef
      google.charts.load('current', { packages: ['line', 'corechart'] })
      // eslint-disable-next-line no-undef
      google.charts.setOnLoadCallback(() => {
        initChart()
        drawChart([])
      })
    })

    let handle: number | undefined = undefined
    onBeforeMount(() => {
      handle = setInterval(() => {
        addValue()
        drawChart(values)
      }, 100)
    })
    onBeforeUnmount(() => {
      clearInterval(handle)
    })
    return {
      ...toRefs(state),
      target,
    }
  },
})
</script>

<style lang="scss" scoped></style>
