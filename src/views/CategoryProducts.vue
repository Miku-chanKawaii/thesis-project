<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCategories } from '../composables/useCategories';
import { useProducts } from '../composables/useProducts';
import ProductCard from '../components/ProductCard.vue';

const route = useRoute();
const { getCategoryById } = useCategories();
const { items: allProducts, isLoading, error, fetchProducts } = useProducts();

const category = getCategoryById(route.params.category);

// Filter products by category
const products = computed(() => {
  if (!allProducts.value) return [];
  return allProducts.value.filter(product => product.category === route.params.category);
});

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center space-x-2">
          <router-link 
            to="/discover" 
            class="text-gray-500 hover:text-gray-700"
          >
            Discover
          </router-link>
          <span class="text-gray-500">/</span>
          <h1 class="text-3xl font-bold text-gray-900">{{ category?.name }}</h1>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div v-if="error" class="bg-red-50 p-4 rounded text-red-600 mb-8">
        {{ error }}
      </div>

      <div v-if="isLoading" class="text-center py-12">
        <div class="text-gray-500">Loading products...</div>
      </div>

      <div v-else-if="products.length === 0" class="text-center py-12">
        <h2 class="text-xl text-gray-500">No products found in this category</h2>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </main>
  </div>
</template>