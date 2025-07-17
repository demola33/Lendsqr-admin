<template>
  <div class="app-author">
    <img
      :src="avatarSrc"
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
import { ref, watch, onMounted } from 'vue'

const { image, name } = defineProps<AvatarProps>()

const defaultAvatar = {
  src: '/images/profile.jpg',
  alt: 'Profile avatar',
}

const avatarSrc = ref(defaultAvatar.src)

function tryLoadImage(src?: string) {
  if (!src) return
  const img = new window.Image()
  img.onload = () => {
    avatarSrc.value = src
  }
  img.onerror = () => {
    avatarSrc.value = defaultAvatar.src
  }
  img.src = src
}

onMounted(() => {
  tryLoadImage(image?.src)
})

watch(
  () => image?.src,
  (val) => {
    avatarSrc.value = defaultAvatar.src
    tryLoadImage(val)
  },
)
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
