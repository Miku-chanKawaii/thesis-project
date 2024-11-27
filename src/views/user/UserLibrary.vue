<script setup>
import { ref, onMounted } from 'vue';
import { useLibrary } from '../../composables/useLibrary';
import ProductCard from '../../components/ProductCard.vue';

const { items: purchases, isLoading, error, fetchPurchases } = useLibrary();

onMounted(() => {
  fetchPurchases();
});
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Your Library</h2>

    <div v-if="error" class="bg-red-50 p-4 rounded text-red-600 mb-6">
      {{ error }}
    </div>

    <div v-if="isLoading" class="text-center py-12">
      <div class="text-gray-500">Loading purchases...</div>
    </div>

    <div v-else-if="purchases.length === 0" class="bg-white shadow-sm rounded-lg p-12 text-center">
      <h3 class="text-xl text-gray-500">You haven't purchased any products yet</h3>
      <router-link 
        to="/discover" 
        class="mt-4 text-primary hover:text-opacity-80 inline-block"
      >
        Browse products
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProductCard 
        v-for="product in purchases" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>