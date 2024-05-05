<template>
    <div>
        <h4>Customer Create Form</h4>

        <form @submit.prevent="createCustomer">
            <div class="input-group">
                <label for="">Name</label>
                <input
                    type="text"
                    required
                    class="form-control w-100"
                    v-model="newCustomer.customerName"
                />
            </div> <hr>

            <div class="input-group">
                <label for="">Date of Birth</label>
                <input
                    type="date"
                    required
                    class="form-control w-100"
                    v-model="newCustomer.dateOfBirth"
                />
            </div> <hr>

            <div class="input-group">
                <label for="">Phone</label>
                <input
                    type="number"
                    required
                    class="form-control w-100"
                    v-model="newCustomer.mobileNo"
                />
            </div> <hr>

            <div class="input-group">
                <fieldset>
                    <label>Gender</label><br />
                    <input type="radio" id="male" name="gender" value="male" v-model="newCustomer.gender"/>
                    <label for="male">Male</label>
                    <br />
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        v-model="newCustomer.gender"
                    />
                    <label for="female">Female</label>
                    <br />
                </fieldset>
            </div> <hr>

            <div class="input-group">
                <label for="">State Code</label>
                <input
                    type="number"
                    required
                    class="form-control w-100"
                    v-model="newCustomer.stateCode"
                />
            </div> <hr>

            <div class="input-group">
                <label for="">Township Code</label>
                <input
                    type="number"
                    required
                    class="form-control w-100"
                    v-model="newCustomer.townshipCode"
                />
            </div> <hr>

            <div class="text-center">
                <button type="submit" class="btn btn-success ">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
import apiPrefix from '@/apiPrefix';
import axios from 'axios';
import useCartStore from '@/store/cartStore';
import useLayoutStore from '@/store/layoutStore';
export default {
    name: "CustomerCreateForm",

    data() {
        return {
            createLoading : false,
            newCustomer: {
                customerName: "",
                dateOfBirth: null,
                mobileNo: null,
                gender: "",
                stateCode: "",
                townshipCode: "",
            },
        };
    },

    methods: {
        createCustomer () {
            this.createLoading = true;
            axios.post(`${apiPrefix}/v1/customer`, JSON.stringify(this.newCustomer), {
                headers : {
                    Authorization : `Bearer ${ localStorage.getItem("token") }`,
                    "Content-Type" : "application/json", 
                    Accept : "application/json"
                }
            }).then(res => {
                console.log(res.data);
                const cartStore = useCartStore();
                cartStore.setCustomer(res.data.data);
                cartStore.setAllCustomers([...cartStore.getAllCustomers, res.data.data]);
                const layoutStore = useLayoutStore();
                layoutStore.controlModel(false);
            }).catch(err => {
                console.log(err);
            }).finally (() => {
                this.createLoading = false;
            })
        }
    }
};
</script>

<style lang="css" scoped></style>
