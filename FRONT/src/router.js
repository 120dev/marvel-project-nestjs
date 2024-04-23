import { createRouter, createWebHistory } from 'vue-router';
import MarvelSeries from "@/components/MarvelSeries.vue";
import AuthForm from "@/components/AuthForm.vue";

const routes = [
    {
        path: '/',
        name: 'Marvel',
        component: MarvelSeries,
    },
    {
        path: '/auth',
        name: 'Auth',
        component: AuthForm,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
});

export default router;
