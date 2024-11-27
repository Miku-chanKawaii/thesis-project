<script setup>
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';

const { user, updateProfile, updateEmail, updatePassword } = useAuth();

const form = ref({
  name: user.value?.name || '',
  email: user.value?.email || '',
  biography: user.value?.biography || '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const avatar = ref(null);
const isLoading = ref(false);
const error = ref(null);
const success = ref(null);

async function handleProfileUpdate() {
  isLoading.value = true;
  error.value = null;
  success.value = null;

  try {
    await updateProfile({
      name: form.value.name,
      biography: form.value.biography,
      avatar: avatar.value,
    });
    success.value = 'Profile updated successfully';
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

async function handleEmailUpdate() {
  if (!form.value.email) return;
  
  isLoading.value = true;
  error.value = null;
  success.value = null;

  try {
    await updateEmail(form.value.email);
    success.value = 'Email updated successfully';
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

async function handlePasswordUpdate() {
  if (form.value.newPassword !== form.value.confirmPassword) {
    error.value = 'Passwords do not match';
    return;
  }

  isLoading.value = true;
  error.value = null;
  success.value = null;

  try {
    await updatePassword(form.value.currentPassword, form.value.newPassword);
    success.value = 'Password updated successfully';
    form.value.currentPassword = '';
    form.value.newPassword = '';
    form.value.confirmPassword = '';
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="space-y-6">
    <div v-if="error" class="bg-red-50 p-4 rounded text-red-600">
      {{ error }}
    </div>
    
    <div v-if="success" class="bg-green-50 p-4 rounded text-green-600">
      {{ success }}
    </div>

    <!-- Profile Section -->
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-6">Profile Information</h2>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Avatar</label>
          <div class="mt-1 flex items-center space-x-4">
            <img 
              :src="user?.avatar || 'https://via.placeholder.com/128'" 
              alt="Avatar"
              class="w-16 h-16 rounded-full object-cover"
            />
            <input 
              type="file" 
              accept="image/*"
              @change="e => avatar = e.target.files[0]"
              class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            v-model="form.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Biography</label>
          <textarea
            v-model="form.biography"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          ></textarea>
        </div>

        <button
          @click="handleProfileUpdate"
          :disabled="isLoading"
          class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50"
        >
          {{ isLoading ? 'Updating...' : 'Update Profile' }}
        </button>
      </div>
    </div>

    <!-- Email Section -->
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-6">Email Address</h2>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="form.email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <button
          @click="handleEmailUpdate"
          :disabled="isLoading"
          class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50"
        >
          {{ isLoading ? 'Updating...' : 'Update Email' }}
        </button>
      </div>
    </div>

    <!-- Password Section -->
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-6">Change Password</h2>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            v-model="form.currentPassword"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            v-model="form.newPassword"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            v-model="form.confirmPassword"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <button
          @click="handlePasswordUpdate"
          :disabled="isLoading"
          class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50"
        >
          {{ isLoading ? 'Updating...' : 'Update Password' }}
        </button>
      </div>
    </div>
  </div>
</template>