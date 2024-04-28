import { defineStore } from "pinia";
import { computed, ref } from "vue";

const useProductStore = defineStore('product', () => {
    const products = ref([]);

    function setProducts(data) {
        products.value = data;
    }


    const getAllProducts = computed(() => products.value);

    return { products, setProducts, getAllProducts }
});

export default useProductStore;