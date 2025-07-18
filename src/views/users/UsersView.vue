<script setup lang="ts">
import AppDashboardCard from '@/components/AppDashboardCard.vue'
import { dashboardCards } from '@/constants'
import AppDataTable from '@/components/AppDataTable.vue'
import { ref, onMounted } from 'vue'
import { fetchUsers } from '@/services/users'
import type { User } from '@/types'

const users = ref<User[]>([])
const isLoading = ref<boolean>(true)

onMounted(async () => {
  try {
    isLoading.value = true
    users.value = await fetchUsers()
  } catch (error) {
    console.error('Failed to fetch users:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
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
    <div class="users-view__table">
      <AppDataTable :rows="users" :is-loading="isLoading" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.users-view {
  padding-block: rem-calc(20px) rem-calc(120px);

  @include media('>medium') {
    padding-block: rem-calc(60px) rem-calc(40px);
  }

  &__title {
    @include set-text-style('heading-6', 'medium');

    & {
      margin-bottom: rem-calc(40px);
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: rem-calc(24px);

    @include media('>large') {
      display: flex;
    }
  }

  &__table {
    margin-top: rem-calc(40px);
  }

  &__loading {
    @include set-text-style('body-text-sm', 'medium');

    & {
      text-align: center;
      padding: rem-calc(40px);
      color: $secondary-text-color;
    }
  }
}
</style>
