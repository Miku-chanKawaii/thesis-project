<script setup>
import { ref, onMounted, computed } from 'vue';
import { useSales } from '../../composables/useSales';
import { payout } from '../../composables/useID';

const { sales, lastSevenDays, totalEarnings, isLoading, error, fetchSales } = useSales();

const balance = computed(() => {
  const earnings = parseFloat(totalEarnings.value);
  const payoutAmount = parseFloat(payout.value);
  return (earnings - payoutAmount);
});

//console.log('usersales', sales);


onMounted(() => {
  fetchSales();
});
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white shadow-sm rounded-lg p-6">
        <h3 class="text-sm font-medium text-gray-500">Available Balance</h3>
        <p class="mt-2 text-3xl font-bold">${{ balance.toFixed(2) }}</p>
      </div>
      
      <div class="bg-white shadow-sm rounded-lg p-6">
        <h3 class="text-sm font-medium text-gray-500">Last 7 Days</h3>
        <p class="mt-2 text-3xl font-bold">${{ lastSevenDays }}</p>
      </div>
      
      <div class="bg-white shadow-sm rounded-lg p-6">
        <h3 class="text-sm font-medium text-gray-500">Total Earnings</h3>
        <p class="mt-2 text-3xl font-bold">${{ totalEarnings }}</p>
      </div>
    </div>

    <div class="bg-white shadow-sm rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Recent Sales</h2>
      </div>

      <div v-if="error" class="p-6 text-red-600">
        {{ error }}
      </div>

      <div v-else-if="isLoading" class="p-6 text-center text-gray-500">
        Loading sales...
      </div>

      <div v-else-if="sales.length === 0" class="p-6 text-center text-gray-500">
        No sales yet
      </div>

      <div v-else class="divide-y divide-gray-200">
        <div v-for="sale in sales" :key="sale.id" class="px-6 py-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-medium text-gray-900">{{ sale.name }}</h3>
              <p class="text-sm text-gray-500">{{ sale.email }}</p>
            </div>
            <div class="text-right">
              <p class="font-medium">${{ sale.price }}</p>
              <p class="text-sm text-gray-500">{{ new Date(sale.created).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>