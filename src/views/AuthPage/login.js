import axios from 'axios';
import apiPrefix from "../../apiPrefix.js";
import useUserStore from "../../store/userStore.js";

export default {
    name : "Login", 
    data () {
        return {
            user : {
                email : "", 
                password : "", 
                error : false, 
                loading : false
            }
        }
    },

    methods: {
        login () {
            this.user.error = false;
            this.user.loading = true;
            const formData = new FormData();
            const userStore = useUserStore();
            formData.append("email", this.user.email);
            formData.append("password", this.user.password);

            axios.post(`${apiPrefix}/login`, formData).then(response => {
                console.log(response.data);
                localStorage.setItem('token', response.data.data.token);
                userStore.setUser(response.data.data.user);
                console.log('user', userStore.getUser);
                this.$router.push({ name : "deshboard" });

            }).catch(err => {
                console.log(err.message);
                this.user.error = true;
            }).finally (() => {
                this.user.loading = false;
            });
        }
    }
};