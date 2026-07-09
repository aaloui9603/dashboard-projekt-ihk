<script setup>
import { computed } from 'vue'
import { useFolderStore } from '../stores/folderStore.js'


const props = defineProps({
    todo: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['toggle-todo', 'delete-todo'])

const folderStore = useFolderStore()

const folder = computed(() => 
    folderStore.folders.find(f => f.id === props.todo.folder_id)
)
</script>

<template>
  <div class="flex items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 shadow-md">
    <input
      type="checkbox"
      :checked="todo.is_done"
      @change="emit('toggle-todo', todo.id)"
      class="w-5 h-5"
    />

    <span
      v-if="folder"
      class="w-3 h-3 rounded-full shrink-0"
      :style="{ backgroundColor: `var(--color-${folder.color.toLowerCase()})` }"
      :title="folder.title"
    ></span>

    <div class="flex-1">
      <p :class="['font-medium', todo.is_done ? 'line-through opacity-50' : '']">
        {{ todo.title }}
      </p>
      <p v-if="todo.description" class="text-sm opacity-70">
        {{ todo.description }}
      </p>
    </div>

    <button @click="emit('delete-todo', todo.id)" class="text-red-500 hover:text-red-700">
      ✕
    </button>
  </div>
</template>