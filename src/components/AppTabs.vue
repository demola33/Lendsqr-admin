<script setup lang="ts">
import { TabsList, TabsRoot } from 'reka-ui'
</script>

<template>
  <TabsRoot class="app-tabs" default-value="tab1">
    <slot name="header" />
    <TabsList class="app-tabs__list" aria-label="Manage your account">
      <slot name="tabs" />
    </TabsList>
    <slot name="content" />
  </TabsRoot>
</template>

<style lang="scss">
.app-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: rem-calc(3px 5px 20px 0) rgba(0, 0, 0, 0.04);
  border-radius: rem-calc(4px);
  border: rem-calc(1px) solid rgba($color: $primary-text-color, $alpha: 0.06);
  position: relative;

  &__list {
    position: relative;
    flex-shrink: 0;
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    border-bottom: rem-calc(1px) solid rgba($color: $primary-text-color, $alpha: 0.06);
  }

  &__content {
    flex-grow: 1;
    padding: rem-calc(20px);
    background-color: $white;
    border-bottom-left-radius: rem-calc(6px);
    border-bottom-right-radius: rem-calc(6px);
    outline: none;

    &:focus {
      box-shadow: 0 0 0 rem-calc(2px) #000;
    }
  }

  &__description {
    margin-bottom: rem-calc(20px);
    margin-top: 0;
    color: rgba(0, 0, 0, 0.6);
    font-size: rem-calc(14px);
    line-height: 1.5;
  }
}
</style>
