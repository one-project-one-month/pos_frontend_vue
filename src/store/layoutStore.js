import { defineStore } from "pinia";
import { computed, ref } from "vue";

const useLayoutStore = defineStore('layout', () => {
    const showSideBar = ref(true);

    function toggleSideBar () {
        showSideBar.value = !showSideBar.value;
    }

    const getShowSideBar = computed(() => showSideBar.value);

    return { showSideBar, toggleSideBar, getShowSideBar }
});

export default useLayoutStore;