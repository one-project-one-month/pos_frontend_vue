<template>
    <div class="pagetitle">
        <h1>Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active">Dashboard</li>
            </ol>
        </nav>
    </div>
    <!-- End Page Title -->

    <section class="section dashboard">
        <div class="row">
            <!-- Left side columns -->
            <div class="col-12">
                <div class="row">
                    <!-- Sales Card -->
                    <div class="col-xxl-4 col-md-6">
                        <div class="card info-card sales-card">

                            <div class="card-body">
                                <h5 class="card-title">
                                    Sales
                                </h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                                    >
                                        <i class="bi bi-cart"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>{{ saleInvoices.data.length }}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Sales Card -->

                    <!-- Revenue Card -->
                    <div class="col-xxl-4 col-md-6">
                        <div class="card info-card revenue-card">
                            

                            <div class="card-body">
                                <h5 class="card-title">
                                    Revenue 
                                </h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                                    >
                                        <i class="bi bi-currency-dollar"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>{{ calculateRevenue }} MMK</h6>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Revenue Card -->

                    <!-- Customers Card -->
                    <div class="col-xxl-4 col-xl-12">
                        <div class="card info-card customers-card">

                            <div class="card-body">
                                <h5 class="card-title">
                                    Customers
                                </h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                                    >
                                        <i class="bi bi-people"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>{{ customers.data.length }}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Customers Card -->

                    <!-- Recent Sales -->
                    <div class="col-12">
                        <div class="card recent-sales overflow-auto">

                            <div class="card-body">
                                <h5 class="card-title">
                                    Recent Sales
                                </h5>

                                <table class="table table-borderless datatable">
                                    <thead>
                                        <tr>
                                            <th scope="col">Voucher No</th>
                                            <th scope="col">Customer Code</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in saleInvoices.data" :key="item.VoucherNo">
                                            <th scope="row">
                                                <a style="cursor: pointer;" @click="() => { showSaleInvoice(item) }">{{ item.VoucherNo }}</a>
                                            </th>
                                            <td>{{ item.Customer.CustomerCode }}</td>
                                            
                                            <td>{{ item.PaymentAmount }} MMK</td>
                                            
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- End Recent Sales -->
                </div>
            </div>
            <!-- End Left side columns -->

            
        </div>
    </section>

    <!-- End #main -->
</template>

<script>
import apiPrefix from "@/apiPrefix";
import axios from "axios";
export default {
    name: "Deshboard",
    data() {
        return {
            auth: false,

            saleInvoices: {
                data: [],
                loading: false,
            },

            customers : {
              data : [], 
              loading : false
            }
        };
    },
    methods: {
        authMiddleware() {
            if (!this.auth) {
                console.log("hit ");
                this.$router.push("/login");
            }
        },

        showSaleInvoice(item) {
          console.log(item);
          localStorage.setItem('showSaleInvoice', JSON.stringify(item));
          this.$router.push('/show-sale-invoice');
        },

        fetchSaleInvoices() {
            axios
                .get(`${apiPrefix}/v1/sale-invoices`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                    this.saleInvoices.data = res.data.data;
                }).catch(err => {
                  console.log(err);
                });
        },

        fetchCustomers() {
          axios.get(`${apiPrefix}/v1/customer`, {
            headers : {
              Authorization : `Bearer ${localStorage.getItem("token")}`
            }
          }).then(res => {
            console.log(res.data.data);
            this.customers.data = res.data.data;
          }).catch(err => {
            console.log(err);
          })
        },

        async init() {
            await this.authMiddleware();
            await this.fetchSaleInvoices();
            await this.fetchCustomers();
        },
    },

    computed: {
      calculateRevenue () {
        let result = 0;
        this.saleInvoices.data.forEach(item => {
          result += item.PaymentAmount;
        });
        return result;
      }
    },

    mounted() {
        this.init();
    },
};
</script>

<style lang="stylus" scoped></style>
