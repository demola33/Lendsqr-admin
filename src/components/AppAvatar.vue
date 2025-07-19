<template>
  <div class="app-author">
    <img
      :src="avatarSrc"
      :alt="image?.alt || defaultAvatar.alt"
      :loading="image?.loading || 'lazy'"
      :class="['app-author__image', `app-author__image--${size}`]"
    />

    <div class="app-author__info">
      <span :class="['app-author__name', `app-author__name--${size}`]">{{ name }}</span>
      <span v-if="subtitle" :class="['app-author__subtitle', `app-author__subtitle--${size}`]">{{
        subtitle
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AvatarProps } from '@/types'
import { ref, watch, onMounted } from 'vue'

const { image, name, subtitle, size = 'medium' } = defineProps<AvatarProps>()

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

    @include media('>medium') {
      gap: rem-calc(20px);
    }
  }

  &__image {
    border-radius: 50%;
    object-fit: cover;

    &--small {
      width: rem-calc(40px);
      height: rem-calc(40px);
    }

    &--medium {
      width: rem-calc(60px);
      height: rem-calc(60px);
    }

    &--large {
      width: rem-calc(100px);
      height: rem-calc(100px);
    }
  }

  &__name {
    font-weight: 500;
    color: $primary-text-color;

    &--small {
      font-size: rem-calc(12px);
    }

    &--medium {
      font-size: rem-calc(16px);
    }

    &--large {
      font-size: rem-calc(22px);
    }
  }

  &__subtitle {
    color: $secondary-text-color;

    &--small {
      font-size: rem-calc(10px);
    }

    &--medium {
      @include set-text-style('body-text-xsm');
    }

    &--large {
      font-size: rem-calc(14px);
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: rem-calc(4px);
  }
}
</style>
