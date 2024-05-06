import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/AuthPage/Login.vue";
import Register from "../views/AuthPage/Register.vue";
import Deshboard from "../views/Deshboard.vue";
import useUserStore from "../store/userStore";

const routes = [
    {
        path: "/login",
        name: "Login",
        components: {
            default: Login,
            Header: () => import("../components/Empty.vue"),
            SideBar: () => import("../components/Empty.vue"),
            Footer: () => import("../components/Empty.vue")
        },
    },
    {
        path: "/register",
        name: "Register",
        components: {
            default: Register,
            Header: () => import("../components/Empty.vue"),
            SideBar: () => import("../components/Empty.vue"),
            Footer: () => import("../components/Empty.vue")
        },
    },
    {
        path: "/",
        name: "deshboard",
        components: {
            default: Deshboard,
            Header: () => import("../components/Header.vue"),
            SideBar: () => import("../components/SideBar.vue"),
            Footer: () => import("../components/Empty.vue"),
        },
    },
    {
        path: "/profile",
        name: "Profile",
        components: {
            default: () => import("../views/UserPages/Profile.vue"),
            Header: () => import("../components/Header.vue"),
            SideBar: () => import("../components/SideBar.vue"),
            Footer: () => import("../components/Empty.vue")
        },
    },

    {
        path: "/product",
        name: "Product",
        components: {
            default: () => import("../views/ProductPages/ProductIndex.vue"),
            Header: () => import("../components/Header.vue"),
            SideBar: () => import("../components/SideBar.vue"),
            Footer: () => import("../components/Empty.vue")
        },
    },

    {
        path: "/staff",
        name: "Staff",
        components: {
            default: () => import("../views/StaffPages/StaffTable.vue"),
            Header: () => import("../components/Header.vue"),
            SideBar: () => import("../components/SideBar.vue"),
            Footer: () => import("../components/Empty.vue")
        },
    },
    {
        path: "/category",
        name: "Category",
        components: {
            default: () => import("../views/CategoryPages/CategoryTable.vue"),
            Header: () => import("../components/Header.vue"),
            SideBar: () => import("../components/SideBar.vue"),
            Footer: () => import("../components/Empty.vue")
        },
    },
    {
        path: "/cart",
        name: "Cart",
        components: {
            default: () => import("../views/CartPage/CartPage.vue"),
            Header: () => import("../components/Header.vue"),
            SideBar: () => import("../components/SideBar.vue"),
            Footer: () => import("../components/Empty.vue")
        },
    }, 

    {
        path: "/current-sale-invoice",
        name: "current-sale-invoice",
        components: {
            default: () => import("../views/SaleInvoice/CurrentSaleInvoice.vue"),
            Header: () => import("../components/Header.vue"),
            SideBar: () => import("../components/SideBar.vue"),
            Footer: () => import("../components/Empty.vue")
        },
        beforeEnter(to, from, next) {
            const saleInvoice = JSON.parse(localStorage.getItem("currentSaleInvoice")) || null;
           
            if(!!!saleInvoice || saleInvoice == 'undefined' || saleInvoice == undefined) {
                next({name : 'Cart'})
            } else {
                next();
            }
        }
    }, 
    {
        path: "/show-sale-invoice",
        name: "show-sale-invoice",
        components: {
            default: () => import("../views/SaleInvoice/ShowSaleInvoice.vue"),
            Header: () => import("../components/Header.vue"),
            SideBar: () => import("../components/SideBar.vue"),
            Footer: () => import("../components/Empty.vue")
        },
        beforeEnter(to, from, next) {
            const saleInvoice = JSON.parse(localStorage.getItem("showSaleInvoice")) || null;
           
            if(!!!saleInvoice || saleInvoice == 'undefined' || saleInvoice == undefined) {
                next({name : 'Cart'})
            } else {
                next();
            }
        }
    }, 

    {
        path : "/staff/detail/:staffId", 
        components : {
            default: () => import("../views/StaffPages/StaffDetail.vue"),
            Header: () => import("../components/Header.vue"),
            SideBar: () => import("../components/SideBar.vue"),
            Footer: () => import("../components/Empty.vue")
        }
    }


];

let checkAuthentication = () => {
    let isLoggedIn = localStorage.getItem("token");
    console.log(isLoggedIn);
    if (isLoggedIn !== null && isLoggedIn !== "undefined" && isLoggedIn !== undefined) {
        const userStore = useUserStore();
        userStore.setUser(JSON.parse(localStorage.getItem("user")));
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
