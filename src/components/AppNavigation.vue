<template>
  <BContainer fluid tag="nav" class="app-navigation">
    <BRow>
      <BCol>
        <!-- Navigations -->
        <section>
          <ul class="app-navigation__nav-link-list">
            <AppNavigationItem
              :text="dashboardModule.name"
              :icon="dashboardModule.icon"
              :to="dashboardModule.link"
              class="app-navigation__nav-link-list-dashboard"
            />
            <li class="app-navigation__nav-link-list-category">
              <p class="app-navigation__nav-link-list-title">CUSTOMERS</p>
            </li>
            <AppNavigationItem
              v-for="(link, idx) in shownCustomerNavLinks"
              :key="idx"
              v-bind="link"
            />
            <li class="app-navigation__nav-link-list-category">
              <p class="app-navigation__nav-link-list-title">BUSINESSES</p>
            </li>
            <AppNavigationItem
              v-for="(link, idx) in shownBusinessNavLinks"
              :key="idx"
              v-bind="link"
            />
            <li class="app-navigation__nav-link-list-category">
              <p class="app-navigation__nav-link-list-title">SETTINGS</p>
            </li>
            <AppNavigationItem
              v-for="(link, idx) in shownSettingsNavLinks"
              :key="idx"
              v-bind="link"
            />
          </ul>
        </section>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import { BContainer, BRow, BCol } from 'bootstrap-vue-next'
import { computed } from 'vue'
import type { NavLink } from '@/types'
import AppNavigationItem from './AppNavigationItem.vue'
import {
  customerModules,
  businessModules,
  settingsModules,
  dashboardModule,
} from '@/constants/modules'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const isMobile = computed(() => {
  return width.value <= 768
})

const supportedCustomerModules = Object.values(customerModules)
const supportedBusinessModules = Object.values(businessModules)
const supportedSettingsModules = Object.values(settingsModules)

const customerNavLinks = computed(() => {
  const links: NavLink[] = supportedCustomerModules.map((module) => ({
    icon: module.icon,
    text: module.name,
    to: module.link,
    isDesktopOnly: module.isDesktopOnly,
  }))

  return links
})

const businessNavLinks = computed(() => {
  const links: NavLink[] = supportedBusinessModules.map((module) => ({
    icon: module.icon,
    text: module.name,
    to: module.link,
    isDesktopOnly: module.isDesktopOnly,
  }))

  return links
})

const settingsNavLinks = computed(() => {
  const links: NavLink[] = supportedSettingsModules.map((module) => ({
    icon: module.icon,
    text: module.name,
    to: module.link,
    isDesktopOnly: module.isDesktopOnly,
  }))

  return links
})

/** Nav links to render. */
const shownCustomerNavLinks = computed(() => {
  if (isMobile.value) {
    return customerNavLinks.value.filter((link) => !link.isDesktopOnly)
  }
  return customerNavLinks.value
})

const shownBusinessNavLinks = computed(() => {
  if (isMobile.value) {
    return businessNavLinks.value.filter((link) => !link.isDesktopOnly)
  }
  return businessNavLinks.value
})

const shownSettingsNavLinks = computed(() => {
  if (isMobile.value) {
    return settingsNavLinks.value.filter((link) => !link.isDesktopOnly)
  }
  return settingsNavLinks.value
})
</script>
<style scoped lang="scss">
.app-navigation {
  position: fixed;
  bottom: 0;
  padding-top: rem-calc(16px);
  width: 100%;
  background-color: $white;
  z-index: 90;
  box-shadow: rem-calc(0 5px 20px 0) rgba(0, 0, 0, 0.04);
  transition-duration: $default-transition-speed;

  &__icon-container,
  &__toggle {
    display: none;
  }

  &__nav-link-list-category {
    display: none;
  }

  &__nav-link-list {
    display: flex;
    justify-content: space-around;
    height: max(9vh, rem-calc(66px));
  }

  &__bottom-link-list {
    display: none;
  }
}

// DESKTOP AND TABLET VIEW
.app-navigation {
  @include media('>medium') {
    top: 0;
    height: 100%;
    width: var(--sidebar-width);
    padding-inline: 0;
    padding-top: rem-calc(120px);

    & > *,
    & > * > * {
      // BRow and BCol.
      position: relative;
      margin-left: 0;
      margin-right: 0;
      padding-left: 0;
      padding-right: 0;
      height: 100%;
    }

    &__icon-container {
      @include flex-centered;
      height: rem-calc(74px);
      width: rem-calc(185px);
      margin-bottom: rem-calc(64px);
      pointer-events: none;
      color: $white;
      transition-duration: $default-transition-speed;
    }

    &__icon-text {
      display: flex;
      align-items: center;
      transition-duration: $default-transition-speed;
    }

    &__nav-link-list {
      flex-direction: column;
      align-items: start;
      gap: rem-calc(10px);
      height: auto;
      max-height: calc(100vh - rem-calc(138px));
      overflow-y: auto;
      scrollbar-width: none;
      overflow-x: hidden;
    }

    &__nav-link-list-dashboard {
      margin-bottom: rem-calc(30px);
      width: 100%;
    }

    &__nav-link-list-category {
      display: block;
    }

    &__nav-link-list-title {
      @include set-text-style('body-text-xsm');

      & {
        display: block;
        margin: rem-calc(10px 0 0 30px);
      }
    }

    &__nav-icon-container {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: rem-calc(84px);
      height: 100%;
    }
  }
}
</style>
