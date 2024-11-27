<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentRoute = computed(() => route.name);

const navItems = [
  { name: 'UserHome', label: 'Home', icon: '🏠' },
  { name: 'UserProducts', label: 'Products', icon: '📦' },
  { name: 'UserSales', label: 'Sales', icon: '💰' },
  { name: 'UserLibrary', label: 'Library', icon: '📚' },
  { name: 'UserSettings', label: 'Settings', icon: '⚙️' },
];
</script>

<template>
  <nav class="bg-white shadow-sm rounded-lg p-4">
    <div class="space-y-2">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="{ name: item.name }"
        class="flex items-center px-4 py-2 rounded-lg transition-colors"
        :class="{
          'bg-primary text-white': currentRoute === item.name,
          'text-gray-600 hover:bg-gray-50': currentRoute !== item.name
        }"
      >
        <span class="mr-3">{{ item.icon }}</span>
        {{ item.label }}
      </router-link>
    </div>
  </nav>
</template>