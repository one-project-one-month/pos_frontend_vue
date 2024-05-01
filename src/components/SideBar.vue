<template>
  <!-- ======= Sidebar ======= -->

  <Teleport to="#sideBarPortal">
    <aside id="sidebar" class="sidebar" :style="style">
      <ul class="sidebar-nav" id="sidebar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <i class="bi bi-grid"></i>
            <span>Dashboard</span>
          </router-link>
        </li>

        <li class="nav-heading">Pages</li>

        <li class="nav-item">
          <router-link to="/product">
            <a class="nav-link collapsed">
              <i class="fa-solid fa-store"></i>
              <span>Stores</span>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/staff">
            <a class="nav-link collapsed">
              <i class="fa-solid fa-store"></i>
              <span>Stores</span>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/product">
            <a class="nav-link collapsed">
              <i class="fa-solid fa-store"></i>
              <span>Stores</span>
            </a>
          </router-link>
        </li>
        <!-- End Profile Page Nav -->
      </ul>
    </aside>
  </Teleport>

  <!-- End Sidebar-->
</template>

<script>
import useLayoutStore from "@/store/layoutStore";
export default {
  name: "SideBar",
  data() {
    return {
      layoutStore: useLayoutStore(),
    };
  },

  computed: {
    style() {
      return {
        left: this.layoutStore.getShowSideBar ? "0" : "-300px",
      };
    },
  },
};
</script>

<style lang="css" scoped></style>
