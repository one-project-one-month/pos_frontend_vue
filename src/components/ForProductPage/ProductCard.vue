<template>
    <div class="card" style="width: 18rem">
        <div class="card-body">
            <h5 class="card-title">{{ item.ProductName }}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
                {{ category }}
            </h6>
            <p class="card-text">
                Price :
                <span class="fw-bold">{{ item.Price }}</span> MMK
            </p>
            <p class="card-text">
                Product Code :
                <span class="fw-bold">{{ item.ProductCode }}</span>
            </p>
            <span class="card-link text-danger" @click="deleteProduct">Delete Product</span> | <span @click="openEditModel" class="card-link text-primary">Edit Product</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import useLayoutStore from '@/store/layoutStore';
import apiPrefix from '@/apiPrefix';
import Model from '../Model.vue';
import ProductForm from './ProductForm.vue';
export default {
    name: "ProductCard",

    emits : ['delete-product', 'openEditModel'], 

    components: {
        Model, 
        ProductForm
    },

    props: {
        item: {
            type: Object,
            default: {},
        },

        category: {
            type: String,
            default: "",
        },

    },

    methods: {
        deleteProduct () {
            //delete in server
            axios.delete(`${apiPrefix}/v1/product/${this.item.ProductId}`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            }).then(response => {
                console.log(response.data);
            }).catch(err => {
                console.log(err.message);
                alert('Error in deleteing the product, Try Agin Later.');
                window.location.reload();
            })
            //delete in client side
            this.$emit('delete-product', this.item.ProductId)
            
        }, 
        openEditModel() {
            this.$emit('openEditModel', this.item);
        }
    }, 

    mounted () {
        
    }, 

    computed: {
        showModel () {
            const layoutStore = useLayoutStore();
            return layoutStore.getShowModel;
        }
    },
};
</script>

<style lang="css" scoped></style>
