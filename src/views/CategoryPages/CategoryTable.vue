<template>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1>General Tables</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item">Tables</li>
          <li class="breadcrumb-item active">General</li>
        </ol>
      </nav>
    </div>
    <!-- End Page Title -->

    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Default Table</h5>

              <!-- Default Table -->
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Category ID</th>
                    <th scope="col">Category Code</th>
                    <th scope="col">Category Name</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody v-if="productCategory.length != 0">
                  <tr v-for="(category, index) in productCategory" :key="index">
                    <td scope="row">{{ category.ProductCategoryId }}</td>
                    <td>{{ category.ProductCategoryCode }}</td>
                    <td>{{ category.ProductCategoryName }}</td>
                    <td>
                      <button
                        @click="staffDetail(staff.StaffId)"
                        class="me-2 btn btn-primary"
                      >
                        <i class="fa-solid fa-user-pen"></i> |
                        <i class="fa-solid fa-eye"></i>
                      </button>

                      <button
                        @click="staffDelete(staff.StaffId)"
                        class="btn btn-danger"
                      >
                        <i class="fa-solid fa-user-minus"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- End Default Table Example -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>

<script>
import axios from "axios";

export default {
  name: "CategoryTable",
  data() {
    return {
      productCategory: {},
    };
  },
  methods: {
    productCategoryGetData() {
      axios
        .get("http://127.0.0.1:8000/api/product-categories")
        .then((response) => {
          this.productCategory = response.data.data;
          console.log(this.productCategory);
        });
    },
  },
  mounted() {
    this.productCategoryGetData();
  },
};
</script>

<style lang="stylus" scoped></style>
