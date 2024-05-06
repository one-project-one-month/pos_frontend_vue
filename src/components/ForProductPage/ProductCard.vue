<template>
    <div class="card" style="width: 18rem">
        <div class="card-body">
            <h5 class="card-title">{{ item.ProductName }}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
                {{ item.ProductCategory.ProductCategoryName }}
            </h6>
            <p class="card-text">
                Price :
                <span class="fw-bold">{{ item.Price }}</span> MMK
            </p>
            <p class="card-text">
                Product Code :
                <span class="fw-bold">{{ item.ProductCode }}</span>
            </p>
            <span class="card-link text-danger" @click="deleteProduct"
                >Delete Product</span
            >
            |
            <span @click="openEditModel" class="card-link text-primary"
                >Edit Product</span
            >
        </div>
        <div
            class="card-footer d-flex justify-content-between align-items-center"
        >
            <button class="btn btn-success" @click="addToCart">
                Add To Cart
            </button>
            <div class="btn btn-dark" @click="$router.push('/cart')">
                <i class="bi bi-cart me-2"></i>
                <span>{{ quantityInCart }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import useLayoutStore from "@/store/layoutStore";
import apiPrefix from "@/apiPrefix";
import Model from "../Model.vue";
import ProductForm from "./ProductForm.vue";
import useCartStore from "@/store/cartStore";
export default {
    name: "ProductCard",

    emits: ["delete-product", "openEditModel"],

    components: {
        Model,
        ProductForm,
    },

    props: {
        item: {
            type: Object,
            default: {},
        },
    },

    data() {
        return {
            cartStore: useCartStore(),
        };
    },

    methods: {
        deleteProduct() {
            //delete in server
            axios
                .delete(`${apiPrefix}/v1/product/${this.item.ProductId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.message);
                    alert("Error in deleteing the product, Try Agin Later.");
                    window.location.reload();
                });
            //delete in client side
            this.$emit("delete-product", this.item.ProductId);
        },
        openEditModel() {
            this.$emit("openEditModel", this.item);
        },
        addToCart() {
            const product = {
                product_code: this.item.ProductCode,
                quantity: 1,
                price: this.item.Price,
                product_name: this.item.ProductName,
            };

            const sameProduct = this.cartStore.getAllProducts.find(
                (whatevs) => whatevs.product_code == product.product_code
            );

            if (!!!sameProduct) {
                this.cartStore.setAllProducts([
                    ...this.cartStore.getAllProducts,
                    product,
                ]);
            } else {
                this.cartStore.setAllProducts(
                    [...this.cartStore.getAllProducts].map((whatevs) => {
                        if (product.product_code == whatevs.product_code) {
                            return {
                                ...whatevs,
                                quantity: whatevs.quantity + 1,
                            };
                        } else {
                            return whatevs;
                        }
                    })
                );
            }

            console.log(this.cartStore.getAllProducts);
        },
    },

    mounted() {},

    computed: {
        showModel() {
            const layoutStore = useLayoutStore();
            return layoutStore.getShowModel;
        },

        allProducts () {
            return this.cartStore.getAllProducts;
        },

        quantityInCart() {
            const product = this.allProducts.find(
                (pro) => pro.product_code == this.item.ProductCode
            );
            console.log(product);

            if (!!!product) {
                return 0;
            } else {
                return product.quantity;
            }
        },
    },
};
</script>

<style lang="css" scoped></style>
