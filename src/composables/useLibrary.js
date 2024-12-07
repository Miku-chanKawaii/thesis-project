import { ref } from 'vue';
import { pb } from '../lib/pocketbase';

export function useLibrary() {
  const items = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  
  async function fetchPurchases() {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await pb.collection('purchases').getList(1, 50, {
        sort: '-created',
        expand: 'product',
        filter: `user = "${pb.authStore.model.id}"`,
      });
      //console.log('user ',pb.authStore.model);
      //console.log('use ',response.items);
      items.value = response.items
        .map(item => ({
          id: item.expand.product.id,
          thumbnail: item.expand.product.thumbnail,
          name: item.expand.product.name,
          description: item.expand.product.description,
        }));
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }
  
  return {
    items,
    isLoading,
    error,
    fetchPurchases,
  };
}