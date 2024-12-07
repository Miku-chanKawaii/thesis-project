<script setup>
import { useCart } from '../composables/useCart';
import { useRouter } from 'vue-router';
import { pb } from '../lib/pocketbase';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const { addToCart } = useCart();
const router = useRouter();
const baseUrl = 'http://127.0.0.1:8090/api/files/products/';

function viewDetails() {
  router.push({ 
    name: 'ProductDetails', 
    params: { id: props.product.id } 
  });
};

function handleAddToCart(event) {
  event.stopPropagation();
  addToCart(props.product);
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
    <figure class="aspect-w-16 aspect-h-16 bg-gray-100">
      <img 
        v-if="product.thumbnail" 
        :src="`${baseUrl}${product.id}/${product.thumbnail}`" 
        :alt="product.name"
        class="img-fluid img-thumbnail"
      />
      <div v-else class="flex items-center justify-center h-full text-gray-400">
        No image
      </div>
    </figure>
    <div class="p-4">
      <h3 class="font-medium text-gray-900">{{ product.name }}</h3>
      <p class="text-sm text-gray-500 mt-1">{{ product.creator }}</p>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-lg font-bold">${{ product.price }}</span>
        <div class="space-x-2">
          <button 
            @click="handleAddToCart"
            class="text-primary hover:text-opacity-80"
          >
            Add to Cart
          </button>
          <button
            @click="viewDetails"
            class="text-primary hover:text-opacity-80"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>