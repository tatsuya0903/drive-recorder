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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { useDeviceMotion } from '@/composables/useDeviceMotion'
import AccMeter from '@/components/AccMeter.vue'

type State = {}
export default defineComponent({
  components: { AccMeter },
  setup() {
    const state = reactive<State>({})
    const { acc } = useDeviceMotion()

    return {
      ...toRefs(state),
      acc,
    }
  },
})
</script>

<style lang="scss" scoped></style>
