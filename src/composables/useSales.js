import { ref, computed } from 'vue';
import { pb } from '../lib/pocketbase';

export function useSales() {
  const sales = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  
  const balance = computed(() => {
    return sales.value.reduce((total, sale) => total + sale.amount, 0).toFixed(2);
  });
  
  const lastSevenDays = computed(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return sales.value
      .filter(sale => new Date(sale.created) > sevenDaysAgo)
      .reduce((total, sale) => total + sale.amount, 0)
      .toFixed(2);
  });
  
  const totalEarnings = computed(() => {
    return sales.value.reduce((total, sale) => total + sale.amount, 0).toFixed(2);
  });
  
  async function fetchSales() {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await pb.collection('sales').getList(1, 50, {
        sort: '-created',
        expand: 'product,buyer',
      });
      sales.value = response.items;
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }
  
  return {
    sales,
    balance,
    lastSevenDays,
    totalEarnings,
    isLoading,
    error,
    fetchSales,
  };
}