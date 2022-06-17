import { createRouter, createWebHistory } from "vue-router";
const login = () => import ('../views/login/login.vue');

const routes = [
	{ path: '/', name: 'login', component: login }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
