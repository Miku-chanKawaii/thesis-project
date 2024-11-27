import { ref } from 'vue';

export function useCategories() {
  const categories = [
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'drawing-painting', name: 'Drawing & Painting', icon: '🖌️' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'video', name: 'Video', icon: '🎥' },
    { id: 'photography', name: 'Photography', icon: '📷' },
    { id: 'comics', name: 'Comics & Graphic Novels', icon: '📚' },
    { id: 'books', name: 'Books', icon: '📖' },
    { id: 'other', name: 'Other', icon: '✨' },
  ];

  const getCategoryById = (id) => categories.find(cat => cat.id === id);

  return {
    categories,
    getCategoryById,
  };
}