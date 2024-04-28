<template>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1>Staff Deatil</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/staff">Staff</router-link>
          </li>
          <li class="breadcrumb-item active">Detail</li>
        </ol>
      </nav>
      <router-link to="/staff" class="text-dark fw-bold"
        ><i class="fa-solid fa-left-long"></i> Back</router-link
      >
    </div>
    <!-- End Page Title -->
    <section class="section">
      <div class="row">
        <section class="offset-3 col-lg-6">
          <div class="card">
            <div class="card-body">
              <div class="row pt-2 ps-2">
                <h5 class="card-title col-4">Staff Deatil</h5>
                <div class="col-8 pt-2">
                  <div
                    v-if="showSuccess"
                    class="alert alert-success alert-dismissible fade show col-12"
                    role="alert"
                  >
                    <strong>Update Successful</strong>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                      @click="showSuccess = false"
                    ></button>
                  </div>
                </div>
              </div>

              <!-- Vertical Form -->
              <form id="form" class="row g-3" @submit="getData">
                <div class="col-12">
                  <label for="inputNanme4" class="form-label">Staff Code</label>
                  <input
                    type="text"
                    v-model="staffInfo.StaffCode"
                    class="form-control"
                    id="inputNanme4"
                    disabled
                    name="staffCode"
                  />
                </div>
                <input
                  type="text"
                  v-model="StaffID"
                  class="form-control"
                  id="inputNanme4"
                  hidden
                  name="staffId"
                />
                <div class="col-12">
                  <label for="inputNanme4" class="form-label">Name</label>
                  <input
                    type="text"
                    v-model="staffInfo.StaffName"
                    class="form-control"
                    id="inputNanme4"
                    :disabled="isdisable"
                    name="staffName"
                  />
                </div>
                <div class="col-12">
                  <label for="inputAddress" class="form-label"
                    >Date Of Birth</label
                  >
                  <input
                    type="Date"
                    class="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                    v-model="staffInfo.DateOfBirth"
                    :disabled="isdisable"
                    name="dateOfBirth"
                  />
                </div>

                <div class="col-12">
                  <label for="inputAddress" class="form-label">Mobile No</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                    v-model="staffInfo.MobileNo"
                    :disabled="isdisable"
                    name="mobileNo"
                  />
                </div>
                <div class="col-12">
                  <label for="inputNanme4" class="form-label">Address</label>
                  <input
                    type="text"
                    v-model="staffInfo.Address"
                    class="form-control"
                    id="inputNanme4"
                    :disabled="isdisable"
                    name="address"
                  />
                </div>
                <div class="col-12">
                  <label for="inputName4" class="form-label">Gender</label>
                  <select
                    name="gender"
                    id="inputGender"
                    class="form-control"
                    :disabled="isdisable"
                    v-model="staffInfo.Gender"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div class="col-12">
                  <label for="inputNanme4" class="form-label">Position</label>
                  <input
                    type="text"
                    v-model="staffInfo.Position"
                    class="form-control"
                    id="inputNanme4"
                    name="position"
                    :disabled="isdisable"
                  />
                </div>
                <div class="mt-3 row m-auto">
                  <div class="col-6">
                    <button
                      type="submit"
                      v-if="!isdisable"
                      class="col-12 btn btn-success"
                    >
                      Save
                    </button>
                  </div>
                  <div class="col-6">
                    <a
                      v-if="!isdisable"
                      @click="isCancel()"
                      class="col-12 btn btn-danger"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </form>
              <button
                v-if="isdisable"
                @click="isDisable()"
                class="col-12 btn btn-primary"
              >
                Edit
              </button>

              <!-- Vertical Form -->
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "StaffDetail",
  message: "",
  data() {
    return {
      StaffID: this.$route.query.staffId,
      staffInfo: {},
      isdisable: true,
      message: "",
      showSuccess: false,
    };
  },
  methods: {
    getData(e) {
      e.preventDefault();
      const StaffData = {
        staffId: "",
        staffCode: "",
        staffName: "",
        dateOfBirth: "",
        mobileNo: "",
        address: "",
        gender: "",
        position: "",
      };
      StaffData.staffId = e.target.elements.staffId.value;
      StaffData.staffCode = e.target.elements.staffCode.value;
      StaffData.staffName = e.target.elements.staffName.value;
      StaffData.dateOfBirth = e.target.elements.dateOfBirth.value;
      StaffData.mobileNo = e.target.elements.mobileNo.value;
      StaffData.address = e.target.elements.address.value;
      StaffData.gender = e.target.elements.gender.value;
      StaffData.position = e.target.elements.position.value;
      axios
        .patch(
          `http://127.0.0.1:8000/api/staff/${StaffData.staffId}`,
          StaffData
        )
        .then((response) => {
          this.message = response.data.message;
        })
        .catch((error) => {
          console.error("Error updating staff data:", error);
        });
      this.isdisable = !this.isdisable;
      this.showSuccess = true;
    },

    isDisable() {
      this.isdisable = !this.isdisable;
    },
    isCancel() {
      this.isdisable = !this.isdisable;
      this.staffDetail();
    },
    staffDetail() {
      axios
        .get(`http://127.0.0.1:8000/api/staff/${this.StaffID}`)
        .then((response) => {
          this.staffInfo = response.data.data;
        });
    },
  },
  mounted() {
    this.staffDetail();
  },
};
</script>

<style lang="css" scoped></style>
