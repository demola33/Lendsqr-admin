<template>
  <div class="home-view">
    <h1>Welcome Home</h1>
    <p>This is a protected route.</p>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
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
