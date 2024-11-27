<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <router-link 
    :to="{ name: 'CategoryProducts', params: { category: category.id }}"
    class="block group"
  >
    <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-center">
      <div class="text-4xl mb-3">{{ category.icon }}</div>
      <h3 class="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors">
        {{ category.name }}
      </h3>
    </div>
  </router-link>
</template>