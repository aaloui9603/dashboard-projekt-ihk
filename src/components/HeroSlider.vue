<script setup>
import { ref } from 'vue'
import heroImage from '../assets/hero.webp'
import heroImage2 from '../assets/hero2.webp'
import heroImage3 from '../assets/hero3.webp'

const images = [
  { src: heroImage, alt: 'Projektmanagement Hero-Bild' },
  { src: heroImage2, alt: 'Projektmanagement Dashboard-Bild' },
  { src: heroImage3, alt: 'Projektmanagement Checkliste' }
]

const currentIndex = ref(0)

function next() {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

function goTo(index) {
  currentIndex.value = index
}
</script>

<template>
  <div class="relative w-full max-w-2xl mx-auto mt-4 rounded-2xl overflow-hidden shadow-md">
    <div class="overflow-hidden">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <img
          v-for="(img, index) in images"
          :key="index"
          :src="img.src"
          :alt="img.alt"
          class="w-full h-auto object-contain shrink-0"
        />
      </div>
    </div>

    <button
      v-if="images.length > 1"
      @click="prev"
      class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-md bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60"
    >
      ‹
    </button>
    <button
      v-if="images.length > 1"
      @click="next"
      class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-md bg-white/40 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60"
    >
      ›
    </button>

    <div v-if="images.length > 1" class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
      <button
        v-for="(img, index) in images"
        :key="index"
        @click="goTo(index)"
        :class="['w-2 h-2 rounded-full', index === currentIndex ? 'bg-white' : 'bg-white/50']"
      ></button>
    </div>
  </div>
</template>
