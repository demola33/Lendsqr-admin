<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import type { User } from '@/types'
import { fetchUsers } from '@/services/users' // Assuming we can fetch single user, but for now fetch all and find
import AppIcon from '@/components/AppIcon.vue'
import { useRouter } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import AppTabs from '@/components/AppTabs.vue'
import AppAvatar from '@/components/AppAvatar.vue'
import { TabsContent, TabsIndicator, TabsTrigger } from 'reka-ui'
import AppInfoSection from '@/components/AppInfoSection.vue'
import { useWindowSize } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const user = ref<User | null>(null)
const isLoading = ref(true)

const { width } = useWindowSize()

const isTablet = computed(() => {
  return width.value <= 1024
})

const avatarSize = computed(() => {
  return isTablet.value ? 'medium' : 'large'
})

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
    <div class="user-details-view__back" @click="router.push('/users')">
      <AppIcon name="BackArrow" />
      <span>Back to Users</span>
    </div>
    <div class="user-details-view__header">
      <h1 class="user-details-view__title">User Details</h1>
      <div class="user-details-view__actions">
        <AppButton
          variant="danger"
          :fit="true"
          class="user-details-view__action-button"
          :disabled="user === null || user?.status === 'Blacklisted'"
          >BLACKLIST USER</AppButton
        >
        <AppButton
          variant="secondary"
          :fit="true"
          class="user-details-view__action-button"
          :disabled="user === null || user?.status === 'Active'"
          >ACTIVATE USER</AppButton
        >
      </div>
    </div>
    <div v-if="isLoading" class="user-details-view__loading">
      <div class="user-details-view__spinner"></div>
      Loading...
    </div>
    <AppTabs v-else-if="user !== null">
      <template #header>
        <div class="user-details-view__tabs-header">
          <AppAvatar
            :name="user?.fullName || ''"
            :subtitle="user?.email || ''"
            :size="avatarSize"
          />
          <hr class="user-details-view__tabs-header-divider" />
          <div v-if="user?.rating" class="user-details-view__rating">
            <span>User's Tier</span>
            <div class="user-details-view__rating-stars">
              <div v-for="index in 3" :key="index" class="user-details-view__rating-star">
                <AppIcon
                  :name="index <= (user?.rating || 0) ? 'StarFilled' : 'StarOutline'"
                  size="xl"
                />
              </div>
            </div>
          </div>
          <hr class="user-details-view__tabs-header-divider" />
          <div class="user-details-view__tabs-header-amount">
            <span>{{
              user?.amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })
            }}</span>
            <span class="user-details-view__tabs-header-amount-bank"
              >{{ user?.bvn }}/{{ user?.bank }}</span
            >
          </div>
        </div>
      </template>
      <template #tabs>
        <TabsIndicator class="user-details-view__indicator">
          <div class="user-details-view__indicator-inner" />
        </TabsIndicator>
        <TabsTrigger
          class="user-details-view__trigger user-details-view__trigger--first"
          value="tab1"
        >
          <span>General Details</span>
        </TabsTrigger>
        <TabsTrigger
          class="user-details-view__trigger user-details-view__trigger--last"
          value="tab2"
        >
          <span>Documents</span>
        </TabsTrigger>
        <TabsTrigger
          class="user-details-view__trigger user-details-view__trigger--last"
          value="tab3"
        >
          <span>Bank Details</span>
        </TabsTrigger>
        <TabsTrigger
          class="user-details-view__trigger user-details-view__trigger--last"
          value="tab4"
        >
          <span>Loans</span>
        </TabsTrigger>
        <TabsTrigger class="user-details-view__trigger app-tabs__trigger--last" value="tab5">
          <span>Savings</span>
        </TabsTrigger>
        <TabsTrigger class="user-details-view__trigger app-tabs__trigger--last" value="tab6">
          <span>App and System</span>
        </TabsTrigger>
      </template>
      <template #content>
        <TabsContent class="user-details-view__tabs-content" value="tab1">
          <AppInfoSection
            header="Personal Information"
            :items="[
              { title: 'Full Name', value: user?.fullName || '' },
              { title: 'Phone Number', value: user?.phoneNumber || '' },
              { title: 'Email Address', value: user?.email || '' },
              { title: 'BVN', value: user?.bvn || '' },
              { title: 'Gender', value: user?.gender || '' },
              { title: 'Marital Status', value: user?.maritalStatus || '' },
              { title: 'Children', value: user?.children || '' },
              { title: 'Type of Residence', value: user?.residenceType || '' },
            ]"
          />
          <AppInfoSection
            header="Education and Employment"
            :items="[
              { title: 'Level of Education', value: user?.educationLevel || '' },
              { title: 'Employment Status', value: user?.employmentStatus || '' },
              { title: 'Sector of Employment', value: user?.employmentSector || '' },
              { title: 'Duration of Employment', value: user?.employmentDuration || '' },
              { title: 'Office Email', value: user?.officeEmail || '' },
              { title: 'Monthly Income', value: user?.monthlyIncome || '' },
              {
                title: 'Loan Repayment',
                value:
                  user?.loanRepayment.toLocaleString('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                  }) || '',
              },
            ]"
          />
          <AppInfoSection
            header="Socials"
            :items="[
              { title: 'Twitter', value: user?.twitter || '' },
              { title: 'Facebook', value: user?.facebook || '' },
              { title: 'Instagram', value: user?.instagram || '' },
            ]"
          />
          <AppInfoSection
            header="Guarantor"
            :items="[
              { title: 'Full Name', value: user?.guarantorName || '' },
              { title: 'Phone Number', value: user?.guarantorPhone || '' },
              { title: 'Email Address', value: user?.guarantorEmail || '' },
              { title: 'Relationship', value: user?.relationship || '' },
            ]"
          />
        </TabsContent>
        <TabsContent class="user-details-view__tabs-content" value="tab2">
          <h4 class="app-tabs__description">DOCUMENT</h4>
        </TabsContent>
        <TabsContent class="user-details-view__tabs-content" value="tab3">
          <h4 class="app-tabs__description">BANK DETAILS</h4>
        </TabsContent>
        <TabsContent class="user-details-view__tabs-content" value="tab4">
          <h4 class="app-tabs__description">LOANS</h4>
        </TabsContent>
        <TabsContent class="user-details-view__tabs-content" value="tab5">
          <h4 class="app-tabs__description">SAVINGS</h4>
        </TabsContent>
        <TabsContent class="user-details-view__tabs-content" value="tab6">
          <h4 class="app-tabs__description">APP AND SYSTEM</h4>
        </TabsContent>
      </template>
    </AppTabs>
    <div v-else class="user-details-view__not-found">
      <p>User not found</p>
      <AppButton
        variant="primary"
        :fit="true"
        class="user-details-view__not-found-button"
        @click="router.push('/users')"
        >Back to Users</AppButton
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-details-view {
  padding-block: rem-calc(20px) rem-calc(100px);

  @include media('>medium') {
    padding-block: rem-calc(60px) rem-calc(40px);
  }

  &__back {
    @include set-text-style('body-text-sm');

    & {
      display: flex;
      align-items: center;
      gap: rem-calc(10px);
      margin-bottom: rem-calc(20px);
      color: $secondary-text-color;
      cursor: pointer;
      transition: color 0.3s ease-in-out;

      &:hover {
        color: $primary-color;
      }
    }
  }

  &__title {
    @include set-text-style('body-text-lg', 'medium');

    & {
      font-family: $font-family-base;
      font-size: rem-calc(24px);
    }
  }

  p {
    @include set-text-style('body-text-sm');
    margin-bottom: rem-calc(16px);
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: rem-calc(30px);
    align-items: flex-start;
    margin-bottom: rem-calc(40px);

    @include media('>medium') {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: rem-calc(20px);
  }

  &__action-button:is(button.btn) {
    font-weight: 600;
  }

  &__tabs-header {
    padding-inline: rem-calc(16px);
    padding-block: rem-calc(20px);
    display: flex;
    flex-direction: column;
    gap: 0;

    @include media('>large') {
      padding-inline: rem-calc(30px);
      flex-direction: row;
      align-items: center;
      gap: rem-calc(30px);
    }

    &-divider {
      min-height: rem-calc(1px);
      border: none;
      opacity: 0.2;
      width: 100%;
      background-color: $secondary-text-color;

      @include media('>large') {
        min-height: rem-calc(1px);
        width: rem-calc(1px);
      }
    }
  }

  &__rating {
    display: flex;
    flex-direction: column;

    justify-content: center;

    @include media('>large') {
      align-items: center;
    }

    span {
      @include set-text-style('body-text-sm', 'medium');

      & {
        color: $secondary-text-color;
      }
    }
  }

  &__rating-stars {
    display: flex;
    align-items: center;
    gap: rem-calc(4px);
  }

  &__tabs-header-amount {
    @include set-text-style('body-text-lg', 'medium');

    & {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: $primary-text-color;

      @include media('>large') {
        font-size: rem-calc(22px);
      }
    }

    &-bank {
      @include set-text-style('body-text-xsm');

      & {
        color: $secondary-text-color;
      }
    }
  }

  &__indicator {
    position: absolute;
    padding-left: rem-calc(16px);
    padding-right: rem-calc(16px);
    left: 0;
    height: rem-calc(2px);
    bottom: 0;
    width: var(--reka-tabs-indicator-size);
    transform: translateX(var(--reka-tabs-indicator-position)) translateY(rem-calc(1px));
    border-radius: 9999px;
    transition:
      width 0.3s,
      transform 0.3s;

    @include media('>medium') {
      padding-left: rem-calc(32px);
      padding-right: rem-calc(32px);
    }

    &-inner {
      background-color: $primary-color;
      width: 100%;
      height: 100%;
    }
  }

  &__trigger {
    background-color: $white;
    padding-left: rem-calc(20px);
    padding-right: rem-calc(20px);
    height: rem-calc(45px);
    text-wrap-mode: nowrap;
    flex: 1 1 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: rem-calc(14px);
    line-height: 1.2;
    color: rgba($color: #000000, $alpha: 0.8);
    user-select: none;
    outline: none;
    cursor: pointer;

    &:hover {
      color: $primary-color;
    }

    &[data-state='active'] {
      color: $primary-color;
    }

    &:focus-visible {
      position: relative;
      box-shadow: 0 0 0 rem-calc(2px) #000;
    }
  }

  &__tabs-content {
    background: $white;
    border-radius: rem-calc(4px);
    box-shadow: 3px 5px 20px 0 rgba(0, 0, 0, 0.04);
    border: rem-calc(1px) solid rgba($color: $primary-text-color, $alpha: 0.06);
    width: 100%;
    min-height: rem-calc(300px);
    padding-inline: rem-calc(30px);
    padding-block: rem-calc(30px);

    @include media('>large') {
      position: absolute;
      top: rem-calc(210px);
    }
  }

  &__loading {
    display: flex;
    flex-direction: column;
    min-height: rem-calc(300px);
    align-items: center;
    justify-content: center;
    gap: rem-calc(10px);
    padding: rem-calc(40px);
    color: $secondary-text-color;
  }

  &__spinner {
    border: rem-calc(4px) solid rgba(0, 0, 0, 0.1);
    border-left-color: $primary-color;
    border-radius: 50%;
    width: rem-calc(24px);
    height: rem-calc(24px);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  &__not-found {
    @include set-text-style('body-text-lg');
    @include flex-centered;

    & {
      flex-direction: column;
      text-align: center;
      margin-top: rem-calc(100px);
      min-height: rem-calc(300px);
    }
  }
}
</style>
