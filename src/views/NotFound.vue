<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  router.back();
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">Page not found</p>
      <div class="space-x-4">
        <button
          @click="goBack"
          class="text-primary hover:text-opacity-80"
        >
          Go back
        </button>
        <router-link
          to="/"
          class="text-primary hover:text-opacity-80"
        >
          Go home
        </router-link>
      </div>
    </div>
  </div>
</template>