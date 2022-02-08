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
      chart = new google.charts.Line(element)
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
        width: 500,
        height: 200,
        series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: { axis: 'Speed' },
          1: { axis: 'Acc' },
          2: { axis: 'Acc' },
          3: { axis: 'Acc' },
        },
        axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
            Speed: { label: '速度' },
            Acc: { label: '加速度' },
          },
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
