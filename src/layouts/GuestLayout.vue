<script setup lang="ts">
const signInImage = {
  src: '/images/sign-in.png',
  alt: 'Sign in image',
}
</script>

<template>
  <div class="guest-layout">
    <div class="guest-layout__content">
      <RouterView />
    </div>
    <!-- Image view -->
    <div class="guest-layout__image-container">
      <div class="guest-layout__images">
        <img
          class="guest-layout__image"
          :src="signInImage.src"
          :alt="signInImage.alt"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
