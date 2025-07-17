<script setup lang="ts">
import { ref } from 'vue'
import { BContainer, BRow, BCol } from 'bootstrap-vue-next'
import LendsqrLogo from './LendsqrLogo.vue'
import AppSearchInput from './AppSearchInput.vue'
import AppIcon from './AppIcon.vue'
import UserProfileDropdown from './UserProfileDropdown.vue'
import NavHamburger from './NavHamburger.vue'
import { motion } from 'motion-v'

const searchInput = ref<string>('')
const mobileMenuOpen = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'toggleMobileMenu', isOpen: boolean): void
}>()

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  emit('toggleMobileMenu', mobileMenuOpen.value)
}
</script>

<template>
  <BContainer fluid tag="header" class="app-header">
    <BRow>
      <BCol cols="7" md="7" class="app-header__left-col">
        <div class="app-header__left-col-content">
          <!-- Mobile Hamburger (Hidden on Desktop) -->
          <NavHamburger
            :is-open="mobileMenuOpen"
            @toggle="toggleMobileMenu"
            class="app-header__hamburger"
          />

          <!-- Logo -->
          <LendsqrLogo class="app-header__logo" size="medium" />

          <!-- Search Bar (Hidden on Mobile) -->
          <div class="app-header__search-bar">
            <AppSearchInput
              id="search-input"
              v-model="searchInput"
              placeholder="Search for anything"
            />
          </div>
        </div>
      </BCol>
      <BCol cols="5" md="5" class="app-header__right-col">
        <!-- Desktop Nav (Hidden on mobile) -->
        <nav class="app-header__desktop-nav w-100">
          <ul class="app-header__right-col-content">
            <li class="app-header__docs-link">
              <a href="https://docs.lendsqr.com" target="_blank">Docs</a>
            </li>
          </ul>
        </nav>

        <div class="app-header__right-col-content">
          <div class="app-header__notification">
            <AppIcon name="Bell" />
          </div>

          <div class="app-header__profile">
            <UserProfileDropdown />
          </div>
        </div>
      </BCol>

      <BCol v-if="mobileMenuOpen" cols="12" md="12" class="app-header__mobile-menu-col">
        <motion.div
          class="app-header__mobile-menu"
          :initial="{ height: 0 }"
          :animate="{
            height: '50dvh',
            transition: { duration: 0.4 },
          }"
        >
          <div class="app-header__mobile-menu-search-bar">
            <AppSearchInput
              id="search-input"
              v-model="searchInput"
              placeholder="Search for anything"
            />
          </div>
          <nav class="app-header__mobile-menu-nav w-100">
            <ul class="app-header__mobile-menu-nav-content">
              <li class="app-header__docs-link">
                <a href="https://docs.lendsqr.com" target="_blank"><h2>Docs</h2></a>
              </li>
            </ul>
          </nav>
          <footer class="app-header__mobile-menu-footer">
            <div class="app-header__mobile-menu-profile">
              <UserProfileDropdown />
            </div>
          </footer>
        </motion.div>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  height: rem-calc(100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  padding-inline: rem-calc(30px);
  transition-duration: $default-transition-speed;
  z-index: $header-and-nav-z-index;
  box-shadow: rem-calc(3px 0 20px 0 rgba(0, 0, 0, 0.04));

  &__search-bar {
    display: none;

    @include media('>medium') {
      display: block;
      width: rem-calc(250px);
    }

    @include media('>large') {
      width: rem-calc(400px);
    }
  }

  &__desktop-nav {
    display: none;

    @include media('>medium') {
      flex: 1;
      display: block;
    }
  }

  &__hamburger {
    display: block;
    margin-right: rem-calc(20px);

    @include media('>medium') {
      display: none;
    }
  }

  &__left-col,
  &__right-col {
    display: flex;
    align-items: center;
  }

  &__left-col-content {
    width: 100%;
    display: flex;
    align-items: center;

    @include media('>medium') {
      justify-content: space-between;
    }
  }

  &__right-col-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: $primary-text-color;

    @include media('>medium') {
      flex: 2;
    }
  }

  &__docs-link {
    @include media('>medium') {
      @include set-text-style('body-text-sm');

      & {
        margin-right: rem-calc(47px);
      }
    }
  }

  &__mobile-menu {
    position: relative;
  }

  &__mobile-menu-col {
    position: fixed;
    top: 0;
    left: 0;
    margin-top: rem-calc(100px);
    background: $white;
  }

  &__mobile-menu-search-bar {
    margin-top: rem-calc(30px);
  }

  &__mobile-menu-nav-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: rem-calc(30px 14px);
    height: 100%;
  }

  &__mobile-menu-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: rem-calc(30px);
  }

  &__profile {
    display: none;

    @include media('>medium') {
      display: block;
      margin-left: rem-calc(30px);
    }
  }
}
</style>
