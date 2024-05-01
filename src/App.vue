<template>
  <router-view name="Header"></router-view>
  <main id="main" class="main" :style="mainStyle">
    <RouterView />
  </main>
  <router-view name="SideBar"></router-view>
</template>

<script>
import useLayoutStore from "@/store/layoutStore";
export default {
  name: "App",

  data() {
    return {
      layoutStore: useLayoutStore(),
    };
  },

  computed: {
    mainStyle() {
      return {
        "margin-left": this.layoutStore.getShowSideBar ? "300px" : "0px",
      };
    },
  },
};
</script>
