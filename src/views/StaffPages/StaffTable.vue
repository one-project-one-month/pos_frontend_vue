<template>
  <main id="main col-12" class="main">
    <div class="pagetitle">
      <h1>Data Tables</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">Tables</li>
          <li class="breadcrumb-item active">Data</li>
        </ol>
      </nav>
    </div>
    <!-- End Page Title -->

    <section class="section">
      <div class="row">
        <div class="col-12">
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
                    <th>
                      <button @click="createStaffRoute" class="btn btn-success">
                        Add Staff | <i class="fa-solid fa-user-plus"></i>
                      </button>
                    </th>
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
import apiPrefix from "@/apiPrefix";
const staffStore = useStaffStore();
export default {
  name: "StaffTable",
  data() {
    return {
      staffs: [],
      loading: {
        main: false,
        error: false,
      },
    };
  },
  methods: {
    async getStaff() {
      const token = localStorage.getItem("token");
      this.loading.main = true;
      this.loading.error = false;
      await axios
        .get(`${apiPrefix}/v1/staff`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.staffs = response.data.data;
        })
        .catch((err) => {
          console.log(err);
          this.loading.error = true;
          return;
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
    staffDelete(id) {
      let postIdToDelete = id;
      axios
        .delete(`${apiPrefix}/v1/staff/${postIdToDelete}`, {
          headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then((response) => {
          this.getStaff();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createStaffRoute() {
      this.$router.push("/staff/create");
    },
  },
  mounted() {
    this.getStaff();
  },
};
</script>

<style lang="stylus" scoped></style>
