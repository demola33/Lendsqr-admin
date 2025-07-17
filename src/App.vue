<script setup lang="ts">
import { RouterView } from 'vue-router'
import usePageLayout from './composables/usePageLayout'

const { LayoutComponent } = usePageLayout()
</script>

<template>
  <component :is="LayoutComponent">
    <RouterView />
  </component>
</template>

<style scoped></style>
