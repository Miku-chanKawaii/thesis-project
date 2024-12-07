<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProducts } from '../../composables/useProducts';
import { pb } from '../../lib/pocketbase';

const route = useRoute();
const router = useRouter();
const { isLoading, error } = useProducts();
const baseUrl = 'http://127.0.0.1:8090/api/files/';

const product = ref(null);

async function loadProduct() {
  try {
    product.value = await pb.collection('products').getOne('do34efk0fb31xuw', {
      expand: 'content'
    });
  } catch (err) {
    router.push({ name: 'NotFound' });
  }
}


onMounted(loadProduct);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div v-if="error" class="bg-red-50 p-4 rounded text-red-600 mb-6">
        {{ error }}
      </div>

      <div v-if="isLoading" class="text-center py-12">
        <div class="text-gray-500">Loading product content...</div>
      </div>

      <template v-else-if="product">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <router-link :to="{ name: 'UserLibrary' }">Library</router-link>
            <span>/</span>
            <span>{{ product.name }}</span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">{{ product.name }} - Content</h1>
        </div>

        <!-- Content -->
        <div class="bg-white rounded-lg shadow-sm">
          <!-- Content Files -->
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Content Files</h2>
            <div v-if="product.expand.content" class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <span class="text-gray-500">📦</span>
                  <span class="text-sm text-gray-900">{{ product.expand.content.file }}</span>
                </div>
                <a
                  :href="`${baseUrl}content/${product.expand.content.id}/${product.expand.content.file}`"
                  download
                  class="text-primary hover:text-opacity-80"
                >
                  Download
                </a>
              </div>
            </div>
            <p v-else class="text-gray-500">No files available</p>
          </div>

          <!-- Content Description -->
          <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Content Description</h2>
            <div v-html="product.expand.content.description" class="prose max-w-none"></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>