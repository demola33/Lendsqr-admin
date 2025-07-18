<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { User } from '@/types'
import { fetchUsers } from '@/services/users' // Assuming we can fetch single user, but for now fetch all and find

const route = useRoute()
const user = ref<User | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const users = await fetchUsers()
    user.value = users.find((u) => u.id === route.params.id) || null
  } catch (error) {
    console.error('Failed to fetch user:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="user-details-view">
    <h1 class="user-details-view__title">User Details</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="user">
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Phone: {{ user.phoneNumber }}</p>
      <!-- Add more details as needed -->
    </div>
    <div v-else>User not found</div>
  </div>
</template>

<style scoped lang="scss">
.user-details-view {
  padding-block: rem-calc(20px) rem-calc(120px);

  @include media('>medium') {
    padding-block: rem-calc(60px) rem-calc(40px);
  }

  &__title {
    @include set-text-style('heading-6', 'medium');
    margin-bottom: rem-calc(40px);
  }

  p {
    @include set-text-style('body-text-sm');
    margin-bottom: rem-calc(16px);
  }
}
</style>
