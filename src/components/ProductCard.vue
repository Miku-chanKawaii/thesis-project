<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
    <div class="aspect-w-16 aspect-h-9 bg-gray-100">
      <img 
        v-if="product.thumbnail" 
        :src="product.thumbnail" 
        :alt="product.name"
        class="object-cover w-full h-full"
      />
      <div v-else class="flex items-center justify-center h-full text-gray-400">
        No image
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-medium text-gray-900">{{ product.name }}</h3>
      <p class="text-sm text-gray-500 mt-1">{{ product.creator }}</p>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-lg font-bold">${{ product.price }}</span>
        <button class="text-primary hover:text-opacity-80">View Details</button>
      </div>
    </div>
  </div>
</template>