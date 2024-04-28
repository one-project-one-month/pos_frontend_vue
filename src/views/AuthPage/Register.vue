<template>
    <div class="container">
        <section
            class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
        >
            <div class="container">
                <div class="row justify-content-center">
                    <div
                        class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center"
                    >
                        <div class="d-flex justify-content-center py-4">
                            <a
                                href="index.html"
                                class="logo d-flex align-items-center w-auto"
                            >
                                <img src="assets/img/logo.png" alt="" />
                                <span class="d-none d-lg-block">NiceAdmin</span>
                            </a>
                        </div>
                        <!-- End Logo -->

                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="pt-4 pb-2">
                                    <h5
                                        class="card-title text-center pb-0 fs-4"
                                    >
                                        Create an Account
                                    </h5>
                                    <p class="text-center small">
                                        Enter your personal details to create
                                        account
                                    </p>
                                </div>

                                <form
                                    class="row g-3 needs-validation"
                                    novalidate
                                    @submit.prevent="register"
                                >
                                    <div class="col-12">
                                        <label for="yourName" class="form-label"
                                            >Your Name</label
                                        >
                                        <input
                                            type="text"
                                            name="name"
                                            class="form-control"
                                            id="yourName"
                                            required
                                            v-model="user.name"
                                        />
                                    </div>

                                    <div class="col-12">
                                        <label
                                            for="yourAddress"
                                            class="form-label"
                                            >Address</label
                                        >
                                        <input
                                            type="text"
                                            name="address"
                                            class="form-control"
                                            id="yourAddress"
                                            required
                                            v-model="user.address"
                                        />
                                    </div>
                                    <div class="col-12">
                                        <label
                                            for="yourPhone"
                                            class="form-label"
                                            >Phone</label
                                        >
                                        <input
                                            type="text"
                                            name="address"
                                            class="form-control"
                                            id="yourPhone"
                                            required
                                            v-model="user.phone"
                                        />
                                    </div>

                                    <div class="col-12">
                                        <label
                                            for="yourEmail"
                                            class="form-label"
                                            >Email</label
                                        >
                                        <div class="input-group has-validation">
                                            <span
                                                class="input-group-text"
                                                id="inputGroupPrepend"
                                                >@</span
                                            >
                                            <input
                                                type="email"
                                                name="email"
                                                class="form-control"
                                                id="yourEmail"
                                                v-model="user.email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <label
                                            for="yourPassword"
                                            class="form-label"
                                            >Password</label
                                        >
                                        <input
                                            type="password"
                                            name="password"
                                            class="form-control"
                                            id="yourPassword"
                                            v-model="user.password"
                                            required
                                        />
                                    </div>

                                    <div class="col-12">
                                        <label
                                            for="password_confirmation"
                                            class="form-label"
                                            >Confirm Password</label
                                        >
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            class="form-control"
                                            id="password_confirmation"
                                            v-model="user.password_confirmation"
                                            required
                                        />
                                    </div>

                                    <div class="col-12">
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                name="terms"
                                                type="checkbox"
                                                value=""
                                                id="acceptTerms"
                                                v-model="user.checked"
                                                required
                                            />
                                            <label
                                                class="form-check-label"
                                                for="acceptTerms"
                                                >I agree and accept the
                                                <a href="#"
                                                    >terms and conditions</a
                                                ></label
                                            >
                                            <div class="invalid-feedback">
                                                You must agree before
                                                submitting.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <button
                                            :disabled="!overAllValidated"
                                            class="btn btn-primary w-100"
                                            type="submit"
                                        >
                                            Create Account
                                        </button>
                                    </div>
                                    <div class="col-12">
                                        <p class="small mb-0">
                                            Already have an account?
                                            <a href="/login">Log in</a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="credits">
                            <!-- All the links in the footer should remain intact. -->
                            <!-- You can delete the links only if you purchased the pro version. -->
                            <!-- Licensing information: https://bootstrapmade.com/license/ -->
                            <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
                            Designed by
                            <a href="https://bootstrapmade.com/"
                                >BootstrapMade</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- End #main -->
</template>

<script src="./register.js"></script>

<style lang="stylus" scoped></style>
