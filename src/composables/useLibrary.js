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
      });
      items.value = response.items;
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