import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabaseClient'

export const useNoteStore = defineStore('note', () => {
    const notes = ref([])

    async function fetchNotes() {
        const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false})

        if (error) {
            console.error('Fehler beim Laden der Notizen:', error)
            return
        }
        notes.value = data
    }

    async function addNote(title, description, color) {
        const { data, error } = await supabase 
        .from('notes')
        .insert({ title, description, color })
        .select()

        if (error) {
            console.error('Fehler beim Erstellen der Notizen:', error)
            return
        }
        notes.value.unshift(data[0])
    }
    
    async function deleteNote(id) {
        const { error } = await supabase 
        .from('notes')
        .delete()
        .eq('id', id)

        if (error) {
            console.error('Fehler beim Löschen der Notiz:', error)
            return
        }
        notes.value = notes.value.filter(n => n.id !== id)
    }

    return { notes, fetchNotes, addNote, deleteNote }
})