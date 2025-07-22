<script setup lang="ts">
import { ref } from 'vue'
import AppInput from '@/components/AppInput.vue'
import type { AppInputProps } from '@/types'
import AppButton from '@/components/AppButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'

const defaultAppInputEmailProps: AppInputProps = {
  id: 'email',
  label: '',
  type: 'email',
  placeholder: 'Enter your email',
  state: null,
  disabled: false,
  trim: true,
  name: 'email',
  inputClass: '',
}

const defaultAppInputPasswordProps: AppInputProps = {
  id: 'password',
  label: '',
  placeholder: 'Password',
  type: 'password',
  name: 'password',
}
const inputEmailText = ref<string>('admin@smartlenders.com')
const inputPasswordText = ref<string>('')
const loading = ref<boolean>(false)
const authStore = useAuthStore()
const router = useRouter()
const error = ref<string | null>(null)

const handleLogin = async () => {
  if (inputEmailText.value === '' || inputPasswordText.value === '') {
    return
  }

  try {
    loading.value = true
    await authStore.login(inputEmailText.value, inputPasswordText.value)
    router.push('/home')
  } catch (err) {
    error.value = 'Invalid email or password'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="login-view">
    <div class="login-view__logo">
      <AppIcon name="LendsqrLogo" size="large" />
      <AppIcon name="LendsqrLogoText" size="large" />
    </div>

    <h1>Welcome!</h1>
    <p class="login-view__subtitle">Enter details to login.</p>
    <form @submit.prevent="handleLogin" class="login-view__form">
      <fieldset class="login-view__fieldset">
        <AppInput v-bind="defaultAppInputEmailProps" v-model="inputEmailText" />
        <AppInput v-bind="defaultAppInputPasswordProps" v-model="inputPasswordText" />
      </fieldset>
      <h6 class="login-view__forgot-password-prompt">
        <RouterLink class="login-view__forgot-password-link" to="/"> Forgot Password? </RouterLink>
      </h6>
      <span v-if="error" class="login-view__error-message">{{ error }}</span>
      <AppButton
        variant="primary"
        size="regular"
        class="login-view__login-button"
        :disabled="loading || inputEmailText === '' || inputPasswordText === ''"
      >
        <span v-if="loading" class="login-view__button-spinner"></span>
        {{ loading ? 'Loading...' : 'Login' }}
      </AppButton>
    </form>
  </main>
</template>

<style lang="scss" scoped>
.login-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  &__logo {
    @include flex-centered;

    & {
      width: 100%;
      gap: rem-calc(10px);
      align-items: flex-start;
      margin-bottom: rem-calc(100px);
    }

    @include media('>medium') {
      display: none;
    }
  }

  &__subtitle {
    @include set-text-style('body-text-lg');
  }

  &__form {
    width: 100%;
  }

  &__fieldset {
    margin-top: rem-calc(60px);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: rem-calc(24px);
  }

  &__forgot-password-prompt {
    @include set-text-style('body-text-sm');

    & {
      display: block;
      margin-top: rem-calc(24px);
    }
  }

  &__forgot-password-link {
    @include set-text-style('body-text-xxsm');

    & {
      color: $primary-color;
      text-decoration: none;
      font-weight: 600;
    }
  }

  &__login-button {
    margin-top: rem-calc(24px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem-calc(8px);
  }

  &__button-spinner {
    border: rem-calc(2px) solid rgba(255, 255, 255, 0.3);
    border-left-color: $white;
    border-radius: 50%;
    width: rem-calc(16px);
    height: rem-calc(16px);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  &__error-message {
    @include set-text-style('body-text-xxsm');

    & {
      color: $error-color;
    }
  }
}
</style>
