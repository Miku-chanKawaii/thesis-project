<script setup>

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'search']);

function handleSubmit(e) {
  e.preventDefault();
  emit('search');
}
</script>

<template>
  <form @submit="handleSubmit" class="w-full">
    <div class="relative">
      <input
        type="search"
        :value="modelValue"
        @input="e => emit('update:modelValue', e.target.value)"
        placeholder="Search products..."
        class="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  </form>
</template>