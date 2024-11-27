<script setup>
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Digital Creator",
    content: "This platform changed everything for me. I'm now able to reach customers worldwide.",
    avatar: "👩"
  },
  {
    name: "Mike Chen",
    role: "Course Creator",
    content: "The simplicity and power of this platform is unmatched. Highly recommended!",
    avatar: "👨"
  },
  {
    name: "Emma Davis",
    role: "Artist",
    content: "I can focus on creating while the platform handles all the business aspects.",
    avatar: "👩"
  }
]
</script>

<template>
  <section class="bg-gray-50 py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-12">What creators are saying</h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="testimonial in testimonials" :key="testimonial.name" 
             class="bg-white p-6 rounded-lg shadow-sm">
          <div class="text-4xl mb-4">{{ testimonial.avatar }}</div>
          <p class="text-gray-600 mb-4">{{ testimonial.content }}</p>
          <div class="font-bold">{{ testimonial.name }}</div>
          <div class="text-gray-500">{{ testimonial.role }}</div>
        </div>
      </div>
    </div>
  </section>
</template>