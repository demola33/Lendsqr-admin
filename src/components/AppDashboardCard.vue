<script setup lang="ts">
import { computed } from 'vue'
import type { IconName } from '@/types'
import AppIcon from './AppIcon.vue'

const props = defineProps<{
  icon: IconName
  title: string
  value: string
  color: string
}>()

const iconBackground = computed(() => {
  const hex = props.color.replace(/^#/, '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, 0.2)`
})
</script>

<template>
  <div class="app-dashboard-card">
    <div class="app-dashboard-card__icon" :style="{ backgroundColor: iconBackground, color }">
      <AppIcon :name="icon" />
    </div>
    <p class="app-dashboard-card__title">{{ title.toUpperCase() }}</p>
    <h6 class="app-dashboard-card__value">{{ value }}</h6>
  </div>
</template>

<style scoped lang="scss">
.app-dashboard-card {
  @include flex-centered;

  & {
    width: rem-calc(240px);
    height: rem-calc(160px);
    gap: rem-calc(16px);
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    border-radius: rem-calc(4px);
    padding: rem-calc(24px);
    border: rem-calc(1px) solid rgba($color: $primary-text-color, $alpha: 0.06);
    box-shadow: rem-calc(3px 5px 20px 0) rgba(0, 0, 0, 0.04);
    transition: scale $default-transition-speed;
  }

  &:hover {
    scale: 1.02;
  }

  &__icon {
    @include flex-centered;

    & {
      width: rem-calc(40px);
      height: rem-calc(40px);
      border-radius: 50%;
      padding: rem-calc(10px);
    }
  }

  &__title {
    @include set-text-style('body-text-xsm', 'medium');
  }
}
</style>
