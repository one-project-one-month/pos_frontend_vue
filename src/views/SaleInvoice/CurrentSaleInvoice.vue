<template>
    <div>
        <h1>Latest Sale Invoice</h1>

        <div v-if="saleInvoice === null">Loading....</div>

        <div v-else id="forPdf" class="p-3">
            <div class="d-flex gap-3">
                <div class="theBorder">
                    <p>
                        Voucher No: <span>{{ saleInvoice.VoucherNo }}</span>
                    </p>
                    <p>
                        {{ saleInvoice.Customer.CustomerName }} (<span>{{
                            saleInvoice.Customer.CustomerCode
                        }}</span
                        >)
                    </p>
                </div>

                <div class="d-flex gap-3 theBorder">
                    <div class="theBorder">
                        <p>
                            Total Amount :
                            <span>{{ saleInvoice.TotalAmount }}</span> MMK
                        </p>
                        <p>
                            Discount :
                            <span
                                >{{
                                    Number(saleInvoice.Discount).toFixed(2)
                                }}
                                MMK</span
                            >
                        </p>
                        <p>
                            Tax :
                            <span
                                >{{
                                    Number(saleInvoice.Tax).toFixed(2)
                                }}
                                MMK</span
                            >
                        </p>
                    </div>
                    <div>
                        <p>
                            Payment Amount :
                            <span
                                >{{
                                    Number(saleInvoice.PaymentAmount).toFixed(2)
                                }}
                                MMK</span
                            >
                        </p>
                        <p>
                            Received Amount :
                            <span>{{ saleInvoice.ReceiveAmount }} MMK</span>
                        </p>
                        <p>
                            Change :
                            <span
                                >{{
                                    Number(saleInvoice.Change).toFixed(2)
                                }}
                                MMK</span
                            >
                        </p>
                    </div>
                </div>

                <div>
                    <p>
                        Date :
                        <span>{{ saleInvoice.SaleInvoiceDateTime }}</span>
                    </p>
                </div>
            </div>

            <div v-if="!!saleInvoice.items">
                <h3>Products</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Code</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="product in saleInvoice.items"
                            :key="product.product_code"
                        >
                            <td>{{ product.product_name }}</td>
                            <td>{{ product.product_code }}</td>
                            <td>{{ product.price }} MMK</td>
                            <td>{{ product.quantity }}</td>
                            <td>{{ product.amount }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div>
                    <h3>Assigned Staff</h3>
                    <p>
                        {{ saleInvoice.Staff.StaffName }}
                        <span>({{ saleInvoice.Staff.StaffCode }})</span>
                    </p>
                </div>

                <div>
                    <h3>Branch</h3>
                    <p>{{ saleInvoice.Staff.shop.ShopName }}</p>
                    <p>
                        {{ saleInvoice.Staff.shop.ShopAddress }} (<span>{{
                            saleInvoice.Staff.shop.ShopCode
                        }}</span
                        >)
                    </p>
                </div>
            </div>
        </div>

        <button class="btn btn-success" @click="downloadPdf" v-if="saleInvoice">Download PDF</button>
        <button class="btn btn-dark ms-3" @click="() => { $router.push('/product')}" v-if="saleInvoice">Back to Products</button>
    </div>
</template>

<script>
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
export default {
    name: "CurrentSaleInvoice",

    data() {
        return {
            saleInvoice: null,
            pdfLoading : false
        };
    },

    methods: {
        fetchInvoice() {
            this.saleInvoice = localStorage.getItem("currentSaleInvoice");
            this.saleInvoice = JSON.parse(this.saleInvoice) || null;
        },

        downloadPdf() {
            this.pdfLoading = true;
            const divToPrint = document.getElementById("forPdf");
            const contentHeight = divToPrint.offsetHeight;

            html2canvas(divToPrint, {
                scale: 0.8, // Optional: Scale the canvas for better quality
            }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const doc = new jsPDF({
                    unit : 'pt', 
                    format : [canvas.width, Math.max(contentHeight + 20, canvas.height)]
                });
                doc.addImage(imgData, "PNG", 0, 0);
                doc.save(`${this.saleInvoice.VoucherNo}.pdf`);
            }).catch((err) => {
                alert("error downloading pdf");
            }).finally(() => {
                this.pdfLoading = false;
            });
        },
    },

    async mounted() {
        this.fetchInvoice();
        console.log(this.saleInvoice);
    },
};
</script>

<style lang="css" scoped>
.theBorder {
    border-right: 1px solid black;
    padding: 0px 20px;
}

span {
    font-weight: bold;
}
</style>
