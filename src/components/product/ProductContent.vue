<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const files = computed({
  get: () => props.modelValue.files,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, files: value });
  }
});

const description = computed({
  get: () => props.modelValue.description,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, description: value });
  }
});

function handleFileUpload(event) {
  const newFiles = Array.from(event.target.files);
  files.value = [...files.value, ...newFiles];
}

function removeFile(index) {
  files.value = files.value.filter((_, i) => i !== index);
}
</script>

<template>
  <div class="space-y-6">
    <!-- Content Files -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Content Files</label>
      <div class="mt-1">
        <input
          type="file"
          multiple
          @change="handleFileUpload"
          class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90"
        />
      </div>

      <!-- File List -->
      <div v-if="files.length > 0" class="mt-4 space-y-2">
        <div
          v-for="(file, index) in files"
          :key="index"
          class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div class="flex items-center space-x-3">
            <span class="text-gray-500">📄</span>
            <span class="text-sm text-gray-900">{{ file.name }}</span>
          </div>
          <button
            @click="removeFile(index)"
            class="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

    <!-- Content Description -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Content Description</label>
      <textarea
        v-model="description"
        rows="6"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        placeholder="Describe what's included in your product..."
      ></textarea>
      <p class="mt-2 text-sm text-gray-500">
        This description will be shown to customers after they purchase your product.
      </p>
    </div>
  </div>
</template>