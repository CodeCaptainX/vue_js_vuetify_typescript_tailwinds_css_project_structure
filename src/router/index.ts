import { createRouter, createWebHistory } from "vue-router";

// import { useAuthStore } from "@/stores/auth/auth";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";

const routes = [
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next("/login");
//   } else if (to.path === "/login" && authStore.isAuthenticated) {
//     next("/");
//   } else {
//     next();
//   }
// });

export default router;
