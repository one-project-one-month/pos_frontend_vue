<template>
    <!-- ======= Header ======= -->
    <teleport to="#headerPortal">
        <header id="header" class="header fixed-top d-flex align-items-center">
            <div class="d-flex align-items-center justify-content-between">
                <router-link to="/" class="logo d-flex align-items-center">
                    <img src="assets/img/logo.png" alt="" />
                    <span class="d-none d-lg-block">NiceAdmin</span>
                </router-link>
                <i
                    @click="toggleSideBar"
                    class="bi bi-list toggle-sidebar-btn"
                ></i>
            </div>
            <!-- End Logo -->

            <div class="search-bar">
                <!-- <form
                    class="search-form d-flex align-items-center"
                    method="POST"
                    action="#"
                >
                    <input
                        type="text"
                        name="query"
                        placeholder="Search"
                        title="Enter search keyword"
                    />
                    <button type="submit" title="Search">
                        <i class="bi bi-search"></i>
                    </button>
                </form> -->
            </div>
            <!-- End Search Bar -->

            <nav class="header-nav ms-auto">
                <ul class="d-flex align-items-center">
                    <li class="nav-item dropdown pe-3">
                        <a
                            class="nav-link nav-profile d-flex align-items-center pe-0"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <span
                                class="d-none d-md-block dropdown-toggle ps-2"
                                >{{ user.name }}</span
                            > </a
                        ><!-- End Profile Iamge Icon -->

                        <ul
                            class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
                        >
                            <li class="dropdown-header">
                                <h6>{{ user.name }}</h6>
                                <span>{{ user.email }}</span>
                            </li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>

                            <li>
                                <router-link
                                    class="dropdown-item d-flex align-items-center"
                                    to="/profile"
                                    ><span>My Profile</span></router-link
                                >
                            </li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>

                            <li>
                                <div @click="logout"
                                    class="dropdown-item d-flex align-items-center"
                                    
                                >
                                    <i class="bi bi-box-arrow-right"></i>
                                    <span>Sign Out</span>
                                </div>
                            </li>
                        </ul>
                        <!-- End Profile Dropdown Items -->
                    </li>
                    <!-- End Profile Nav -->
                </ul>
            </nav>
        </header>
        <!-- End Icons Navigation -->
    </teleport>
    <!-- End Header -->
</template>

<script>
import useLayoutStore from "../store/layoutStore.js";
import useUserStore from "../store/userStore.js";
export default {
    name: "Header",
    data() {
        return {
            layoutStore: "",
        };
    },
    methods: {
        toggleSideBar() {
            this.layoutStore.toggleSideBar();
            console.log(this.layoutStore.getShowSideBar);
        },

        logout () {
            localStorage.clear();
            this.$router.push("/login");
        }
    },

    mounted() {
        this.layoutStore = useLayoutStore();
        const userStore = useUserStore();
        console.log(userStore.getUser);
    },

    computed: {
        user() {
            const userStore = useUserStore();
            return userStore.getUser;
        },
    },
};
</script>

<style lang="css" scoped>
#header {
    z-index: 200;
}
</style>
