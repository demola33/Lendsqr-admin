<template>
  <div class="search-input-wrapper">
    <input
      :id="id"
      :placeholder="placeholder"
      v-model="inputValue"
      @keyup.enter="emitSearch"
      class="search-input"
      type="text"
    />
    <button class="search-btn" @click="emitSearch" type="button">
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="2" />
        <line
          x1="14.2929"
          y1="14.7071"
          x2="18"
          y2="18.4142"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  id: string
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}>()

const inputValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val
  },
)

watch(inputValue, (val) => {
  emit('update:modelValue', val)
})

function emitSearch() {
  emit('search', inputValue.value)
}
</script>

<style scoped lang="scss">
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-input {
  @include set-text-style('body-text-xsm');

  & {
    width: 100%;
    padding-inline: rem-calc(20px) rem-calc(56px);
    height: rem-calc(40px);
    border: 1px solid rgba($color: $primary-text-color, $alpha: 0.2);
    border-radius: rem-calc(8px);
    outline: none;
  }

  &::placeholder {
    color: rgba($color: $secondary-text-color, $alpha: 0.6);
  }
}

.search-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  width: rem-calc(56px);
  border: none;
  background: $primary-color;
  display: flex;
  align-items: center;
  border-top-right-radius: rem-calc(8px);
  border-bottom-right-radius: rem-calc(8px);
  justify-content: center;
  cursor: pointer;
  color: $white;
}

.search-btn:active {
  color: #333;
}
</style>
