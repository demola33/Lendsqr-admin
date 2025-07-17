<template>
  <IconComponent :title="title" class="app-icon" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import type { IconName } from '@/types';

interface AppIconProps {
  /**
   * Name of the icon to fetch. it corresponds to the name of
   * the component in the `@/components/icons` directory.
   */
  name: IconName;
  /**
   * Native hover text for the icon.
   */
  title?: string;
}
const {
  name,

  title,
} = withDefaults(defineProps<AppIconProps>(), {
  title: '',
});
const IconComponent = defineAsyncComponent(
  () => import(`../components/icons/${name}.vue`)
);
</script>
