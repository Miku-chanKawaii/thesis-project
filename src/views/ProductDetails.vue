<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProducts } from '../composables/useProducts';
import { useAuth } from '../composables/useAuth';

const route = useRoute();
const router = useRouter();
const { getProduct, purchaseProduct, isLoading, error } = useProducts();
const { isAuthenticated } = useAuth();

const product = ref(null);

async function loadProduct() {
  try {
    product.value = await getProduct(route.params.id);
  } catch (err) {
    router.push({ name: 'NotFound' });
  }
}

async function handlePurchase() {
  if (!isAuthenticated.value) {
    router.push({ 
      name: 'Login', 
      query: { redirect: route.fullPath } 
    });
    return;
  }

  try {
    await purchaseProduct(product.value.id);
    router.push({ name: 'UserLibrary' });
  } catch (err) {
    // Error handled by useProducts composable
  }
}

onMounted(loadProduct);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-gray-500">Loading product...</div>
    </div>

    <template v-else-if="product">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Product Image -->
          <div>
            <div class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
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
          </div>

          <!-- Product Info -->
          <div class="space-y-6">
            <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
            
            <div class="flex items-center space-x-4">
              <img 
                :src="product.creator.avatar || 'https://via.placeholder.com/40'" 
                :alt="product.creator.name"
                class="w-10 h-10 rounded-full"
              />
              <div>
                <p class="text-sm font-medium text-gray-900">{{ product.creator.name }}</p>
                <p class="text-sm text-gray-500">Creator</p>
              </div>
            </div>

            <p class="text-gray-600">{{ product.description }}</p>

            <div class="border-t border-b border-gray-200 py-4">
              <div class="text-3xl font-bold text-gray-900">${{ product.price }}</div>
            </div>

            <button
              @click="handlePurchase"
              :disabled="isLoading"
              class="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 disabled:opacity-50"
            >
              {{ isLoading ? 'Processing...' : 'Buy Now' }}
            </button>

            <div v-if="error" class="bg-red-50 p-4 rounded text-red-600">
              {{ error }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>