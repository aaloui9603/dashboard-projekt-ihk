<script setup>
import { onMounted, ref, computed } from 'vue'
import { useTodoStore } from '../stores/todoStore.js'
import { useFolderStore } from '../stores/folderStore.js'

const todoStore = useTodoStore()
const folderStore = useFolderStore()

const selectedFolderId = ref('all')

onMounted(() => {
  todoStore.fetchTodos()
  folderStore.fetchFolders()
})

const filteredTodos = computed(() => {
  if (selectedFolderId.value === 'all') return todoStore.todos
  return todoStore.todos.filter(t => t.folder_id === selectedFolderId.value)
})

const openTodos = computed(() => filteredTodos.value.filter(t => !t.is_done))
const doneTodos = computed(() => filteredTodos.value.filter(t => t.is_done))
</script>

<template>
  <div class="max-w-xl mx-auto mt-8 px-4 space-y-6">
    <h1 class="text-2xl font-bold">Dashboard</h1>

    <select
      v-model="selectedFolderId"
      class="w-full rounded-xl px-3 py-2 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10"
    >
      <option value="all">Alle Ordner</option>
      <option v-for="folder in folderStore.folders" :key="folder.id" :value="folder.id">
        {{ folder.title }}
      </option>
    </select>

    <div>
      <h2 class="text-lg font-semibold mb-2">Offen ({{ openTodos.length }})</h2>
      <div class="space-y-2">
        <div
          v-for="todo in openTodos"
          :key="todo.id"
          class="rounded-xl px-4 py-2 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10"
        >
          {{ todo.title }}
        </div>
        <p v-if="openTodos.length === 0" class="text-sm opacity-60">Keine offenen To-Dos.</p>
      </div>
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-2">Erledigt ({{ doneTodos.length }})</h2>
      <div class="space-y-2">
        <div
          v-for="todo in doneTodos"
          :key="todo.id"
          class="rounded-xl px-4 py-2 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 line-through opacity-60"
        >
          {{ todo.title }}
        </div>
        <p v-if="doneTodos.length === 0" class="text-sm opacity-60">Noch nichts erledigt.</p>
      </div>
    </div>
  </div>
</template>
