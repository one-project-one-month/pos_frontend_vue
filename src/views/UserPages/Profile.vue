<template>
    <div class="pagetitle">
        <h1>Profile</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item">Users</li>
                <li class="breadcrumb-item active">Profile</li>
            </ol>
        </nav>
    </div>
    <!-- End Page Title -->

    <section class="section profile">
        <div class="row">
            <div class="col-xl-4">
                <div class="card">
                    <div
                        class="card-body profile-card pt-4 d-flex flex-column align-items-center"
                    >
                        <h2>{{ user.name }}</h2>
                        <h3>{{ user.email }}</h3>
                        <div class="social-links mt-2">
                            <a href="#" class="twitter"
                                ><i class="bi bi-twitter"></i
                            ></a>
                            <a href="#" class="facebook"
                                ><i class="bi bi-facebook"></i
                            ></a>
                            <a href="#" class="instagram"
                                ><i class="bi bi-instagram"></i
                            ></a>
                            <a href="#" class="linkedin"
                                ><i class="bi bi-linkedin"></i
                            ></a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-8">
                <div class="card">
                    <div class="card-body pt-3">
                        <!-- Bordered Tabs -->
                        <ul class="nav nav-tabs nav-tabs-bordered">
                            <li class="nav-item">
                                <button
                                    class="nav-link active"
                                    data-bs-toggle="tab"
                                    data-bs-target="#profile-overview"
                                >
                                    Overview
                                </button>
                            </li>
                        </ul>
                        <div class="tab-content pt-2">
                            <div
                                class="tab-pane fade show active profile-overview"
                                id="profile-overview"
                            >
                                <h5 class="card-title">About</h5>
                                <h5 class="card-title">Profile Details</h5>

                                <div class="row">
                                    <div class="col-lg-3 col-md-4 label">
                                        Full Name
                                    </div>
                                    <div class="col-lg-9 col-md-8">
                                        {{ user.name }}
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-4 label">
                                        Phone
                                    </div>
                                    <div class="col-lg-9 col-md-8">
                                        {{ user.phone }}
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-4 label">
                                        Address
                                    </div>
                                    <div class="col-lg-9 col-md-8">
                                        {{ user.address }}
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-3 col-md-4 label">
                                        Email
                                    </div>
                                    <div class="col-lg-9 col-md-8">
                                        {{ user.email }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Bordered Tabs -->
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End #main -->
</template>

<script>
import useUserStore from "../../store/userStore";
export default {
    name: "Profile",

    computed: {
        user() {
            const userStore = useUserStore();
            return userStore.getUser;
        },
    },
};
</script>

<style lang="stylus" scoped></style>
