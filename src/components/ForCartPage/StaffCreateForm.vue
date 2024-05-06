<template>
    <div>
        <h4>Staff Create Form</h4>

        <form @submit.prevent="createNewStaff">
            <div class="input-group">
                <label for="">Name</label>
                <input
                    type="text"
                    required
                    class="form-control w-100"
                    v-model="newStaff.staffName"
                />
            </div>
            <hr />

            <div class="input-group">
                <label for="">Date of Birth</label>
                <input
                    type="date"
                    required
                    class="form-control w-100"
                    v-model="newStaff.dateOfBirth"
                />
            </div>
            <hr />

            <div class="input-group">
                <label for="">Phone</label>
                <input
                    type="number"
                    required
                    class="form-control w-100"
                    v-model="newStaff.mobileNo"
                />
            </div>
            <hr />

            <div class="input-group">
                <fieldset>
                    <label>Gender</label><br />
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        v-model="newStaff.gender"
                    />
                    <label for="male">Male</label>
                    <br />
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        v-model="newStaff.gender"
                    />
                    <label for="female">Female</label>
                    <br />
                </fieldset>
            </div>
            <hr />

            <div class="input-group">
                <label for="">Address</label>
                <input
                    type="text"
                    required
                    class="form-control w-100"
                    v-model="newStaff.address"
                />
            </div>
            <hr />

            <div class="input-group">
                <label for="">Position</label>
                <input
                    type="text"
                    required
                    class="form-control w-100"
                    v-model="newStaff.position"
                />
            </div>

            <div class="input-group">
                <label for="">Shop</label>
                <div v-if="shops.loading" class="shopsLoader">Loading....</div>
                <select v-else required class="form-control w-100" v-model="newStaff.shop_id">
                    <option value="" selected disabled>Choose a Shop</option>
                    <option v-for="shop in shops.data" :key="shop.ShopId" :value="shop.ShopId">{{ shop.ShopName }}</option>
                </select>
            </div>
            <hr />

            <div class="text-center">
                <button type="submit" class="btn btn-success">
                    <span v-if="newStaffCreateLoading">Loading..</span>
                    <span v-else>Create</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import apiPrefix from '@/apiPrefix';
import useCartStore from '@/store/cartStore';
import useLayoutStore from '@/store/layoutStore';

export default {
    name: "StaffCreateForm",

    data () {
        return {
            cartStore : useCartStore(),
            layoutStore : useLayoutStore(),

            newStaffCreateLoading: false,
            newStaff: {
                staffName : "", 
                dateOfBirth : "", 
                mobileNo : "", 
                address : "", 
                gender : "", 
                position : "", 
                shop_id : ""
            }, 

            shops : {
                data : [], 
                loading : false, 
                error : false
            }
        }
    },

    methods: {
        fetchShops () {
            this.shops.loading = true;
            this.shops.error = false;
            axios.get(`${apiPrefix}/v1/shop`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => {
                console.log(res.data);
                this.shops.data = res.data.data;
            }).catch(err => {
                console.log(err);
                this.shops.error = true;
            }).finally(() => {
                this.shops.loading = false;
            });
        }, 

        createNewStaff() {
            this.newStaffCreateLoading = true;
            axios.post(`${apiPrefix}/v1/staff`, JSON.stringify(this.newStaff), {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`, 
                    "Content-Type" : "application/json", 
                    Accept : "application/json"
                }
            }).then(res => {
                console.log(res.data);
                this.cartStore.setStaff(res.data.data);
                this.cartStore.setAllStaffs([...this.cartStore.getAllStaffs, res.data.data]);
                this.layoutStore.controlModel(false);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.newStaffCreateLoading = false;
            });
        }
    },

    mounted () {
        this.fetchShops();
    }
};
</script>

<style lang="css" scoped></style>
