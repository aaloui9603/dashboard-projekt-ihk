<script setup>
import { onMounted, computed } from 'vue'
import { useTodoStore } from '../stores/todoStore.js'
import { useFolderStore } from '../stores/folderStore.js'
import { useNoteStore } from '../stores/noteStore.js'

const todoStore = useTodoStore()
const folderStore = useFolderStore()
const noteStore = useNoteStore()

onMounted(() => {
  todoStore.fetchTodos()
  folderStore.fetchFolders()
  noteStore.fetchNotes()
})

const totalTodos = computed(() => todoStore.todos.length)
const doneTodos = computed(() => todoStore.todos.filter(t => t.is_done).length)
const completionRate = computed(() => {
  if (totalTodos.value === 0) return 0
  return Math.round((doneTodos.value / totalTodos.value) * 100)
})

const folderStats = computed(() => {
  return folderStore.folders.map(folder => {
    const folderTodos = todoStore.todos.filter(t => t.folder_id === folder.id)
    const done = folderTodos.filter(t => t.is_done).length
    const rate = folderTodos.length === 0 ? 0 : Math.round((done / folderTodos.length) * 100)
    return { ...folder, total: folderTodos.length, done, rate }
  })
})
</script>

<template>
  <div class="max-w-xl mx-auto mt-8 px-4 space-y-6">
    <h1 class="text-2xl font-bold">Statistik & Auswertung</h1>

    <div class="grid grid-cols-3 gap-2 sm:gap-3">
      <div class="rounded-xl px-2 sm:px-4 py-3 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 text-center">
        <p class="text-2xl font-bold">{{ totalTodos }}</p>
        <p class="text-sm opacity-70">To-Dos</p>
      </div>
      <div class="rounded-xl px-2 sm:px-4 py-3 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 text-center">
        <p class="text-2xl font-bold">{{ folderStore.folders.length }}</p>
        <p class="text-sm opacity-70">Ordner</p>
      </div>
      <div class="rounded-xl px-2 sm:px-4 py-3 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 text-center">
        <p class="text-2xl font-bold">{{ noteStore.notes.length }}</p>
        <p class="text-sm opacity-70">Notizen</p>
      </div>
    </div>

    <div>
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold">Erledigungsquote</h2>
        <span class="font-bold">{{ completionRate }}%</span>
      </div>
      <div class="w-full h-4 rounded-full bg-white/30 dark:bg-black/30 overflow-hidden">
        <div
          class="h-full bg-blue-500 transition-all duration-500"
          :style="{ width: completionRate + '%' }"
        ></div>
      </div>
      <p class="text-sm opacity-70 mt-1">{{ doneTodos }} von {{ totalTodos }} To-Dos erledigt</p>
    </div>

    <div v-if="folderStats.length > 0">
      <h2 class="text-lg font-semibold mb-3">Erledigungsquote pro Ordner</h2>
      <div class="space-y-3">
        <div v-for="folder in folderStats" :key="folder.id">
          <div class="flex flex-wrap justify-between items-center gap-1 mb-1 text-sm">
            <span class="flex items-center gap-2">
              <span
                class="w-3 h-3 rounded-full shrink-0"
                :style="{ backgroundColor: `var(--color-${folder.color.toLowerCase()})` }"
              ></span>
              {{ folder.title }}
            </span>
            <span>{{ folder.done }}/{{ folder.total }} ({{ folder.rate }}%)</span>
          </div>
          <div class="w-full h-2 rounded-full bg-white/30 dark:bg-black/30 overflow-hidden">
            <div
              class="h-full transition-all duration-500"
              :style="{ width: folder.rate + '%', backgroundColor: `var(--color-${folder.color.toLowerCase()})` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
