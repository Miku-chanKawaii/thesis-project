<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProducts } from '../composables/useProducts';
import { pb } from '../lib/pocketbase';


const route = useRoute();
const router = useRouter();
const { isLoading, error } = useProducts();
const baseUrl = 'http://127.0.0.1:8090/api/files/';

const product = ref(null);

pb.autoCancellation(false);

async function loadProduct() {
  try {
    product.value = await pb.collection('products').getOne(route.params.id, {
      expand: 'creator'
    });

  } catch (err) {
    router.push({ name: 'NotFound' });
  }
}
/*
async function getcreatorid() {
  const record = await pb.collection('products').getOne(route.params.id, {
    expand: 'creator',
  });
  const creatorId = record.creator;
  return { id: creatorId};
}

async function getloginid() {
  return { id: pb.authStore.model.id}
}

async function compareIds() {
  const creator = await getcreatorid();
  const loginid = await getloginid();
  console.log('creator', creator);
  console.log('id', loginid);

  if (creator.id === loginid.id) {
    return true;
  } else {
    return false;
  }
}
*/
//const torf = await compareIds();

//console.log('product', product);

/*
function editDetails() {
  router.push({ 
    name: 'EditProduct', 
    params: { id: 'kas8moo00u3ubn7' } 
  });
};
*/

function handleAddToCart(event) {
  event.stopPropagation();
  addToCart(props.product);
  router.push({ name: 'Cart' });
}

onMounted(loadProduct);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex justify-end">
      <button
        v-if="false"
        @click="editDetails"
        class="block bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 text-center"
      >
        Edit Details
      </button>
    </div>
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-gray-500">Loading product...</div>
    </div>

    <template v-else-if="product">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Product Image -->
          <div>
            <div class="aspect-w-16 aspect-h-16 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                v-if="product.thumbnail" 
                :src="`${baseUrl}products/${product.id}/${product.thumbnail}`" 
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
                :src="`${baseUrl}users/${product.creator}/${product.expand.creator.avatar}` || 'avatar.jpg'" 
                :alt="product.expand.creator.name"
                class="w-10 h-10 rounded-full"
              />
              <div>
                <p class="text-sm font-medium text-gray-900">{{ product.expand.creator.name }}</p>
                <p class="text-sm text-gray-500">Creator</p>
              </div>
            </div>

            <p v-html="product.description" class="text-gray-600"></p>

            <div class="border-t border-b border-gray-200 py-4">
              <div class="text-3xl font-bold text-gray-900">${{ product.price }}</div>
            </div>

            <button
              @click="handleAddToCart"
              :disabled="isLoading"
              class="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 disabled:opacity-50"
            >
              {{ isLoading ? 'Processing...' : 'Add to Cart Now' }}
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