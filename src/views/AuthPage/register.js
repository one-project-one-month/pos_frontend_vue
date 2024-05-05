import axios from 'axios';

import apiPrefix from '../../apiPrefix.js';

import useUserStore from '@/store/userStore.js';

export default {
    name : "Register", 
    data () {
        return {

            user: {
                name : "", 
                email : "", 
                phone : "", 
                address : "", 
                password : "", 
                password_confirmation : "", 
                checked : false,
                loading : false
            }, 

            
        }
    },

    methods: {
        register () {
            
            const formData = new FormData();

            const userStore = useUserStore();

            this.prepareFormData(formData);

            axios.post(`${apiPrefix}/register`, formData).then(res => {
                console.log(res.data.data.user);
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.data.user));
                userStore.setUser(res.data.data.user);
                this.$router.push({ name : "deshboard" })
            }).catch(err => {
                const errors = err.response.data.errors;
                let alertMessage = "";

                for(const key in errors) {
                    alertMessage += `${errors[key][0]}\n`;
                }
                alert(alertMessage);
            })
            

        }, 

        prepareFormData(formData) {
            formData.append("name", this.user.name);
            formData.append("email", this.user.email);
            formData.append("phone", this.user.phone);
            formData.append("address", this.user.address);
            formData.append("password", this.user.password);
            formData.append("password_confirmation", this.user.password_confirmation);
        }
    }, 

    computed: {
        overAllValidated () {
            
            return (
                this.validations.name && this.validations.email &&
                this.validations.phone && this.validations.address &&
                this.validations.password && this.validations.password_confirmation &&
                this.user.checked
            );
        }, 

        validations () {
            
            return {
                name : this.user.name.length > 7, 
                email : this.user.email.toString() !== "", 
                phone : this.user.phone.length > 9, 
                address : this.user.address !== "", 
                password : this.user.password.length > 7, 
                password_confirmation : this.user.password === this.user.password_confirmation
            }
        }
    },
};