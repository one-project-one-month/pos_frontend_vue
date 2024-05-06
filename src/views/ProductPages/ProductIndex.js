import axios from "axios";
import apiPrefix from "@/apiPrefix";
import useProductStore from "@/store/productStore.js";
import ProductCard from "../../components/ForProductPage/ProductCard.vue";
import Model from "../../components/Model";
import useLayoutStore from "@/store/layoutStore";
import ProductForm from "../../components/ForProductPage/ProductForm.vue";
import useCartStore from "@/store/cartStore";

export default {
    name: "ProductIndex",

    components: {
        ProductCard,
        Model,
        ProductForm,
    },

    data() {
        return {
            cartStore : useCartStore(),
            products: [],
            categories: [],
            loading: {
                main: false,
                error: false,
            },

            modelMethod : null, 
            productToBeUpdate : {}
        };
    },

    mounted() {
        this.fetchData();
    },

    methods: {
        async fetchData() {
            this.loading.main = true;
            this.loading.error = false;
            await axios
                .get(`${apiPrefix}/v1/product`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    console.log('here');
                    const productStore = useProductStore();
                    productStore.setProducts(res.data.data);
                    this.products = productStore.getAllProducts;
                    console.log(this.products[0]);
                })
                .catch((err) => {
                    console.log(err);
                    this.loading.error = true;
                    alert(`Your session has expired, please relogin`);
                    localStorage.removeItem("token");
                    window.location.reload();
                });

            await axios
                .get(`${apiPrefix}/v1/product-categories`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    this.categories = res.data.data;
                    console.log(this.categories);
                })
                .catch((err) => {
                    console.log(err);
                    this.loading.error = true;
                    alert(`Your session has expired, please relogin`);
                    localStorage.removeItem("token");
                    window.location.reload();
                });

            this.loading.main = false;
        },

        findCategoryForEachProduct(productCategoryId) {
            return this.categories.find(
                (catego) => catego.ProductCategoryId === productCategoryId
            ).ProductCategoryName;
        },

        deleteProduct(id) {
            console.log("delete", id);
            this.products = this.products.filter((item) => {
                return item.ProductId !== id;
            });
        },

        openModel () {
            this.modelMethod = "store";
            const layoutStore = useLayoutStore();
            layoutStore.controlModel(true);
        }, 

        openEditModel(product) {
            this.modelMethod = "update";
            this.productToBeUpdate = product;
            const layoutStore = useLayoutStore();
            layoutStore.controlModel(true);
        }
    },

    computed: {
        showModel() {
            const layoutStore = useLayoutStore();
            return layoutStore.getShowModel;
        },

        totalProductsInCart () {
            return this.cartStore.getAllProducts.length;
        }
    },
};
