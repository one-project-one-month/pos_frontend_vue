<template>
    <form v-if="method === 'store'" action="" @submit.prevent="createProduct">
        <h4>Create Your Product</h4>
        <div class="input-group">
            <label for="">Name</label>
            <input
                type="text"
                class="form-control w-100"
                placeholder="Product name.."
                v-model="newProduct.product_name"
            />
        </div>
        <hr class="mx-3" />

        <div class="input-group">
            Categories
            <div class="select-wrapper w-100">
                <select
                    name=""
                    id=""
                    class="form-control w-100"
                    v-model="newProduct.ProductCategoryId"
                >
                    <option value="" selected disabled>
                        Select Your Category
                    </option>
                    <option
                        v-for="item in categories"
                        :key="item.ProductCategoryId"
                        :value="item.ProductCategoryId"
                    >
                        {{ item.ProductCategoryName }}
                    </option>
                </select>
            </div>
        </div>

        <hr class="mx-3" />
        <div class="input-group">
            <label for="">Price</label>
            <input
                type="number"
                class="form-control w-100"
                placeholder="Price.."
                v-model="newProduct.price"
            />
        </div>
        <hr class="mx-3" />

        <div class="d-flex justify-content-center">
            <button v-if="!loading" type="submit" class="btn btn-success">
                Create
            </button>
            <button v-else type="button" class="btn btn-success">
                Loading
            </button>
        </div>
    </form>

    <form
        v-if="method === 'update'"
        action=""
        @submit.prevent="funcUpdateProduct"
    >
        <h4>Update Your Product</h4>
        <div class="input-group">
            <label for="">Name</label>
            <input
                type="text"
                class="form-control w-100"
                placeholder="Product name.."
                v-model="updateProduct.ProductName"
            />
        </div>
        <hr class="mx-3" />

        <div class="input-group">
            Categories
            <div class="select-wrapper w-100">
                <select
                    v-model="updateProductCategoryId"
                    class="form-control w-100"
                >
                    <option
                        v-for="item in categories"
                        :key="item.ProductCategoryId"
                        :value="item.ProductCategoryId"
                    >
                        {{ item.ProductCategoryName }}
                    </option>
                </select>
            </div>
        </div>

        <hr class="mx-3" />
        <div class="input-group">
            <label for="">Price</label>
            <input
                type="number"
                class="form-control w-100"
                placeholder="Price.."
                v-model="updateProduct.Price"
            />
        </div>
        <hr class="mx-3" />

        <div class="d-flex justify-content-center">
            <button v-if="!loading" type="submit" class="btn btn-success">
                Update
            </button>
            <button v-else type="button" class="btn btn-success">
                Loading
            </button>
        </div>
    </form>
</template>

<script>
import axios from "axios";
import apiPrefix from "@/apiPrefix";
export default {
    name: "ProductForm",

    props: {
        categories: {
            type: Array,
            default: [],
        },

        method: {
            type: String,
            default: "store",
        },

        oldProduct: {
            type: Object,
            default: {},
        },
    },

    data() {
        return {
            newProduct: {
                product_name: null,
                price: null,
                ProductCategoryId: "",
            },

            updateProduct: {
                ProductName: "", 
                Price : "", 
                ProductCategory : {
                    ProductCategoryId : "", 
                    ProductCategoryCode : "", 
                    ProductCategoryName : ""
                }
            },
            updateProductCategoryId : null,
            loading: false,
        };
    },

    methods: {
        createProduct() {
            this.loading = true;
            const formData = new FormData();

            formData.append("product_name", this.newProduct.product_name);
            formData.append("price", this.newProduct.price);
            formData.append(
                "ProductCategoryId",
                this.newProduct.ProductCategoryId
            );
            console.log(this.newProduct);
            axios
                .post(`${apiPrefix}/v1/product`, this.newProduct, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((response) => {
                    console.log(response.data.data);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        funcUpdateProduct() {
            this.loading = true;
            const formData = new FormData();
            formData.append("product_name", this.updateProduct.ProductName);
            formData.append("price", this.updateProduct.Price);
            formData.append(
                "ProductCategoryId",
                this.updateProductCategoryId
            );
            formData.append("product_code", this.updateProduct.ProductCode);
            axios
                .patch(
                    `${apiPrefix}/v1/product/${this.updateProduct.ProductId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                    alert("ERR" + err.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },

    mounted() {
        if(this.method === 'update') {

            console.log(this.oldProduct);
            this.updateProduct = { ...this.oldProduct };
            this.updateProductCategoryId = this.updateProduct.ProductCategory.ProductCategoryId;
    
            console.log(
                "updateProduct",
                this.updateProduct.ProductCategory.ProductCategoryId
            );
        }
    },
};
</script>

<style lang="css" scoped>
form {
    min-width: 400px;
}

.select-wrapper {
    overflow-y: auto;
    height: 150px;
    /* border: 1px solid #ccc; */
    padding: 5px;
}
</style>
