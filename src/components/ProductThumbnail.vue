<script>
import { computed } from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'medium', // small, medium, large
  }
});

const sizeClasses = computed(() => {
  const sizes = {
    small: 'w-20 h-20',
    medium: 'w-full aspect-w-16 aspect-h-9',
    large: 'w-full aspect-w-16 aspect-h-9'
  };
  return sizes[props.size] || sizes.medium;
});
</script>

<template>
  <div 
    :class="[
      sizeClasses,
      'bg-gray-100 rounded-lg overflow-hidden'
    ]"
  >
    <img 
      v-if="src" 
      :src="src" 
      :alt="alt"
      class="w-full h-full object-cover"
    />
    <div 
      v-else 
      class="w-full h-full flex items-center justify-center text-gray-400"
    >
      <svg 
        class="w-12 h-12" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="1.5" 
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  </div>
</template>