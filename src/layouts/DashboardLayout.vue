<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppNavigation from '@/components/AppNavigation.vue'
import { BContainer, BRow, BCol } from 'bootstrap-vue-next'
</script>

<template>
  <div class="dashboard-layout">
    <AppHeader />
    <AppNavigation />

    <BContainer fluid>
      <BRow>
        <BCol>
          <main class="dashboard-layout__main">
            <RouterView />
          </main>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<style scoped lang="scss">
.dashboard-layout {
  --sidebar-width: #{rem-calc(280px)};
  background-color: rgb(250, 250, 250);
  min-height: 100vh;

  &__main {
    min-height: 100vh;
    padding-top: rem-calc(100px);
    display: flex;
    flex-direction: column;
    gap: rem-calc(32px);

    @include media('>medium') {
      padding-left: var(--sidebar-width);
    }
  }
}
</style>
