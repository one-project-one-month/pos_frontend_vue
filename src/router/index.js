import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/AuthPage/Login.vue";
import Register from "../views/AuthPage/Register.vue";

const routes = [
    {
        path: "/",
        name: "deshboard",
        component: () => import("../views/Deshboard.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/UserPages/Profile.vue"),
    },
];

let checkAuthentication = () => {
    let isLoggedIn = localStorage.getItem("token");
    console.log(isLoggedIn);
    if (isLoggedIn !== null && isLoggedIn !== "undefined" && isLoggedIn !== undefined) {
        return true;
    } else {
        return false;
    }
};

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = checkAuthentication();
    if (to.path === "/login" || to.path === "/register") {
        if (isAuthenticated) {
            next("/");
        } else {
            next();
        }
    } else {
        if (isAuthenticated) {
            next();
        } else {
            next("/login");
        }
    }
});

export default router;
