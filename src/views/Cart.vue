<script setup>
import { ref, computed } from 'vue';
import { useCart } from '../composables/useCart';
import { useRouter } from 'vue-router';
import { pb } from '../lib/pocketbase';

const { items, total, removeFromCart, clearCart } = useCart();
const router = useRouter();
const baseUrl = 'http://127.0.0.1:8090/api/files/products/';
const sdata = ref([""]);
const pdata = ref([""]);
const isLoading = ref(false);
const error = ref(null);

sdata.value = computed(() => {
  return items.value.map(item => ({
    user: item.creatorid,
    product: item.id,
    buyer: pb.authStore.model.id,
    price: item.price,
  }))
});

 pdata.value = computed(() => {
  return items.value.map(item => ({
    user: pb.authStore.model.id,
    product: item.id,
    content: item.contentid,
  }))
});



async function handleCheckout() {
  isLoading.value = true;
  error.value = null;

  pb.autoCancellation(false);
  try {
    sdata.value.value.forEach(async (item) => {
      await pb.collection('sales').create(item);
    });
    pdata.value.value.forEach(async (item) => {
      await pb.collection('purchases').create(item);
    });
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    };
  clearCart();
  router.push('/user/library');
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div v-if="items.length === 0" class="text-center py-12 bg-white rounded-lg shadow-sm">
        <p class="text-gray-500">Your cart is empty</p>
        <router-link 
          to="/discover" 
          class="mt-4 text-primary hover:text-opacity-80 inline-block"
        >
          Browse products
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div 
            v-for="item in items" 
            :key="item.id"
            class="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4"
          >
            <img 
              :src="`${baseUrl}${item.id}/${item.thumbnail}`" 
              :alt="item.name"
              class="w-20 h-20 object-cover rounded-lg"
            />
            <div class="flex-1">
              <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
              <p v-html="item.description" class="text-gray-500"></p>
            </div>
            <div class="text-right">
              <p class="font-bold">${{ item.price }}</p>
              <button 
                @click="removeFromCart(item.id)"
                class="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white rounded-lg shadow-sm p-6 h-fit">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          <div class="border-t border-b border-gray-200 py-4 mb-4">
            <div class="flex justify-between">
              <span class="font-medium">Total</span>
              <span class="font-bold">${{ total }}</span>
            </div>
          </div>
          <button
            @click="handleCheckout"
            class="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>