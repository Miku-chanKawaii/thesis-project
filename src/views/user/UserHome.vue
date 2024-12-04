<script setup>
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';

const { user } = useAuth();
const baseUrl = 'http://127.0.0.1:8090/api/files/users/';
</script>

<template>
  <div v-if="!user">
    <p>Loading your profile...</p>
  </div>
  <div v-else class="bg-white shadow-sm rounded-lg p-6">
    <div class="flex items-start space-x-6">
      <div class="flex-shrink-0">
        <img 
          :src="user.avatar ? `${baseUrl}${user.id}/${user.avatar}?thumb=128x128` : '/avatar.jpg'" 
          alt="Profile"
          class="w-32 h-32 rounded-full object-cover"
        />
      </div>
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-gray-900">{{ user.name || 'Your Name' }}</h1>
        <p v-html=user.biography class="mt-2 text-gray-600"></p>
      </div>
    </div>
  </div>
</template>
