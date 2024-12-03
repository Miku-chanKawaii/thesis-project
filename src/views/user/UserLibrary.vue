<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLibrary } from '../../composables/useLibrary';

const router = useRouter();
const { items: purchases, isLoading, error, fetchPurchases } = useLibrary();

function viewContent(productId) {
  router.push({ 
    name: 'ProductContent', 
    params: { id: productId } 
  });
}

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

    <div v-else class="space-y-4">
      <div 
        v-for="product in purchases" 
        :key="product.id"
        class="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-4">
              <img 
                v-if="product.thumbnail"
                :src="product.thumbnail"
                :alt="product.name"
                class="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 class="font-medium text-gray-900">{{ product.name }}</h3>
                <p class="text-sm text-gray-500">{{ product.description }}</p>
              </div>
            </div>
            <button
              @click="viewContent(product.id)"
              class="text-primary hover:text-opacity-80"
            >
              View Content
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>