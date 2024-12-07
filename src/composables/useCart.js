import { ref, computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { pb } from '../lib/pocketbase';

export function useCart() {
  const items = useLocalStorage('cart-items', []);
  const isLoading = ref(false);
  const error = ref(null);

  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  });

  function addToCart(product) {
    if (!items.value.find(item => item.id === product.id)) {
      items.value.push(product);
    }
  }

  async function checkoutSales(sdata) {
    isLoading.value = true;
    error.value = null;
    
    try {
      await pb.collection('sales').create(sdata);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  async function checkoutPurchases(pdata) {
    isLoading.value = true;
    error.value = null;
    
    try {
      await pb.collection('purchases').create(pdata);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(item => item.id !== productId);
  }

  function clearCart() {
    items.value = [];
  }

  return {
    items,
    total,
    isLoading,
    error,
    addToCart,
    checkoutSales,
    checkoutPurchases,
    removeFromCart,
    clearCart
  };
}