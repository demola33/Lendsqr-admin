<template>
  <BDropdown
    v-model="userProfileDropdownIsOpen"
    class="user-profile-dropdown"
    auto-close="outside"
    end
  >
    <template #button-content>
      <AppAvatar :image="userProfileImage" :name="auth.adminUser?.name || ''" />
      <AppIcon :class="caretClasses" name="CaretDown" />
    </template>
    <BDropdownText>
      <AppAvatar :image="userProfileImage" :name="auth.adminUser?.name || ''" />
    </BDropdownText>
    <BDropdownDivider class="user-profile-dropdown__divider" />

    <BDropdownItem @click="logout">
      <AppIcon
        class="user-profile-dropdown__icon user-profile-dropdown__icon--logout"
        name="SignOut"
      />
      Logout
    </BDropdownItem>
  </BDropdown>
</template>

<script setup lang="ts">
import { BDropdown, BDropdownText, BDropdownDivider, BDropdownItem } from 'bootstrap-vue-next'
import AppAvatar from '@/components/AppAvatar.vue'
import AppIcon from '@/components/AppIcon.vue'
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import type { ImageProps } from '@/types'

const auth = useAuthStore()

const router = useRouter()
const userProfileDropdownIsOpen = ref(false)
const caretClasses = computed(() => [
  'user-profile-dropdown__caret',
  {
    'user-profile-dropdown__caret--up': userProfileDropdownIsOpen.value,
  },
])

const userProfileImage = computed(
  (): ImageProps => ({
    src: auth.adminUser?.imageUrl || '',
    alt: `Profile image for ${auth.adminUser?.name ?? ''}`,
    loading: 'eager',
  }),
)

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<style lang="scss">
.user-profile-dropdown {
  button:is(button.btn):nth-child(n) {
    border: none;
    color: inherit;
    gap: 0;
    padding-inline: 0;

    &::after {
      display: none;
    }
  }

  .avatar__text {
    max-width: unset;
  }

  .avatar__sub-text {
    max-width: rem-calc(250px);
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }

  .dropdown-menu {
    border: rem-calc(1px) solid $gray-shade-100;
    background-color: white;
    box-shadow: 0px 1px 1px 0 $gray-shade-100;
    animation: fade-in $default-transition-speed;
    padding: rem-calc(16px 12px);
  }

  .dropdown-item-text {
    color: inherit;
    padding-inline: 0;
    min-width: rem-calc(210px);
  }

  .dropdown-item {
    @include set-text-style('body-text-sm');

    & {
      padding: rem-calc(6px 0);
      border-radius: rem-calc(8px);
      color: inherit;
    }

    &:hover,
    &:active,
    &:focus {
      color: inherit;
      background-color: $gray-shade-50;
    }
  }

  &__icon {
    width: rem-calc(30px);
    height: rem-calc(30px);
    color: $gray-shade-400;
    margin: rem-calc(2px 8px);

    &--logout {
      width: rem-calc(26px);
    }
  }

  &__caret {
    height: rem-calc(12px);
    width: rem-calc(28px);
    color: inherit;
    transition-duration: $default-transition-speed;

    &--up {
      transform: rotate(180deg);
    }
  }
}
</style>
