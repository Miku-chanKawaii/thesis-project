import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

//pb.admins.authWithPassword('huyb1809694@student.ctu.edu.vn', 'hatsunemiku');
//pb.collection('users').authWithPassword('test@example.com', 'testtest');


// Collection helpers
export const products = {
  async getAll() {
    return await pb.collection('products').getList(1, 50, {
      sort: '-created',
      expand: 'creator, content',
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
    return await pb.collection('users').getOne(id);
  },
  
  async update(id, data) {
    return await pb.collection('users').update(id, data);
  }
};