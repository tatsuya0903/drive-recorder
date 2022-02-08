<template>
  <div class="acc-meter">
    <canvas ref="canvas" class="acc-meter__canvas" />
    <div>
      <v-btn icon v-on:click="clickDirection">
        <v-icon>mdi-crop-rotate</v-icon>
      </v-btn>
      {{ direction }}
    </div>
    <div style="position: absolute; left: 8px; bottom: 8px">
      <div>X: {{ acc.x.toFixed(1) }}</div>
      <div>Y: {{ acc.y.toFixed(1) }}</div>
      <div>Z: {{ acc.z.toFixed(1) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from '@vue/composition-api'
import { Acc } from '@/models/acc'

export const Directions = {
  X_PLUS: 'X_PLUS',
  X_MINUS: 'X_MINUS',
  Y_PLUS: 'Y_PLUS',
  Y_MINUS: 'Y_MINUS',
} as const
export type Direction = typeof Directions[keyof typeof Directions]

const nextDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Directions.X_PLUS:
      return Directions.X_MINUS
    case Directions.X_MINUS:
      return Directions.Y_PLUS
    case Directions.Y_PLUS:
      return Directions.Y_MINUS
    case Directions.Y_MINUS:
      return Directions.X_PLUS
  }
}

type State = {
  direction: Direction
}
type Props = {
  acc: Acc
}
export default defineComponent({
  components: {},
  props: {
    acc: { type: Acc, required: true },
  },
  setup(props: Props) {
    const state = reactive<State>({
      direction: Directions.X_MINUS,
    })

    const canvas = ref<HTMLCanvasElement>()
    const draw = () => {
      const element = canvas.value
      if (element) {
        const size = Math.min(element.clientWidth, element.clientHeight) / 2
        const width = size * 2
        const height = size * 2

        const radius = size * 0.9

        element.setAttribute('width', `${width}`)
        element.setAttribute('height', `${height}`)
        const ctx = element.getContext('2d')
        if (ctx) {
          ctx.beginPath()
          ctx.clearRect(0, 0, width, height)
          // ctx.arc(100, 100, 75, 0, Math.PI * 2)
          // ctx.fill()

          const xMin = 0
          const xMax = size * 2
          const yMin = 0
          const yMax = size * 2
          const xCenter = (xMax - xMin) / 2
          const yCenter = (yMax - yMin) / 2

          ctx.beginPath()
          ctx.strokeRect(0, 0, size, size)
          ctx.strokeRect(0, yCenter, size, size)
          ctx.strokeRect(xCenter, 0, size, size)
          ctx.strokeRect(xCenter, yCenter, size, size)
          ctx.stroke()

          const unit = radius / 5
          for (let r = unit; r <= radius; r += unit) {
            ctx.beginPath()
            ctx.arc(xCenter, yCenter, r, 0, Math.PI * 2)
            ctx.strokeStyle = 'black'
            ctx.stroke()
          }

          //
          const gravity = 9.8
          const rate = (1 / gravity) * radius
          const x = xCenter + calcX(props.acc, state.direction) * rate
          const y = yCenter + calcY(props.acc) * rate
          ctx.beginPath()
          ctx.arc(x, y, 10, 0, Math.PI * 2)
          ctx.fillStyle = 'darkblue'
          ctx.fill()
          ctx.closePath()
        }
      }
    }

    const calcX = (acc: Acc, direction: Direction): number => {
      switch (direction) {
        case Directions.X_PLUS:
          return acc.x
        case Directions.X_MINUS:
          return acc.x * -1
        case Directions.Y_PLUS:
          return acc.y
        case Directions.Y_MINUS:
          return acc.y * -1
      }
    }
    const calcY = (acc: Acc): number => {
      return -1 * acc.z
    }

    watch(
      () => props.acc,
      () => {
        draw()
      },
    )

    onMounted(() => {
      draw()
    })

    const clickDirection = async () => {
      state.direction = nextDirection(state.direction)
    }

    return {
      ...toRefs(state),
      canvas,
      clickDirection,
    }
  },
})
</script>

<style lang="scss" scoped>
.acc-meter {
  position: relative;
  width: min(60vw, 60vh);
  height: min(60vw, 60vh);

  .acc-meter__canvas {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
