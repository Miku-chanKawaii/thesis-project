<script setup>
import { onMounted } from 'vue';
import { useProducts } from '../composables/useProducts';
import { useAuth } from '../composables/useAuth';

const { items: products, isLoading, error, fetchProducts } = useProducts();
const { user } = useAuth();

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div v-if="error" class="bg-red-50 p-4 rounded text-red-600 mb-4">
          {{ error }}
        </div>

        <div v-if="isLoading" class="text-center">
          Loading...
        </div>

        <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="product in products" :key="product.id" class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{ product.name }}</h3>
                  <p class="text-sm text-gray-500">{{ product.description }}</p>
                </div>
                <div class="text-lg font-medium text-gray-900">
                  ${{ product.price }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>