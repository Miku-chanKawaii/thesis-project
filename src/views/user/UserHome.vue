<script setup>
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';

const { user } = useAuth();
</script>

<template>
  <div class="bg-white shadow-sm rounded-lg p-6">
    <div class="flex items-start space-x-6">
      <div class="flex-shrink-0">
        <img 
          :src="user?.avatar || 'https://via.placeholder.com/128'" 
          alt="Profile"
          class="w-32 h-32 rounded-full object-cover"
        />
      </div>
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-gray-900">{{ user?.name || 'Your Name' }}</h1>
        <p class="mt-2 text-gray-600">
          {{ user?.biography || 'Tell us about yourself...' }}
        </p>
      </div>
    </div>
  </div>
</template>