<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '../stores/todoStore.js'
import TodoCard from './TodoCard.vue'

const todoStore = useTodoStore()
const newTitle = ref('')

onMounted(() => {
  todoStore.fetchTodos()
})

function handleAdd() {
  if (!newTitle.value.trim()) return
  todoStore.addTodo(newTitle.value)
  newTitle.value = ''
}
</script>

<template>
  <div class="max-w-xl mx-auto mt-8 space-y-4">
    <form @submit.prevent="handleAdd" class="flex gap-2">
      <input
        v-model="newTitle"
        type="text"
        placeholder="Neues To-Do..."
        class="flex-1 rounded-xl px-4 py-2 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10"
      />
      <button
        type="submit"
        class="rounded-xl px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Hinzufügen
      </button>
    </form>

    <TodoCard
      v-for="todo in todoStore.todos"
      :key="todo.id"
      :todo="todo"
      @toggle-todo="todoStore.toggleTodo"
      @delete-todo="todoStore.deleteTodo"
    />
  </div>
</template>