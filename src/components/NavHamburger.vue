<script setup lang="ts">
import { motion } from 'motion-v'
import { computed, ref, watch } from 'vue'

const { isOpen } = defineProps<{
  isOpen?: boolean
}>()

const isMobileMenuOpen = ref<boolean>(isOpen || false)

// Watch for changes in isOpen prop
watch(
  () => isOpen,
  (newValue) => {
    isMobileMenuOpen.value = newValue || false
  },
)

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const topLineVariants = {
  open: { rotate: 45, y: 6 },
  rotatePhase: { rotate: 45 },
  closed: { rotate: 0, y: 0 },
}

const middleLineVariants = {
  open: { opacity: 0 },
  closed: { opacity: 1 },
}

const bottomLineVariants = {
  open: { rotate: -45, y: -6 },
  rotatePhase: { rotate: -45 },
  closed: { rotate: 0, y: 0 },
}

const topLineAnimate = computed(() => (isMobileMenuOpen.value ? ['open', 'rotatePhase'] : 'closed'))
const middleLineAnimate = computed(() => (isMobileMenuOpen.value ? 'open' : 'closed'))
const bottomLineAnimate = computed(() =>
  isMobileMenuOpen.value ? ['open', 'rotatePhase'] : 'closed',
)

const toggle = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  emit('toggle')
}
</script>

<template>
  <button class="hamburger-toggle" @click="toggle" aria-label="Toggle mobile menu">
    <motion.span
      :animate="topLineAnimate"
      :variants="topLineVariants"
      class="hamburger-toggle__line"
    />
    <motion.span
      :animate="middleLineAnimate"
      :variants="middleLineVariants"
      class="hamburger-toggle__line"
    />
    <motion.span
      :animate="bottomLineAnimate"
      :variants="bottomLineVariants"
      class="hamburger-toggle__line"
    />
  </button>
</template>

<style scoped lang="scss">
.hamburger-toggle {
  background: none;
  border: none;
  cursor: pointer;

  &__line {
    width: rem-calc(24px);
    height: rem-calc(2px);
    background-color: #000;
    margin: rem-calc(4px) 0;
    display: block;
  }
}
</style>
