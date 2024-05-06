import axios from "axios";
import apiPrefix from "@/apiPrefix";
import useLayoutStore from "@/store/layoutStore";
import Model from "@/components/Model.vue";
import useCartStore from "@/store/cartStore";


export default {
    name: "CartPage",

    components: {
        Model
    },

    data () {
        return {
            cartStore : useCartStore(), 

            modelComponent : "",
            allCustomersLoading : false, 

            allStaffsLoading : false, 
            checkoutLoading : false,

            paymentMethod : "", 

            receivedAmount : ""
            
            
        }
    },

    methods: {
        fetchCustomers () {
            this.allCustomersLoading = true;

            axios.get(`${apiPrefix}/v1/customer`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => {
                console.log(res.data);
                const cartStore = useCartStore();
                cartStore.setAllCustomers(res.data.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.allCustomersLoading = false;
            });
        }, 

        fetchStaffs () {
            this.allStaffsLoading = true;

            axios.get(`${apiPrefix}/v1/staff`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => {
                console.log(res.data);
                const cartStore = useCartStore();
                cartStore.setAllStaffs(res.data.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.allStaffsLoading = false;
            });
        },

        openCustomerCreateForm() {
            this.modelComponent = "CustomerCreateForm";
            const layoutStore = useLayoutStore();
            layoutStore.controlModel(true);
        },

        openStaffCreateForm() {
            this.modelComponent = "StaffCreateForm";
            const layoutStore = useLayoutStore();
            layoutStore.controlModel(true);
        },

        setCustomer(e) {
            const cusId = e.target.value;
            const customer = this.allCustomers.find((cus) => cus.CustomerId == cusId);
            this.cartStore.setCustomer(customer);
            console.log(this.cartStore.getCustomer);
        }, 
        setStaff(e) {
            const staffId = e.target.value;
            const staff = this.allStaffs.find((staff) => staff.StaffId == staffId);
            this.cartStore.setStaff(staff);
            console.log(this.cartStore.getStaff);
        }, 

        increaseProduct(productCode) {
            const result = [...this.cartStore.getAllProducts].map(product => {
                if(product.product_code == productCode) {
                    return {...product, quantity: product.quantity + 1}
                } else {
                    return product;
                }
            })
            this.cartStore.setAllProducts(result);
        }, 

        decreaseProduct(productCode) {
            const result = [...this.cartStore.getAllProducts].map(product => {
                if(product.product_code == productCode) {
                    return {...product, quantity: product.quantity - 1}
                } else {
                    return product;
                }
            })
            this.cartStore.setAllProducts(result);
        }, 

        removeProduct(productCode) {
            const result = [...this.cartStore.getAllProducts].filter(pro => pro.product_code !== productCode);
            this.cartStore.setAllProducts(result);
        }, 


        checkout() {
            if(this.cartStore.getAllProducts.length === 0) {
                alert("You can't checkout without any products");
                return;
            } else if(!this.validation) {
                alert("You need to fill all the necessary information.");
                return;
            } else if(
                Number(this.receivedAmount) < ((this.totalAmountForAllProducts - (this.totalAmountForAllProducts * (3/100))) +  (this.totalAmountForAllProducts * (10/100))).toFixed(2)
            ) {
                alert("Received Amount cannot be less than the final amount...");
                return;
            }
            const confirmation = window.confirm(`Are you sure all the information are correct and proceed the checkout process??`);
            if(!confirmation) return;

            this.checkoutLoading = true;
            const saleInvoice = {
                total_amount : this.totalAmountForAllProducts,
                discount : (this.totalAmountForAllProducts * (3/100)).toFixed(2), 
                tax : (this.totalAmountForAllProducts * (10/100)).toFixed(2), 
                payment_type : this.paymentMethod, 
                payment_amount : ((this.totalAmountForAllProducts - (this.totalAmountForAllProducts * (3/100))) +  (this.totalAmountForAllProducts * (10/100))).toFixed(2),
                receive_amount : this.receivedAmount, 
                change : Number(this.receivedAmount) - ((this.totalAmountForAllProducts - (this.totalAmountForAllProducts * (3/100))) +  (this.totalAmountForAllProducts * (10/100))).toFixed(2), 
                items : this.allProductsWithAmount, 
                staff_id : this.selectedStaffId, 
                customer_id : this.selectedCustomerId
            }

            axios.post(`${apiPrefix}/v1/sale-invoices`, JSON.stringify(saleInvoice), {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`, 
                    "Content-Type" : "application/json", 
                    Accept : "application/json"
                }
            }).then(res=> {
                // console.log(res.data);
                localStorage.setItem("currentSaleInvoice", JSON.stringify({
                    ...res.data.data, 
                    items : this.allProductsWithAmount
                }));
                this.cartStore.resetCart();
                this.paymentMethod = "";
                this.receivedAmount = "";
                this.$router.push({ name : "current-sale-invoice"});
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.checkoutLoading = false;
            });
        }
    }, 

    computed: {
        showModel () {
            const layoutStore = useLayoutStore();
            return layoutStore.getShowModel;
        }, 

        allCustomers () {
            return this.cartStore.getAllCustomers;
        }, 

        allStaffs () {
            
            return this.cartStore.getAllStaffs;
        }, 

        selectedStaffId () {
            return this.cartStore.getStaff.StaffId || "";
        },

        selectedCustomerId () {
            return this.cartStore.getCustomer.CustomerId || "";
        }, 

        allProductsWithAmount() {
            return this.cartStore.getAllProductsWithAmount || [];
        },

        totalAmountForAllProducts() {
            let total = 0;
            this.allProductsWithAmount.forEach((product) => {
                total += product.amount;
            });
            return total;
        }, 

        validation() {
            if(
                this.selectedCustomerId === "" ||
                this.selectedStaffId === "" ||
                this.paymentMethod === ""
            ){
                return false;
            } else {
                return true;
            }
        }
    },



    mounted () {
        console.log('allProducts',this.cartStore.getAllProducts);
        console.log('withAmounts', this.cartStore.getAllProductsWithAmount);
        this.fetchCustomers();
        this.fetchStaffs();
    }
};