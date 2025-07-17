<script setup lang="ts">
import { ref } from 'vue'
import { BContainer, BRow, BCol } from 'bootstrap-vue-next'
import LendsqrLogo from './LendsqrLogo.vue'
import AppSearchInput from './AppSearchInput.vue'
import AppIcon from './AppIcon.vue'
import UserProfileDropdown from './UserProfileDropdown.vue'

const searchInput = ref<string>('')
</script>

<template>
  <BContainer fluid tag="header" class="app-header">
    <BRow>
      <BCol cols="12" md="7" class="app-header__left-col">
        <div class="app-header__left-col-content">
          <LendsqrLogo class="app-header__logo" size="medium" />
          <div class="app-header__search-bar">
            <AppSearchInput
              id="search-input"
              v-model="searchInput"
              placeholder="Search for anything"
            />
          </div>
        </div>
      </BCol>
      <BCol cols="12" md="5" class="app-header__right-col">
        <nav class="w-100">
          <ul class="app-header__right-col-content">
            <li class="app-header__docs-link">
              <a href="https://docs.lendsqr.com" target="_blank">Docs</a>
            </li>
            <li class="app-header__notification">
              <AppIcon name="Bell" />
            </li>

            <li class="app-header__profile">
              <UserProfileDropdown />
            </li>
          </ul>
        </nav>
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
    width: rem-calc(400px);
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
    justify-content: space-between;
  }

  &__right-col-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: $primary-text-color;
  }

  &__docs-link {
    @include set-text-style('body-text-sm');

    & {
      margin-right: rem-calc(47px);
    }
  }

  &__profile {
    margin-left: rem-calc(30px);
  }
}
</style>
