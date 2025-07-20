<template>
  <BFormGroup :floating="floatingLabel">
    <label :for="id" class="form-label d-block">
      {{ label }}<span v-if="required" class="text-danger">*</span>
    </label>
    <BFormSelect
      :id="id"
      v-model="selectedValue"
      :options="formattedOptions"
      :state="state"
      @blur="handleBlur"
      :disabled="disabled"
      :required="required"
      :name="name"
      autocomplete="on"
      class="app-dropdown__field"
    />

    <small v-if="hint" class="form-text text-muted semi-bld">{{ hint }}</small>
  </BFormGroup>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { BFormGroup, BFormSelect } from 'bootstrap-vue-next'
import type { AppDropdownProps } from '@/types'

const props = withDefaults(defineProps<AppDropdownProps>(), {
  modelValue: '',
  placeholder: 'Select an option',
  state: null,
  disabled: false,
  required: false,
  name: '',
  hint: '',
  floatingLabel: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur', event: Event): void
}>()

const selectedValue = ref(props.modelValue)

// Format options for BFormSelect
const formattedOptions = computed(() => {
  const options = props.options.map((option) => ({
    text: option.label,
    value: option.value,
    disabled: option.disabled,
  }))

  if (props.placeholder) {
    options.unshift({
      text: props.placeholder,
      value: '',
      disabled: true,
    })
  }

  return options
})

watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue
  },
)

watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const handleBlur = (event: Event) => {
  emit('blur', event)
}
</script>

<style lang="scss" scoped>
.app-dropdown {
  &__field {
    width: 100%;
    height: rem-calc(40px);
    border-radius: rem-calc(8px);
    border: rem-calc(2px) solid rgba($color: $primary-text-color, $alpha: 20%);
    background-color: $white;
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;

    &:focus {
      border-color: $primary-color;
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba($color: $primary-color, $alpha: 0.25);
    }

    &:disabled {
      background-color: $gray-shade-50;
      opacity: 1;
    }

    &::placeholder {
      color: rgba($color: red, $alpha: 0.6);
    }
  }
}

.form-label {
  font-size: rem-calc(14px);
  font-weight: 500;
  color: $secondary-text-color;
}

.form-select {
  color: rgba($color: $secondary-text-color, $alpha: 0.7);
  font-size: rem-calc(14px);
  font-weight: 400;
}
</style>
