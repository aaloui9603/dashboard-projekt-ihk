<script setup>
import { computed } from 'vue'
import { useFolderStore } from '../stores/folderStore.js'
import { getTextColorClass } from '../utils/colorUtils.js'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete-note'])

const folderStore = useFolderStore()

const folder = computed(() =>
  folderStore.folders.find(f => f.id === props.note.folder_id)
)

const textColorClass = computed(() => getTextColorClass(props.note.color))
</script>

<template>
  <div
    class="rounded-2xl px-4 py-3 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-md"
    :style="{ backgroundColor: `var(--color-${note.color.toLowerCase()})` }"
  >
    <div class="flex items-start justify-between gap-2">
      <div class="flex items-center gap-2">
        <span
          v-if="folder"
          class="w-3 h-3 rounded-full shrink-0"
          :style="{ backgroundColor: `var(--color-${folder.color.toLowerCase()})` }"
          :title="folder.title"
        ></span>
        <h3 :class="['font-semibold', textColorClass]">{{ note.title }}</h3>
      </div>
      <button @click="emit('delete-note', note.id)" class="text-red-600 hover:text-red-800">
        ✕
      </button>
    </div>
    <p v-if="note.description" :class="['text-sm mt-1', textColorClass]">
      {{ note.description }}
    </p>
  </div>
</template>