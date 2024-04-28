<template>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1>Staff Form</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/staff">Staff</router-link>
          </li>
          <li class="breadcrumb-item active">Form</li>
        </ol>
      </nav>
    </div>
    <!-- End Page Title -->
    <section class="section">
      <div class="row">
        <div
          class="offset-lg-2 col-lg-8 offset-md-1 col-md-10 offset-sm-0 col-sm-12"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Staff Form</h5>

              <!-- Vertical Form -->
              <form action="">
                <div class="row g-3">
                  <div class="col-12">
                    <label for="inputNanme4" class="form-label"
                      >Staff Name</label
                    >
                    <input
                      type="text"
                      v-model="StaffData.staffName"
                      class="form-control"
                      id="inputNanme4"
                      required
                    />
                  </div>
                  <div class="col-12">
                    <label for="inputEmail4" class="form-label"
                      >Date Of Birth</label
                    >
                    <input
                      v-model="StaffData.dateOfBirth"
                      type="date"
                      class="form-control"
                      id="inputEmail4"
                      required
                    />
                  </div>
                  <div class="col-12">
                    <label for="inputEmail4" class="form-label"
                      >Mobile Number</label
                    >
                    <input
                      v-model="StaffData.mobileNo"
                      type="text"
                      class="form-control"
                      id="inputEmail4"
                      required
                    />
                  </div>
                  <div class="col-12">
                    <label for="inputAddress" class="form-label">Address</label>
                    <input
                      type="text"
                      v-model="StaffData.address"
                      class="form-control"
                      id="inputAddress"
                      required
                    />
                  </div>
                  <div class="col-12">
                    <label for="inputAddress" class="form-label">Gender</label>
                    <select
                      class="form-control"
                      name="gender"
                      v-model="StaffData.gender"
                      id=""
                      required
                    >
                      <option value="">Choose Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <label for="inputAddress" class="form-label"
                      >Position</label
                    >
                    <input
                      type="text"
                      v-model="StaffData.position"
                      class="form-control"
                      id="inputAddress"
                      required
                    />
                  </div>
                  <div class="text-center row m-auto mt-2">
                    <div class="col-6 p-2">
                      <button
                        @click="staffCreate"
                        class="btn col-12 btn-success"
                      >
                        Create
                      </button>
                    </div>
                    <div class="col-6 p-2">
                      <button @click="staffTable" class="btn col-12 btn-danger">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <!-- Vertical Form -->
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
  name: "StaffCreate",
  data() {
    return {
      StaffData: {
        staffName: "",
        dateOfBirth: "",
        mobileNo: "",
        address: "",
        gender: "",
        position: "",
      },
    };
  },
  methods: {
    staffCreate() {
      axios
        .post("http://127.0.0.1:8000/api/staff", this.StaffData)
        .then((response) => console.log(response.data));
    },
    staffTable() {
      this.$router.push("/staff");
    },
  },
};
</script>

<style lang="stylus" scoped></style>
