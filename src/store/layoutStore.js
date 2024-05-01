import { defineStore } from "pinia";
import { computed, ref } from "vue";

const useLayoutStore = defineStore('layout', () => {
    const showSideBar = ref(false);

    const showModel = ref(false);

    function toggleSideBar () {
        showSideBar.value = !showSideBar.value;
    }

    function close () {
        showSideBar.value = false;
    }

    const getShowSideBar = computed(() => showSideBar.value);


    function controlModel(value) {
        showModel.value = value;
    }

    const getShowModel = computed(() => showModel.value)

    return { toggleSideBar, getShowSideBar, close, controlModel, getShowModel }
});

export default useLayoutStore;