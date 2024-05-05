<template>
    <div>
        <h1>Cart</h1>
        <hr />
        <div>
            <h5 class="fw-bold text-primary">Customer</h5>
            <div class="customerContainer">
                <div class="width45">
                    <label>Old customers</label>
                    <div v-if="allCustomersLoading" class="customerLoader">Loading......</div>
                    <select v-else class="form-control w-100" @change="(e) => { setCustomer(e) }" :value="selectedCustomerId">
                        <option disabled selected value="">
                            Choose an Old Customer
                        </option>
                        <option v-for="customer in allCustomers" :key="customer.CustomerId" :value="customer.CustomerId">{{ customer.CustomerName }}</option>
                        
                    </select>
                </div>

                <div class="width45">
                    <label class="w-100" for="">New Customer??</label>
                    <button class="btn btn-dark" @click="openCustomerCreateForm">Create</button>
                </div>
            </div>
        </div>
        <hr />
        <div>
            <h5 class="fw-bold text-primary">Assigned Staff</h5>
            <div class="customerContainer">
                <div class="width45">
                    <label>You Work Here?</label>
                    <div v-if="allStaffsLoading" class="staffLoader">Loading....</div>
                    <select v-else class="form-control w-100" @change="(e) => { setStaff(e) }" :value="selectedStaffId">
                        <option disabled selected value="">
                            Choose YourSelf
                        </option>
                        <option v-for="staff in allStaffs" :key="staff.StaffId" :value="staff.StaffId">{{ staff.StaffName }}</option>
                    </select>
                </div>

                <div class="width45">
                    <label class="w-100" for="">Are You New Here?</label>
                    <button class="btn btn-dark" @click="openStaffCreateForm">
                        Assign Yourself in the List
                    </button>
                </div>
            </div>
        </div>
        <hr />
        <div>
            <table class="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price (each)</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price x Quantity</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody v-if="allProductsWithAmount.length === 0">
                    <tr class="table-info">
                        <td colspan="3">There is no products in the cart right now..</td>
                        <td colspan="2">
                            <button @click="$router.push('/product')" class="btn btn-dark">Add products</button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr v-for="product in allProductsWithAmount" :key="product.product_code">
                        <th scope="row">{{ product.product_name }}</th>
                        <td>{{ product.price }}</td>
                        <td>
                            <button class="btn btn-success" @click="() => { increaseProduct(product.product_code) }">+</button>
                            <button class="btn btn-dark">{{ product.quantity }}</button>
                            <button class="btn btn-danger" @click="() => { decreaseProduct(product.product_code) }">-</button>
                        </td>
                        <td>{{ product.amount }}</td>
                        <td class="text-left">
                            <button class="btn btn-danger" @click="() => { removeProduct(product.product_code) }">X</button>
                        </td>
                    </tr>
                    <tr class="table-info">
                        <td colspan="4"></td>
                        <td>
                            <button @click="$router.push('/product')" class="btn btn-dark">Add More products</button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">Total Amount For Products</td>
                        <td>{{ totalAmountForAllProducts }}</td>
                    </tr>
                    <tr>
                        <td colspan="4">Discount</td>
                        <td>{{ (totalAmountForAllProducts * (3/100)).toFixed(2) }}</td>
                    </tr>
                    <tr>
                        <td colspan="4">Tax</td>
                        <td>{{ (totalAmountForAllProducts * (10/100)).toFixed(2) }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-between align-items-center mt-4 mb-5">
                <div class="width45">
                    <p>Final Amount</p>
                    <p class="fw-bold">
                        {{ 
                            ((totalAmountForAllProducts - (totalAmountForAllProducts * (3/100))) +  (totalAmountForAllProducts * (10/100))).toFixed(2)
                        }}
                    </p>
                </div>
                <div class="width45">
                    <label for="">Payment Type</label>
                    <select class="form-control" v-model="paymentMethod">
                        <option disabled selected value="">Select</option>
                        <option value="cash">Cash</option>
                        <option value="kbzpay">KBZ Pay</option>
                        <option value="ayapay">AYA Pay</option>
                    </select>
                </div>
            </div>

            <div class="input-group w-50 my-4">
                <label class="col-12" for="">Received Amount</label>
                <input v-model="receivedAmount" type="number" class="form-control" placeholder="How much the customer paid..">
            </div>
        </div>

        <div class="text-center">
            <button class="btn btn-success" @click="checkout">
                <span v-if="checkoutLoading">Loading...</span>
                <span v-else>Checkout</span>
            </button>
        </div>
    </div>

    <Transition>
        <template>
            <Model v-if="showModel" :propComponent="modelComponent">
            </Model>
        </template>
    </Transition>
</template>

<script src="./CartPage.js"></script>



<style lang="css" scoped>
*{
    font-size: 0.8rem !important;
}
.width45 {
    width: 45%;
}

.customerContainer {
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: flex-start;
    margin-bottom: 20px;
}

button {
    font-size: 0.7em !important;
}
</style>
