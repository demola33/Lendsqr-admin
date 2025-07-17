<script setup lang="ts">
import { BContainer, BRow, BCol } from 'bootstrap-vue-next'
import AppDashboardCard from '@/components/AppDashboardCard.vue'
import { dashboardCards } from '@/constants'
</script>

<template>
  <BContainer>
    <BRow>
      <BCol>
        <section class="users-view">
          <h1 class="users-view__title">Users</h1>
          <div class="users-view__cards">
            <AppDashboardCard
              v-for="card in dashboardCards"
              :key="card.title"
              :icon="card.icon"
              :title="card.title"
              :value="card.value"
              :color="card.color"
            />
          </div>
        </section>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped lang="scss">
.users-view {
  padding: rem-calc(60px) rem-calc(40px);

  &__title {
    @include set-text-style('heading-6', 'medium');

    & {
      margin-bottom: rem-calc(40px);
    }
  }

  &__cards {
    @include flex-centered;
    gap: rem-calc(24px);
  }
}
</style>
