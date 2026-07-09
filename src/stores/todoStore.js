import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabaseClient'

export const useTodoStore = defineStore('todo', () => {
    const todos = ref([])

    async function fetchTodos() {
        const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false})

        if (error) {
            console.error('Fehler beim Lden der To-Dos:', error)
            return
        }
        todos.value = data
    }
    async function addTodo(title, description = null, folderId = null) {
        const { data, error } = await supabase
        .from('todos')
        .insert({ title, description, folder_id: folderId})
        .select()

        if (error) {
            console.error('Fehler beim Erstellen des To-Dos:', error)
            return
        }
        todos.value.unshift(data[0])
    }

    async function toggleTodo(id) {
        const todo = todos.value.find(t => t.id === id)
        if (!todo) return

        const { error } = await supabase
        .from('todos')
        .update({ is_done: !todo.is_done })
        .eq('id', id)

        if (error) {
            console.error('Fehler beim Aktualisieren des To-Dos:', error)
            return
        }
        todo.is_done = !todo.is_done
    }

    async function deleteTodo(id) {
        const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

        if (error) {
            console.error('Fehler beim Löschen des To-Dos:', error)
            return
        }
        todos.value = todos.value.filter(t => t.id !== id)
    }
    return { todos, fetchTodos, addTodo, toggleTodo, deleteTodo}
})