<script setup lang="ts">
import AppDashboardCard from '@/components/AppDashboardCard.vue'
import AppDataTable from '@/components/AppDataTable.vue'
import { ref, onMounted, computed } from 'vue'
import { fetchUsers } from '@/services/users'
import type { DashboardCard, User } from '@/types'
import { BModal } from 'bootstrap-vue-next'
import AppDropdown from '@/components/AppDropdown.vue'
import AppInput from '@/components/AppInput.vue'
import { motion } from 'motion-v'

const users = ref<User[]>([])
const isLoading = ref<boolean>(true)
const applyFilter = ref<boolean>(false)

const showFilterModal = ref<boolean>(false)
const filter = ref({
  organization: '',
  username: '',
  email: '',
  date: '',
  phoneNumber: '',
  status: '',
})

const uniqueOrganizations = computed(() => [...new Set(users.value.map((u) => u.organization))])
const statusOptions = ['Active', 'Inactive', 'Pending', 'Blacklisted']

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

const onFilterIconClick = () => {
  showFilterModal.value = true
}

const resetFilter = () => {
  filter.value = {
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  }
  applyFilter.value = false
  showFilterModal.value = false
}

const filteredRows = computed(() => {
  if (!applyFilter.value) return users.value
  return users.value.filter((row) => {
    const rowDate = new Date(row.dateJoined).toISOString().split('T')[0]
    return (
      (!filter.value.organization || row.organization === filter.value.organization) &&
      (!filter.value.username ||
        row.username.toLowerCase().includes(filter.value.username.toLowerCase())) &&
      (!filter.value.email || row.email.toLowerCase().includes(filter.value.email.toLowerCase())) &&
      (!filter.value.date || rowDate === filter.value.date) &&
      (!filter.value.phoneNumber || row.phoneNumber.includes(filter.value.phoneNumber)) &&
      (!filter.value.status || row.status === filter.value.status)
    )
  })
})

const submitFilterQuery = () => {
  applyFilter.value = true
  showFilterModal.value = false
}
</script>

<template>
  <section class="users-view">
    <motion.h1
      class="users-view__title"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
    >
      Users
    </motion.h1>
    <motion.div
      v-if="!isLoading"
      class="users-view__cards"
      :initial="{ opacity: 0, y: 100 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.1 }"
    >
      <motion.div
        v-for="(card, index) in dynamicCards"
        :key="card.title"
        :initial="{ opacity: 0, y: 100 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.2 * index }"
        class="w-100"
      >
        <AppDashboardCard
          :key="card.title"
          :icon="card.icon"
          :title="card.title"
          :value="card.value"
          :color="card.color"
        />
      </motion.div>
    </motion.div>
    <motion.div
      v-if="!isLoading"
      class="users-view__table"
      :initial="{ opacity: 0, y: 100 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.4 }"
    >
      <AppDataTable
        :rows="filteredRows"
        :is-loading="isLoading"
        @filter-icon-click="onFilterIconClick"
      />
    </motion.div>
    <BModal
      v-model="showFilterModal"
      title="Filter"
      :no-header="true"
      ok-title="Filter"
      cancel-title="Reset"
      @ok="submitFilterQuery"
      @cancel="resetFilter"
      fullscreen="sm"
      :backdrop-first="true"
      :initial-animation="true"
    >
      <form class="users-view__modal-form">
        <AppDropdown
          v-model="filter.organization"
          id="organization"
          label="Organization"
          :options="uniqueOrganizations.map((org: string) => ({ label: org, value: org }))"
          placeholder="Select"
        />
        <AppInput
          v-model="filter.username"
          id="username"
          label="Username"
          placeholder="Enter username"
          :floating-label="false"
        />
        <AppInput
          v-model="filter.email"
          id="email"
          label="Email"
          placeholder="Email"
          :floating-label="false"
        />
        <AppInput
          v-model="filter.date"
          id="date"
          label="Date"
          placeholder="Date"
          type="date"
          :floating-label="false"
        />
        <AppInput
          v-model="filter.phoneNumber"
          id="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
          :floating-label="false"
        />
        <AppDropdown
          v-model="filter.status"
          id="status"
          label="Status"
          :options="statusOptions.map((status: string) => ({ label: status, value: status }))"
          placeholder="Select"
        />
      </form>
    </BModal>
  </section>
</template>

<style lang="scss">
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

  &__modal-buttons {
    display: flex;
    gap: rem-calc(16px);
    margin-top: rem-calc(24px);
  }

  &__modal-form {
    display: flex;
    flex-direction: column;
    gap: rem-calc(20px);
  }
}

.modal-dialog {
  max-width: rem-calc(270px);
  @include media('>medium') {
    margin-left: rem-calc(32px);
  }

  .modal-content {
    border-radius: rem-calc(4px);
    border: rem-calc(1px) solid rgba($color: $secondary-text-color, $alpha: 0.14);
    box-shadow: rem-calc(3px 5px 20px 0) rgba(0, 0, 0, 0.04);
  }

  .modal-body {
    padding: rem-calc(30px) rem-calc(20px);
  }

  .modal-footer {
    justify-content: flex-start;
    flex-wrap: nowrap;

    button.btn:is(button) {
      width: 100%;
      font-weight: 600;
    }
    button.btn-secondary:is(button) {
      border-color: $secondary-text-color;
      color: $secondary-text-color;

      &:hover {
        color: $white;
        border: $primary-color;
      }
    }
  }
}
</style>
