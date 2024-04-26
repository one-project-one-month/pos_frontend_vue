import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/AuthPage/Login.vue";
import Register from "../views/AuthPage/Register.vue";
import Empty from "../components/Empty.vue";
import Deshboard from "../views/Deshboard.vue";

const routes = [
    {
        path: "/login",
        name: "Login",
        components: {
            default : Login, 
            Header : () => import("../components/Empty.vue"), 
            SideBar : () => import("../components/Empty.vue")
        },
    },
    {
        path: "/register",
        name: "Register",
        components: {
            default : Register, 
            Header : () => import("../components/Empty.vue"), 
            SideBar : () => import("../components/Empty.vue")
        },
    },
    {
        path: "/",
        name: "deshboard",
        components: {
            default : Deshboard,
            Header : () => import("../components/Header.vue"), 
            SideBar : () => import("../components/SideBar.vue")
        },
    },
    {
        path: "/profile",
        name: "Profile",
        components: {
            default : () => import("../views/UserPages/Profile.vue"),
            Header : () => import("../components/Header.vue"), 
            SideBar : () => import("../components/SideBar.vue")
        },
    },

    {
        path: "/product", 
        name: "Product", 
        components: {
            default : () => import("../views/ProductPages/ProductIndex.vue"),
            Header : () => import("../components/Header.vue"), 
            SideBar : () => import("../components/SideBar.vue")
        },
    }
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
