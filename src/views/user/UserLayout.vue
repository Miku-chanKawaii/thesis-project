<script setup>
import UserNav from '../../components/user/UserNav.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="md:col-span-1">
          <UserNav />
        </div>
        <div class="md:col-span-3">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>