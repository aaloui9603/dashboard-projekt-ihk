<script setup>
import { RouterLink } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <nav class="flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/30 dark:bg-black/30 border-b border-white/40 dark:border-white/10">
    <div class="flex gap-4">
      <RouterLink
        to="/"
        class="font-medium px-3 py-1 rounded-lg hover:bg-white/30 dark:hover:bg-black/30"
        active-class="bg-white/50 dark:bg-black/50"
      >
        Start
      </RouterLink>
      <RouterLink
        to="/dashboard"
        class="font-medium px-3 py-1 rounded-lg hover:bg-white/30 dark:hover:bg-black/30"
        active-class="bg-white/50 dark:bg-black/50"
      >
        Dashboard
      </RouterLink>
      <RouterLink
        to="/notizen"
        class="font-medium px-3 py-1 rounded-lg hover:bg-white/30 dark:hover:bg-black/30"
        active-class="bg-white/50 dark:bg-black/50"
      >
        Notizen
      </RouterLink>
    </div>
    <ThemeToggle />
  </nav>
</template>
