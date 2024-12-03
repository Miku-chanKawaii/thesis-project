import { ref, computed } from 'vue';
import { pb } from '../lib/pocketbase';
import { userId } from './useID';

export function useAuth() {
  const isLoading = ref(false);
  const error = ref(null);
  
  // Computed states for authentication status and user information
  const isAuthenticated = computed(() => !!pb.authStore.isValid);
  const user = computed(() => pb.authStore.model);
  
  // Function to log in the user
  async function login(email, password) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      userId.value = authData.record.id;
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }
  
  // Function to register a new user and automatically log them in
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
  
  // Function to log out the user
  function logout() {
    pb.authStore.clear();
    userId.value = null;
    router.push({ name: 'Login' });
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