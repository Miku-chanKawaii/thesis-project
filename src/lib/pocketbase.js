import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

pb.admins.authWithPassword('huyb1809694@student.ctu.edu.vn', 'hatsunemiku');

// Auth helpers
export const isUserValid = () => pb.authStore.isValid;
export const getCurrentUser = () => pb.authStore.model;

// Collection helpers
export const products = {
  async getAll() {
    return await pb.collection('products').getList(1, 50, {
      sort: '-created',
    });
  },
  
  async create(data) {
    return await pb.collection('products').create(data);
  },
  
  async getById(id) {
    return await pb.collection('products').getOne(id);
  }
};

export const creators = {
  async getProfile(id) {
    return await pb.collection('creators').getOne(id);
  },
  
  async update(id, data) {
    return await pb.collection('creators').update(id, data);
  }
};