<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      {
        'btn--fit': fit,
        'btn--balanced': fit === 'balanced',
      },
    ]"
    :type="type"
    :disabled="disabled"
    @click="handleButtonClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

interface AppButtonProps {
  /**
   * The given variant of the button.
   * the possible values are "primary", "secondary", "tertiary", "quaternary", "quinary", "senary", "septenary" and "danger".
   *
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary'

  /**
   * The size type of the button. The possible values are 'regular' and 'small'.
   *
   * @default 'regular'
   */
  size?: 'regular' | 'small'
  /**
   * Whether or not the button should be inactive.
   * @default false
   */
  disabled?: boolean
  /**
   * Whether the button should fit its content.
   * @default false
   */
  fit?: boolean | 'balanced'

  type?: 'button' | 'submit' | 'reset'
}

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const props = withDefaults(defineProps<AppButtonProps>(), {
  variant: 'primary',
  disabled: false,
  size: 'regular',
  fit: false,
  type: undefined,
})

const { variant, disabled, size, fit, type } = toRefs(props)
const handleButtonClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style lang="scss" scoped></style>
