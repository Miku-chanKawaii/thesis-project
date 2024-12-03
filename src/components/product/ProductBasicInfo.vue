<script setup>
import { computed } from 'vue';
import { useCategories } from '../../composables/useCategories';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const { categories } = useCategories();

const thumbnail = computed({
  get: () => props.modelValue.thumbnail,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, thumbnail: value });
  }
});

const name = computed({
  get: () => props.modelValue.name,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, name: value });
  }
});

const description = computed({
  get: () => props.modelValue.description,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, description: value });
  }
});

const price = computed({
  get: () => props.modelValue.price,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, price: parseFloat(value) || 0 });
  }
});

const category = computed({
  get: () => props.modelValue.category,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, category: value });
  }
});

function handleThumbnailChange(event) {
  const file = event.target.files[0];
  if (file) {
    thumbnail.value = file;
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Thumbnail -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Product Thumbnail</label>
      <div class="mt-1 flex items-center space-x-4">
        <div 
          class="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden"
        >
          <img
            v-if="thumbnail"
            :src="typeof thumbnail === 'string' ? thumbnail : URL.createObjectURL(thumbnail)"
            alt="Thumbnail preview"
            class="w-full h-full object-cover"
          />
          <span v-else class="text-gray-400">No image</span>
        </div>
        <input
          type="file"
          accept="image/*"
          @change="handleThumbnailChange"
          class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90"
        />
      </div>
    </div>

    <!-- Category -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Category</label>
      <select
        v-model="category"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
      >
        <option value="">Select a category</option>
        <option
          v-for="cat in categories"
          :key="cat.id"
          :value="cat.id"
        >
          {{ cat.name }}
        </option>
      </select>
    </div>

    <!-- Name -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Product Name</label>
      <input
        type="text"
        v-model="name"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        placeholder="Enter product name"
      />
    </div>

    <!-- Description -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        v-model="description"
        rows="4"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        placeholder="Describe your product"
      ></textarea>
    </div>

    <!-- Price -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Price</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span class="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="number"
          v-model="price"
          min="0"
          step="0.01"
          class="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder="0.00"
        />
      </div>
    </div>
  </div>
</template>