import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const user = ref(JSON.parse(localStorage.getItem("user")));

    function setUser (data) {
        user.value = data
    };

    const getUser = computed(() => user.value );

    return { user, setUser, getUser }
});

export default useUserStore;