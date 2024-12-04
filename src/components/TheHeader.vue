<script setup>
import { ref, watch } from 'vue';
import { useAuth } from '../composables/useAuth';
import { pb } from '../lib/pocketbase';

const { logout } = useAuth();
const isMenuOpen = ref(false);


</script>

<template>
  <header class="border-b border-gray-200">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-8">
        <router-link to="/" class="text-2xl font-bold">Gum</router-link>
        <div class="hidden md:flex space-x-6">
          <router-link to="/discover" class="text-gray-600 hover:text-black">Discover</router-link>
          <router-link to="/search" class="text-gray-600 hover:text-black">Search</router-link>
          <router-link to="/cart" class="text-gray-600 hover:text-black">Cart</router-link>
        </div>
      </div>
      
      <div class="hidden md:flex items-center space-x-4">
        <router-link v-if="!pb.authStore.isValid" to="/login" class="text-gray-600 hover:text-black">Login</router-link>
        <router-link v-if="!pb.authStore.isValid" to="/register" class="text-gray-600 hover:text-black">Register</router-link>
        <router-link v-if="pb.authStore.isValid" @click="logout" to="/login" class="text-gray-600 hover:text-black">Logout</router-link>
        <router-link to="/user" class="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90">
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
      <div class="px-4 py-2 space-y-2">
        <router-link to="/discover" class="block text-gray-600 hover:text-black">Discover</router-link>
        <router-link to="/search" class="block text-gray-600 hover:text-black">Search</router-link>
        <router-link v-if="!pb.authStore.isValid" to="/login" class="block text-gray-600 hover:text-black">Login</router-link>
        <button v-if="pb.authStore.isValid" @click="logout" class="block text-gray-600 hover:text-black">Logout</button>
        <router-link to="/user" class="block bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 text-center">
          Start Selling
        </router-link>
      </div>
    </div>
  </header>
</template>
