import { createRouter, createWebHistory } from "vue-router";
const login = () => import ('../views/login/login.vue');

const routes = [
	{ path: '/', name: 'login_index', component: login },
	{ path: '/login', name: 'login', component: login }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
