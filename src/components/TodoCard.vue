<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle-todo', 'delete-todo'])
</script>

<template>
  <div class="flex items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 shadow-md">
    <input
      type="checkbox"
      :checked="todo.is_done"
      @change="emit('toggle-todo', todo.id)"
      class="w-5 h-5"
    />

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