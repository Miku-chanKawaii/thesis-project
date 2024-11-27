import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import { isUserValid } from '../lib/pocketbase';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('../views/Discover.vue'),
  },
  {
    path: '/discover/:category',
    name: 'CategoryProducts',
    component: () => import('../views/CategoryProducts.vue'),
    props: true,
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import('../views/ProductDetails.vue'),
    props: true,
  },
  {
    path: '/user',
    component: () => import('../views/user/UserLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'UserHome',
        component: () => import('../views/user/UserHome.vue'),
      },
      {
        path: 'products',
        name: 'UserProducts',
        component: () => import('../views/user/UserProducts.vue'),
      },
      {
        path: 'products/new',
        name: 'NewProduct',
        component: () => import('../views/user/NewProduct.vue'),
      },
      {
        path: 'sales',
        name: 'UserSales',
        component: () => import('../views/user/UserSales.vue'),
      },
      {
        path: 'library',
        name: 'UserLibrary',
        component: () => import('../views/user/UserLibrary.vue'),
      },
      {
        path: 'settings',
        name: 'UserSettings',
        component: () => import('../views/user/UserSettings.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = isUserValid();

  // Handle auth required routes
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } });
  }

  // Handle guest only routes (login/register)
  if (to.meta.guestOnly && isAuthenticated) {
    return next({ name: 'UserHome' });
  }

  next();
});

export default router;