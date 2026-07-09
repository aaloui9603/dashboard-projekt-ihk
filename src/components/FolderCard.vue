<script setup>
defineProps({
    folder: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['delete-folder'])
</script>

<template>
    <div
        class="flex items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-md border-white/40 dark:border-white/10 shadow-md"
        :style="{ backgroundColor: `var(--color-${folder.color.toLowerCase()})`}"
        >
            <span class="font-medium text-gray-900">{{ folder.title }}</span>
            <button @click="emit('delete-folder', folder.id)" class="text-red-600 hover:text-red-800">
                x 
            </button>
    </div>
</template>