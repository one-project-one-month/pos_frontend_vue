import { defineStore } from "pinia";
import { computed, ref } from "vue";

const useSaleInvoiceStore = defineStore("saleInvoice", () => {
    /* current sale invoice */
    const currentSaleInvoice = ref({});

    function setCurrentSaleInvoice (value) {
        currentSaleInvoice.value = value;
    }

    const getCurrentSaleInvoice = computed(() => currentSaleInvoice.value);
    /* current sale invoice end -------- */

    return {
        setCurrentSaleInvoice, 
        getCurrentSaleInvoice
    }
});

export default useSaleInvoiceStore;
