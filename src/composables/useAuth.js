import { ref, computed } from 'vue';
import { pb, getCurrentUser, isUserValid } from '../lib/pocketbase';

export function useAuth() {
  const isLoading = ref(false);
  const error = ref(null);
  
  const isAuthenticated = computed(() => isUserValid());
  const user = computed(() => getCurrentUser());
  
  async function login(email, password) {
    isLoading.value = true;
    error.value = null;
    
    try {
      await pb.collection('users').authWithPassword(email, password);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }
  
  async function register(email, password, passwordConfirm) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = {
        email,
        password,
        passwordConfirm,
      };
      await pb.collection('users').create(data);
      await login(email, password);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }
  
  function logout() {
    pb.authStore.clear();
  }
  
  return {
    isLoading,
    error,
    isAuthenticated,
    user,
    login,
    register,
    logout,
  };
}