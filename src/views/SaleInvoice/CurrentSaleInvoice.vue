<template>
    <div>
        <h1>Current Sale Invoice</h1>
    </div>
</template>

<script>
    import useSaleInvoiceStore from '@/store/saleInvoiceStore';
    export default {
        name : "CurrentSaleInvoice", 

        data () {
            return {
                saleInvoiceStore: useSaleInvoiceStore(), 
            }
        },

        computed: {
            saleInvoice () {
                return this.saleInvoiceStore.getCurrentSaleInvoice;
            }
        },
    }
</script>

<style lang="css" scoped>

</style>
