<script setup>
import { onMounted, ref } from 'vue'
import { useFolderStore } from '../stores/folderStore.js'
import FolderCard from './FolderCard.vue'

const folderStore = useFolderStore()
const newTitle = ref('')
const selectedColor = ref('SkyBlue1')

const folderColors = [
  'SkyBlue1', 'SkyBlue2', 'SkyBlue3',
  'Turquoise1', 'Turquoise2', 'Turquoise3',
  'LightPink1', 'LightPink2', 'LightPink3',
  'SlateGray1', 'SlateGray2', 'SlateGray3',
  'SeaGreen1', 'SeaGreen2', 'SeaGreen3'
]

onMounted(() => {
  folderStore.fetchFolders()
})

function handleAdd() {
  if (!newTitle.value.trim()) return
  folderStore.addFolder(newTitle.value, selectedColor.value)
  newTitle.value = ''
}
</script>

<template>
  <div class="max-w-xl mx-auto mt-8 space-y-4">
    <form @submit.prevent="handleAdd" class="space-y-3">
      <input
        v-model="newTitle"
        type="text"
        placeholder="Neuer Ordner..."
        class="w-full rounded-xl px-4 py-2 backdrop-blur-md bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10"
      />

      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in folderColors"
          :key="color"
          type="button"
          @click="selectedColor = color"
          :style="{ backgroundColor: `var(--color-${color.toLowerCase()})` }"
          :class="['w-8 h-8 rounded-full border-2', selectedColor === color ? 'border-black dark:border-white' : 'border-transparent']"
        ></button>
      </div>

      <button
        type="submit"
        class="rounded-xl px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Ordner hinzufügen
      </button>
    </form>

    <FolderCard
      v-for="folder in folderStore.folders"
      :key="folder.id"
      :folder="folder"
      @delete-folder="folderStore.deleteFolder"
    />
  </div>
</template>