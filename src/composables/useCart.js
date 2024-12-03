import { ref, computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';

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
    removeFromCart,
    clearCart
  };
}