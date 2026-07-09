import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabaseClient'

export const useFolderStore = defineStore('folder', () => {
    const folders = ref([])

    async function fetchFolders() {
        const { data, error } = await supabase
        .from('folders')
        .select('*')
        .order('created_at', { ascending: false})

        if (error) {
            console.error('Fehler beim Laden der Ordner:', error)
            return
        }
        folderStore.value = data
    }

    async function addFolder(title, color) {
        const { data, error } = await supabase 
        .from('folders')
        .insert({ title, color})
        .select()

        if (error) {
            console.error('Fehler beim Erstellen des Ordners:', error)
            return
        }
        folders.value.unshift(data[0])
    }

    async function deleteFolder(id) {
        const { error } = await supabase
        .from('folders')
        .delete()
        .eq('id', id)

        if (error) {
            console.error('Fehler beim Löschen der Ordner:', error)
            return
        }
        folders.value = data 
    }

    return { folders, fetchFolders, addFolder, deleteFolder}
})