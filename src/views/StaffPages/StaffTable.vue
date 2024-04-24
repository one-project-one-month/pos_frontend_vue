<template>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1>Data Tables</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item">Tables</li>
          <li class="breadcrumb-item active">Data</li>
        </ol>
      </nav>
    </div>
    <!-- End Page Title -->

    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Staff Datatables</h5>

              <!-- Table with stripped rows -->
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th data-type="date" data-format="YYYY/DD/MM">
                      Date Of Birth
                    </th>
                    <th>Mobiel Number</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody v-if="staffs.length != 0">
                  <tr v-for="(staff, index) in staffs" :key="index">
                    <td>{{ staff.StaffId }}</td>
                    <td>{{ staff.StaffCode }}</td>
                    <td>{{ staff.StaffName }}</td>
                    <td>{{ staff.DateOfBirth }}</td>
                    <td>{{ staff.MobileNo }}</td>
                    <td>
                      <button class="me-2 btn btn-warning">
                        <i class="fa-solid fa-user-pen"></i>
                      </button>
                      <button
                        @click="staffDetail(staff.StaffId)"
                        class="me-2 btn btn-primary"
                      >
                        <i class="fa-solid fa-eye"></i>
                      </button>
                      <button class="btn btn-danger">
                        <i class="fa-solid fa-user-minus"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- End Table with stripped rows -->
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
import { useStaffStore } from "@/stores/staff";
import router from "@/router";
const staffStore = useStaffStore();
export default {
  name: "StaffTable",
  data() {
    return {
      staffs: [],
    };
  },
  methods: {
    getStaff() {
      axios.get("http://127.0.0.1:8000/api/staff").then((response) => {
        this.staffs = response.data.data;
      });
    },
    staffDetail(id) {
      this.$router.push({
        path: "/staff/detail",
        query: {
          staffId: id,
        },
      });
    },
  },
  mounted() {
    this.getStaff();
  },
};
</script>

<style lang="stylus" scoped></style>
