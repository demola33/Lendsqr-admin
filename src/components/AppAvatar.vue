<template>
  <div class="app-author">
    <img
      :src="image?.src || defaultAvatar.src"
      :alt="image?.alt || defaultAvatar.alt"
      :loading="image?.loading || 'lazy'"
      class="app-author__image"
    />

    <div class="app-author__info">
      <span class="app-author__name">{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AvatarProps } from '@/types'

const { image, name } = defineProps<AvatarProps>()

const defaultAvatar = {
  src: 'https://avatar.iran.liara.run/public/15',
  alt: 'Profile avatar',
}
</script>

<style lang="scss" scoped>
.app-author {
  & {
    display: flex;
    align-items: center;
    gap: rem-calc(16px);
  }

  &__image {
    width: rem-calc(60px);
    height: rem-calc(60px);
    border-radius: 50%;
    object-fit: cover;
  }

  &__name {
    font-size: rem-calc(16px);
  }

  &__title {
    font-size: rem-calc(16px);
  }
}
</style>
