import { ref, computed } from 'vue';
import { pb } from '../lib/pocketbase';

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
      localStorage.removeItem('pocketbase_auth');
      localStorage.removeItem('cart-items');
      console.log('Invalid PocketBase auth token and cart item cleared from localStorage.');
      await pb.collection('users').authWithPassword(email, password);
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
    router.push({ name: 'Login' });
  }

  // Function to update the user profile
  async function updateProfile({ name, biography, avatar }) {
    if (!isAuthenticated.value) return;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const updatedUser = {
        name,
        biography,
        avatar,
      };
      
      await pb.collection('users').update(user.value.id, updatedUser);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  // Function to update the user email
  async function updateEmail(newEmail) {
    if (!isAuthenticated.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      await pb.collection('users').update(user.value.id, { email: newEmail });
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  // Function to update the user password
  async function updatePassword(currentPassword, newPassword) {
    if (!isAuthenticated.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      await pb.collection('users').update(user.value.id, { password: newPassword }, { currentPassword });
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }
  
  return {
    isLoading,
    error,
    isAuthenticated,
    user,
    login,
    register,
    logout,
    updateProfile,
    updateEmail,
    updatePassword,
  };
}