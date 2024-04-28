import axios from "axios";
import apiPrefix from "@/apiPrefix";
import useProductStore from "@/store/productStore.js";

export default {
    name: "ProductIndex",

    data() {
        return {
            products: [],
            categories: [],
            loading : {
                main : false, 
                error : false
            }
        };
    },

    mounted() {
        this.fetchData();
    },

    methods: {
        async fetchData() {
            const token = localStorage.getItem("token");
            this.loading.main = true;
            this.loading.error = false;
            await axios
                .get(`${apiPrefix}/v1/product`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    const productStore = useProductStore();
                    productStore.setProducts(res.data.data);
                    this.products = productStore.getAllProducts;
                    
                    console.log(this.products);
                })
                .catch((err) => {
                    console.log(err);
                    this.loading.error = true;
                    return;
                });

            
            await    axios
                .get(`${apiPrefix}/v1/product-categories`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    this.categories = res.data.data;
                    console.log(this.categories);
                })
                .catch((err) => {
                    console.log(err);
                    this.loading.error = true;
                    return;
                });

            this.loading.main = false;
            
        },
    },
};
