<template>
    <!-- ======= Sidebar ======= -->

    <Teleport to="#sideBarPortal">
        <aside id="sidebar" class="sidebar" :style="style">
            <ul class="sidebar-nav" id="sidebar-nav">
                <SideBarLinkVue path="/">Dashboard</SideBarLinkVue>

                <li class="nav-heading">Pages</li>

                <!--  -->
                <SideBarLinkVue path="/profile">
                    <template v-slot:icon
                        ><i class="bi bi-person"></i
                    ></template>
                    Your Profile
                </SideBarLinkVue>
                <!-- End Profile Page Nav -->

                <SideBarLinkVue path="/product">
                    <template v-slot:icon
                        ><i class="bi bi-bag-heart-fill"></i
                    ></template>
                    Products
                </SideBarLinkVue>

                <SideBarLinkVue path="/category">
                    <template v-slot:icon
                        ><i class="bi bi-tag-fill"></i
                    ></template>
                    Categories
                </SideBarLinkVue>

                <!-- End Products Page Nav -->
                <SideBarLinkVue path="/staff">
                    <template v-slot:icon
                        ><i class="bi bi-person-lines-fill"></i
                    ></template>
                    Staffs
                </SideBarLinkVue>
                <!-- End Products Page Nav -->

                <!-- End Products Page Nav -->
                <SideBarLinkVue path="/current-sale-invoice">
                    <template v-slot:icon
                        ><i class="bi bi-newspaper"></i></template>
                    Latest Sale Invoice
                </SideBarLinkVue>
                <!-- End Products Page Nav -->

                <SideBarLinkVue path="" @click="logOut">
                    <template v-slot:icon
                        ><i class="bi bi-box-arrow-right"></i
                    ></template>
                    Logout
                </SideBarLinkVue>
            </ul>
        </aside>
    </Teleport>

    <!-- End Sidebar-->
</template>

<script>
import useLayoutStore from "@/store/layoutStore";
import SideBarLinkVue from "./ForDashBoard/SideBarLink.vue";
export default {
    name: "SideBar",
    data() {
        return {
            layoutStore: useLayoutStore(),
        };
    },

    components: {
        SideBarLinkVue,
    },

    computed: {
        style() {
            return {
                left: this.layoutStore.getShowSideBar ? "0" : "-300px",
            };
        },
    },

    methods: {
        logOut() {
            localStorage.clear();
            this.$router.push({ name: "Login" });
        },
    },
};
</script>

<style lang="css" scoped></style>
