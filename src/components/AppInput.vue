<template>
  <BFormGroup :id="id" floating>
    <BFormInput
      :id="id"
      v-model="model"
      :placeholder="placeholder"
      :type="computedType"
      :state="state"
      @blur="handleBlur"
      :disabled="disabled"
      :required="required"
      :trim="trim"
      :name="name"
      :class="inputClass"
    />
    <template v-if="type === 'password'">
      <span
        class="input-suffix"
        @click="togglePasswordVisibility"
        style="
          cursor: pointer;
          user-select: none;
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
        "
      >
        {{ isPasswordVisible ? 'Hide' : 'Show' }}
      </span>
    </template>
    <label :for="id" class="form-label d-block">
      {{ label }}<span v-if="required" class="text-danger">*</span>
    </label>
    <small v-if="hint" class="form-text text-muted">{{ hint }}</small>
  </BFormGroup>
</template>

<script setup lang="ts">
import type { AppInputProps } from '@/types'
import { BFormGroup, BFormInput } from 'bootstrap-vue-next'
import { ref, computed } from 'vue'

const model = defineModel<string | number>()

const {
  id,
  label,
  type = 'text',
  placeholder = '',
  state = null,
  disabled = false,
  required = false,
  trim = true,
  name = '',
  hint = '',
  inputClass = '',
} = defineProps<AppInputProps>()

const emit = defineEmits<{
  (e: 'blur', event: Event): void
}>()

const handleBlur = (event: Event) => {
  emit('blur', event)
}

const isPasswordVisible = ref(false)

const computedType = computed(() => {
  if (type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password'
  }
  return type
})

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<style lang="scss" scoped>
.form-label {
  font-size: rem-calc(14px);
  color: rgba($color: $secondary-text-color, $alpha: 0.6);
}

.form-control {
  border: rem-calc(2px) solid rgba($color: $secondary-text-color, $alpha: 15%);
  min-height: rem-calc(50px);
  height: rem-calc(50px);
}

.input-suffix {
  font-size: rem-calc(12px);
  color: $primary-color;
  font-weight: 600;
}
</style>
