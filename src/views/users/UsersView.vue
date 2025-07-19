<script setup lang="ts">
import AppDashboardCard from '@/components/AppDashboardCard.vue'
import AppDataTable from '@/components/AppDataTable.vue'
import { ref, onMounted, computed } from 'vue'
import { fetchUsers } from '@/services/users'
import type { DashboardCard, User } from '@/types'

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

const dynamicCards = computed<DashboardCard[]>(() => [
  {
    icon: 'UsersOutline',
    title: 'Users',
    value: users.value.length.toLocaleString(),
    color: '#DF18FF',
  },
  {
    icon: 'MultiUsersOutline',
    title: 'Active Users',
    value: users.value.filter((u) => u.status === 'Active').length.toLocaleString(),
    color: '#5718FF',
  },
  {
    icon: 'FileCoin',
    title: 'Users with Loans',
    value: users.value.filter((u) => u.loanRepayment > 0).length.toLocaleString(),
    color: '#F55F44',
  },
  {
    icon: 'CoinSolid',
    title: 'Users with Savings',
    value: users.value
      .filter((u) => parseFloat(u.monthlyIncome.replace(/[^0-9.-]+/g, '')) > 0)
      .length.toLocaleString(), // Assuming savings if monthlyIncome > 0
    color: '#FF3366',
  },
])
</script>

<template>
  <section class="users-view">
    <h1 class="users-view__title">Users</h1>
    <div class="users-view__cards">
      <AppDashboardCard
        v-for="card in dynamicCards"
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
    @include set-text-style('body-text-lg', 'medium');

    & {
      font-family: $font-family-base;
      font-size: rem-calc(24px);
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
