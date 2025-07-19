<script setup lang="ts">
import LendsqrLogo from '@/components/LendsqrLogo.vue'
import { BContainer, BRow, BCol } from 'bootstrap-vue-next'

const signInImage = {
  src: '/images/sign-in.png',
  alt: 'Sign in image',
}
</script>

<template>
  <div class="guest-layout">
    <!-- Background Image Section (Desktop Only) -->
    <div class="guest-layout__visuals">
      <LendsqrLogo class="guest-layout__logo" size="large" />
      <div class="guest-layout__image-container">
        <img
          class="guest-layout__image"
          :src="signInImage.src"
          :alt="signInImage.alt"
          loading="lazy"
        />
      </div>
    </div>

    <BContainer>
      <BRow>
        <BCol>
          <div class="guest-layout__content">
            <RouterView />
          </div>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<style lang="scss" scoped>
.guest-layout {
  display: flex;
  height: 100vh;

  @include media('>medium') {
    flex-direction: row;
  }

  &__content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-inline: rem-calc(30px);

    @include media('>medium') {
      padding-inline: rem-calc(100px);
    }
  }

  &__visuals {
    display: none;

    @include media('>medium') {
      display: block;
      position: relative;
      width: 50vw;
      padding-inline: rem-calc(65px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgb(252, 252, 252);
    }
  }

  &__image-container {
    position: relative;
    width: calc(50vw - rem-calc(130px));
  }

  &__image {
    width: 100%;
    object-fit: contain;
    image-rendering: pixelated;
  }

  &__logo {
    align-self: flex-start;
    margin-inline-start: rem-calc(30px);
    margin-block: rem-calc(106px) rem-calc(100px);
  }
}
</style>
