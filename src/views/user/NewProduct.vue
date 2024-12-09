<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts } from '../../composables/useProducts';
import ProductBasicInfo from '../../components/product/ProductBasicInfo.vue';
import ProductContent from '../../components/product/ProductContent.vue';

const router = useRouter();
const { createProduct, isLoading, error } = useProducts();

const activeTab = ref('basic');
const productData = ref({
  name: '',
  catalogue: '',
  description: '',
  price: 0,
  thumbnail: null,
  content: {
    files: [],
    description: '',
  },
});



async function handleSubmit() {
  try {
    await createProduct(productData.value);
    router.push({ name: 'UserProducts' });
  } catch (err) {
    // Error handled by useProducts composable
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">New Product</h1>
      <button
        @click="handleSubmit"
        :disabled="isLoading"
        class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50"
      >
        {{ isLoading ? 'Creating...' : 'Create Product' }}
      </button>
    </div>

    <div v-if="error" class="bg-red-50 p-4 rounded text-red-600">
      {{ error }}
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          @click="activeTab = 'basic'"
          class="py-4 px-1 border-b-2 font-medium text-sm"
          :class="[
            activeTab === 'basic'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Product
        </button>
        <button
          @click="activeTab = 'content'"
          class="py-4 px-1 border-b-2 font-medium text-sm"
          :class="[
            activeTab === 'content'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Content
        </button>
      </nav>
    </div>

    <!-- Tab Panels -->
    <div class="mt-6">
      <ProductBasicInfo
        v-if="activeTab === 'basic'"
        v-model="productData"
      />
      <ProductContent
        v-else
        v-model="productData.content"
      />
    </div>
  </div>
</template>