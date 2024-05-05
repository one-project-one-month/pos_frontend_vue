import { defineStore } from "pinia";
import { computed, ref } from "vue";

const useCartStore = defineStore("cart", () => {
    /* customer */
    const customer = ref({});

    function setCustomer(value) {
        customer.value = value;
    }

    const getCustomer = computed(() => customer.value);
    /* customer end ------------ */

    /* customers */
    const allCustomers = ref([]);

    function setAllCustomers(value) {
        allCustomers.value = value;
    }

    const getAllCustomers = computed(() => allCustomers.value);
    /* customers --------------------- */

    /* staff */
    const staff = ref({});

    function setStaff(value) {
        staff.value = value;
    }

    const getStaff = computed(() => staff.value);
    /* staff end ------------ */

    /* staff */
    const allStaffs = ref({});

    function setAllStaffs(value) {
        allStaffs.value = value;
    }

    const getAllStaffs = computed(() => allStaffs.value);
    /* staff end ------------ */

    /* products */
    const allProducts = ref([]);

    function setAllProducts(value) {
        allProducts.value = value;
    }

    const getAllProducts = computed(() => allProducts.value);

    const getAllProductsWithAmount = computed(() => {
        console.log(allProducts.value.length)
        if (allProducts.value.length === 0) {
            return [];
        } else {
            const arrayWithoutZeros = [...allProducts.value].filter(
                (item) => item.quantity > 0
            );
            console.log('without zeros',arrayWithoutZeros[0]);
            return [...arrayWithoutZeros].map((pro) => {
                return { ...pro, amount: Number(pro.quantity) * Number(pro.price) };
            });
        }
    });
    /* products end ------------ */

    function resetCart () {
        this.setCustomer({});
        this.setStaff({});
        this.setAllProducts([]);

    }

    return {
        setCustomer,
        getCustomer,
        setAllCustomers,
        getAllCustomers,
        getStaff,
        setStaff,
        setAllStaffs,
        getAllStaffs,
        setAllProducts,
        getAllProducts,
        getAllProductsWithAmount,
        resetCart
    };
});

export default useCartStore;
