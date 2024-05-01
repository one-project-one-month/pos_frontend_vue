import axios from "axios";
import apiPrefix from "../../apiPrefix.js";
import useUserStore from "../../store/userStore.js";
import useLayoutStore from "@/store/layoutStore.js";

export default {
    name: "Login",
    data() {
        return {
            user: {
                email: "",
                password: "",
                error: false,
                loading: false,
            },
        };
    },

    methods: {
        login() {
            this.user.error = false;
            this.user.loading = true;
            const formData = new FormData();
            const userStore = useUserStore();
            formData.append("email", this.user.email);
            formData.append("password", this.user.password);

            axios
                .post(`${apiPrefix}/login`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                })
                .then((response) => {
                    console.log(response);
                    localStorage.setItem("token", response.data.token);
                    userStore.setUser(response.data.user);
                    this.$router.push({ name: "deshboard" });
                })
                .catch((err) => {
                    console.log(err);
                    this.user.error = true;
                })
                .finally(() => {
                    this.user.loading = false;
                });
        },
    },

    mounted() {
        const layoutStore = useLayoutStore();

        layoutStore.close();
    },
};
