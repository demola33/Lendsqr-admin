<script setup lang="ts">
import type { PropType } from 'vue'

type InfoItem = {
  title: string
  value: string
}
const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<InfoItem[]>,
    required: true,
  },
})
</script>

<template>
  <div class="app-info-section">
    <h3 class="app-info-section__header">{{ props.header }}</h3>
    <div class="app-info-section__items">
      <div v-for="(item, index) in props.items" :key="index" class="app-info-section__item">
        <span class="app-info-section__item-title">{{ item.title }}</span>
        <span class="app-info-section__item-value">{{ item.value }}</span>
      </div>
    </div>
    <hr class="app-info-section__divider" />
  </div>
</template>

<style scoped lang="scss">
.app-info-section {
  &__header {
    @include set-text-style('body-text-sm', 'medium');

    & {
      margin-bottom: rem-calc(30px);
      color: $primary-text-color;
      font-family: $font-family-base;
    }
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: rem-calc(64px);
    row-gap: rem-calc(30px);
  }

  &__item {
    display: flex;
    flex-direction: column;
    min-width: rem-calc(150px);
  }

  &__item-title {
    @include set-text-style('body-text-xxsm');
    text-transform: uppercase;
    color: $secondary-text-color;
    margin-bottom: rem-calc(4px);
  }

  &__item-value {
    @include set-text-style('body-text-sm', 'medium');
    color: $primary-text-color;
  }

  &__divider {
    border: none;
    height: rem-calc(1px);
    background-color: rgba($primary-text-color, 0.2);
    margin: rem-calc(24px) 0;
  }
}
</style>
