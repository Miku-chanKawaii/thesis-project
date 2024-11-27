<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth';

const { logout, isAuthenticated } = useAuth()
const isMenuOpen = ref(false)

</script>

<template>
  <header class="border-b border-gray-200">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-8">
        <a href="/" class="text-2xl font-bold">Gum</a>
        <div class="hidden md:flex space-x-6">
          <router-link to="/discover" class="text-gray-600 hover:text-black">Discover</router-link>
        </div>
      </div>
      
      <div v-if="isAuthenticated" class="hidden md:flex items-center space-x-4">
        <a href="/" @click="logout" class="text-gray-600 hover:text-black">Logout</a>
        <router-link to="/user" class="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90">
          Home
        </router-link>
      </div>
      <div v-else class="hidden md:flex items-center space-x-4">
        <router-link to="/login" class="text-gray-600 hover:text-black">Login</router-link>
        <router-link to="/register" class="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90">
          Start Selling
        </router-link>
      </div>

      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-16 6h16"></path>
        </svg>
      </button>
    </nav>

    <div v-if="isMenuOpen" class="md:hidden">
      <div v-if="isAuthenticated" class="px-4 py-2 space-y-2">
        <router-link to="/discover" class="block text-gray-600 hover:text-black">Discover</router-link>
        <a href="/" @click="logout" class="block text-gray-600 hover:text-black">Logout</a>
        <router-link to="/user" class="block bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 text-center">
          Home
        </router-link>
      </div>
      <div v-else class="px-4 py-2 space-y-2">
        <router-link to="/discover" class="block text-gray-600 hover:text-black">Discover</router-link>
        <router-link to="/login" class="block text-gray-600 hover:text-black">Login</router-link>
        <router-link to="/register" class="block bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 text-center">
          Start Selling
        </router-link>
      </div>
    </div>
  </header>
</template>