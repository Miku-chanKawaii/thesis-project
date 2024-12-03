import { ref, computed } from 'vue';
import { useProducts } from './useProducts';

export function useSearch() {
  const { items: allProducts, fetchProducts } = useProducts();
  const searchQuery = ref('');
  const isLoading = ref(false);
  const error = ref(null);

  const searchResults = computed(() => {
    if (!searchQuery.value) return [];
    
    const query = searchQuery.value.toLowerCase();
    return allProducts.value.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  async function performSearch() {
    isLoading.value = true;
    error.value = null;
    
    try {
      await fetchProducts();
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    searchQuery,
    searchResults,
    isLoading,
    error,
    performSearch
  };
}