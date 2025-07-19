<script setup lang="ts"></script>

<template>
  <div class="savings-view">
    <h1>Savings</h1>
  </div>
</template>

<style lang="scss" scoped>
.savings-view {
  @include flex-centered;

  & {
    flex-direction: column;
    min-height: calc(
      100vh - rem-calc(100px) - 9vh - 1rem
    ); // 100px is the header height, 9vh is the footer height, 1rem is the footer padding
  }

  @include media('>medium') {
    min-height: calc(100vh - rem-calc(100px));
  }
}
</style>
