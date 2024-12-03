<script setup>
import { onMounted } from 'vue';
import { useSearch } from '../composables/useSearch';
import SearchBar from '../components/SearchBar.vue';
import ProductCard from '../components/ProductCard.vue';

const { 
  searchQuery, 
  searchResults, 
  isLoading, 
  error, 
  performSearch 
} = useSearch();

onMounted(performSearch);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Search Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Search Products</h1>
        <SearchBar
          v-model="searchQuery"
          @search="performSearch"
        />
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-50 p-4 rounded-lg text-red-600 mb-6">
        {{ error }}
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="text-gray-500">Searching products...</div>
      </div>

      <!-- Search Results -->
      <template v-else>
        <!-- No Query -->
        <div v-if="!searchQuery" class="text-center py-12">
          <p class="text-gray-500">Enter a search term to find products</p>
        </div>

        <!-- No Results -->
        <div v-else-if="searchResults.length === 0" class="text-center py-12">
          <p class="text-gray-500">No products found for "{{ searchQuery }}"</p>
        </div>

        <!-- Results Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in searchResults"
            :key="product.id"
            :product="product"
          />
        </div>
      </template>
    </div>
  </div>
</template>