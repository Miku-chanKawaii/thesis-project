import { ref } from 'vue';
import { pb } from '../lib/pocketbase';
import { userId } from './useID';

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
      items.value = response.items
        .filter(item => item.user === userId)
        .map(item => ({
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