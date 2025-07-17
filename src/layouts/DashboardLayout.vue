<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import { BContainer, BRow, BCol } from 'bootstrap-vue-next'
</script>

<template>
  <div class="dashboard-layout">
    <AppHeader />

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
  background-color: rgb(250, 250, 250);
  min-height: 100vh;

  &__main {
    min-height: calc(100vh - rem-calc(100px));
    padding-top: rem-calc(100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: rem-calc(32px);
  }
}
</style>
