<script setup>
import { useThemeStore } from '../stores/themeStore'

const themeStore = useThemeStore()
</script>

<template>
  <button
    @click="themeStore.toggleTheme"
    class="rounded-full px-4 py-2 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 shadow-md transition"
  >
    {{ themeStore.isDark ? '☀️ Hell' : '🌙 Dunkel' }}
  </button>
</template>