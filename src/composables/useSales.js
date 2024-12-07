import { ref, computed } from 'vue';
import { pb } from '../lib/pocketbase';

export function useSales() {
  const sales = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  
  const lastSevenDays = computed(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return sales.value
      .filter(sale => new Date(sale.created) > sevenDaysAgo)
      .reduce((total, sale) => total + sale.price, 0)
      .toFixed(2);
  });
  
  const totalEarnings = computed(() => {
    return sales.value.reduce((total, sale) => total + sale.price, 0).toFixed(2);
  });
  
  async function fetchSales() {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await pb.collection('sales').getList(1, 50, {
        sort: '-created',
        expand: 'user,product,buyer',
      });
      sales.value = response.items
        .map(item => ({
          id: item.id,
          name: item.expand.product.name,
          email: item.expand.buyer.email,
          price: item.price,
          created: item.created,
          user: item.expand.user.id,
        }))
        .filter(filtersale => filtersale.user === pb.authStore.model.id);

      //console.log('id',pb.authStore.model.id);
      //console.log('response', response);
      //console.log('sales', sales.value);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }
  
  return {
    sales,
    lastSevenDays,
    totalEarnings,
    isLoading,
    error,
    fetchSales,
  };
}