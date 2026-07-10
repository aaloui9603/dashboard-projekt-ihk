<script setup>
import { onMounted, ref } from 'vue'
import { useNoteStore } from '../stores/noteStore.js'
import { useFolderStore } from '../stores/folderStore.js'
import NoteCard from './NoteCard.vue'

const noteStore = useNoteStore()
const folderStore = useFolderStore()

const newTitle = ref('')
const newDescription = ref('')
const selectedColor = ref('DodgerBlue')
const selectedFolderId = ref(null)
const selectedFile = ref(null)

const noteColors = [
  'DodgerBlue', 'VioletRed', 'Gold', 'OrangeRed', 'Gray', 'Pink', 'Turquoise'
]

onMounted(() => {
  noteStore.fetchNotes()
  folderStore.fetchFolders()
})

function handleFileChange(event) {
  selectedFile.value = event.target.files[0] || null
}

async function handleAdd() {
  if (!newTitle.value.trim()) return

  let fileUrl = null
  if (selectedFile.value) {
    fileUrl = await noteStore.uploadFile(selectedFile.value)
  }

  noteStore.addNote(newTitle.value, newDescription.value, selectedColor.value, selectedFolderId.value, fileUrl)
  newTitle.value = ''
  newDescription.value = ''
  selectedFile.value = null
}
</script>

<template>
  <div class="max-w-xl mx-auto mt-8 px-4 space-y-4">
    <form @submit.prevent="handleAdd" class="space-y-3">
      <input
        v-model="newTitle"
        type="text"
        placeholder="Notiz-Titel..."
        class="w-full rounded-xl px-4 py-2 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10"
      />

      <textarea
        v-model="newDescription"
        placeholder="Notiz-Inhalt (optional)..."
        rows="2"
        class="w-full rounded-xl px-4 py-2 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10"
      ></textarea>

      <div class="flex flex-wrap items-center gap-3">
        <label
          for="file-upload"
          class="cursor-pointer rounded-xl px-4 py-2 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 hover:bg-white/40 dark:hover:bg-black/40 transition"
        >
          Datei auswaehlen
        </label>
        <input
          id="file-upload"
          type="file"
          @change="handleFileChange"
          class="hidden"
        />
        <span v-if="selectedFile" class="text-sm opacity-70 truncate">
          {{ selectedFile.name }}
        </span>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in noteColors"
          :key="color"
          type="button"
          @click="selectedColor = color"
          :style="{ backgroundColor: `var(--color-${color.toLowerCase()})` }"
          :class="['w-8 h-8 rounded-full border-2', selectedColor === color ? 'border-black dark:border-white' : 'border-transparent']"
        ></button>
      </div>

      <select
        v-model="selectedFolderId"
        class="w-full rounded-xl px-3 py-2 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10"
      >
        <option :value="null">Kein Ordner</option>
        <option v-for="folder in folderStore.folders" :key="folder.id" :value="folder.id">
          {{ folder.title }}
        </option>
      </select>

      <button
        type="submit"
        class="rounded-xl px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Notiz hinzufuegen
      </button>
    </form>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NoteCard
        v-for="note in noteStore.notes"
        :key="note.id"
        :note="note"
        @delete-note="noteStore.deleteNote"
      />
    </div>
  </div>
</template>
