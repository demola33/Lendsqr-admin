<template>
  <li :class="navLinkItemClasses" @click="onClick">
    <component :is="containerComponent" class="nav-link-item__nav-link" :to="to">
      <div class="nav-link-item__nav-icon-container">
        <AppIcon class="nav-link-item__nav-link-icon" :name="icon" />
      </div>
      <span :title="text" class="nav-link-item__nav-link-text">
        {{ text }}
      </span>
      <slot />
    </component>
  </li>
</template>

<script setup lang="ts">
import type { NavLink } from '@/types'
import AppIcon from '@/components/AppIcon.vue'
import { computed, resolveDynamicComponent, toRefs } from 'vue'
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()

const props = defineProps<NavLink>()
const link = toRefs(props)
const { text, icon, to, onClick } = link
const containerComponent = computed(() =>
  link.to.value ? resolveDynamicComponent('RouterLink') : 'div',
)

const path = computed(() => currentRoute.value.path)
const navLinkItemClasses = computed(() => [
  'nav-link-item',
  {
    'nav-link-item--selected': link.to.value && path.value.startsWith(link.to.value),
    'nav-link-item--disabled': link.disabled.value,
  },
])
</script>

<style scoped lang="scss">
.nav-link-item {
  position: relative;
  display: flex;
  align-items: center;
  color: rgba($color: $primary-text-color, $alpha: 0.6);

  &--selected {
    color: $primary-text-color;
  }

  &--disabled {
    color: $gray-shade-500;
    cursor: not-allowed;
  }

  &--inactive {
    color: $gray-shade-400;
  }

  &__nav-link {
    @include flex-centered;
    @include set-text-style('body-text-sm');

    & {
      flex-direction: column;
      color: inherit;
      text-decoration: none;
    }
  }

  &__nav-link-icon {
    width: rem-calc(30px);
    height: rem-calc(20px);
    transition-duration: $default-transition-speed;

    @include media('>medium') {
      width: rem-calc(20px);
      height: rem-calc(20px);
    }
  }

  &__nav-link-text {
    transition-duration: $default-transition-speed;
  }
}

// DESKTOP AND TABLET VIEW
.nav-link-item {
  @include media('>medium') {
    width: 100%;

    &::before {
      position: absolute;
      left: 0;
      display: block;
      content: '';
      width: 0;
      transition-duration: $default-transition-speed;
    }

    &:not(&--selected):hover {
      color: $primary-text-color;
    }

    &--selected {
      color: $primary-text-color;
      background-color: rgba($color: $primary-color, $alpha: 0.06);

      &::before {
        height: 100%;
        width: rem-calc(3px);
        background-color: $primary-color;
        border-top-right-radius: rem-calc(4px);
        border-bottom-right-radius: rem-calc(4px);
      }
    }

    &__nav-link {
      height: rem-calc(40px);
      flex-direction: row;
      justify-content: flex-start;
      cursor: pointer;
      width: 100%;
    }

    &__nav-icon-container {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: rem-calc(80px);
      height: 100%;
    }

    &__nav-link-text {
      display: inline-block;
      align-items: center;
      text-wrap: nowrap;
      width: rem-calc(150px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
