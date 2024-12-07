<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts } from '../../composables/useProducts';
import ProductCard from '../../components/ProductCard.vue';
import { pb } from '../../lib/pocketbase';


const router = useRouter();
const { items: products, isLoading, error, fetchProducts } = useProducts();

function handleNewProduct() {
  router.push({ name: 'NewProduct' });
}
//console.log('product ',products);

//console.log('id', pb.authStore.model.id);

// Filter products by user Id
const filteredproducts = computed(() => {
  if (!products.value) return [];
  return products.value.filter(product => product.creatorid === pb.authStore.model.id);
});

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Your Products</h2>
      <button 
        @click="handleNewProduct"
        class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
      >
        New Product
      </button>
    </div>

    <div v-if="error" class="bg-red-50 p-4 rounded text-red-600 mb-6">
      {{ error }}
    </div>

    <div v-if="isLoading" class="text-center py-12">
      <div class="text-gray-500">Loading products...</div>
    </div>

    <div v-else-if="products.length === 0" class="bg-white shadow-sm rounded-lg p-12 text-center">
      <h3 class="text-xl text-gray-500">You haven't created any products yet</h3>
      <button 
        @click="handleNewProduct"
        class="mt-4 text-primary hover:text-opacity-80"
      >
        Create your first product
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProductCard 
        v-for="product in filteredproducts" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>