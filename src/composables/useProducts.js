import { ref } from 'vue';
import { products } from '../lib/pocketbase';

export function useProducts() {
  const items = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  
  async function fetchProducts() {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await products.getAll();
      items.value = response.items
        .map(item => ({
          id: item.id,
          category: item.category,
          name: item.name,
          thumbnail: item.thumbnail,
          creator: item.expand.creator.name,
          price: item.price,
          creatorid: item.creator,
          description: item.description,
          contentid: item.content,
        }));
      //console.log('response ',response.items);
      //console.log('items ',items.value);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function createProduct(productData) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const product = await products.create(productData);
      items.value.unshift(product);
      return product;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }
  
  return {
    items,
    isLoading,
    error,
    fetchProducts,
    createProduct,
  };
}