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
                                        Login to Your Account
                                    </h5>
                                    <p class="text-center small">
                                        Enter your email & password to login
                                    </p>
                                </div>

                                <form
                                    class="row g-3 needs-validation"
                                    novalidate
                                    @submit.prevent="login"
                                >
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
                                                type="text"
                                                name="username"
                                                class="form-control"
                                                id="yourEmail"
                                                v-model="user.email"
                                                required
                                            />
                                            <div class="invalid-feedback">
                                                Please enter your email.
                                            </div>
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
                                            required
                                            v-model="user.password"
                                        />
                                        <div class="invalid-feedback">
                                            Please enter your password!
                                        </div>

                                        <div
                                            v-if="user.error"
                                            class="text-danger fw-bold"
                                        >
                                            Error Logging In !!
                                        </div>
                                        <div
                                            v-if="user.loading"
                                            class="loader"
                                        ></div>
                                    </div>

                                    <!-- <div class="col-12">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="remember"
                          value="true"
                          id="rememberMe"
                        />
                        <label class="form-check-label" for="rememberMe"
                          >Remember me</label
                        >
                      </div>
                    </div> -->
                                    <div class="col-12">
                                        <button
                                            class="btn btn-primary w-100"
                                            type="submit"
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <div class="col-12">
                                        <p class="small mb-0">
                                            Don't have account?
                                            <a href="/register"
                                                >Create an account</a
                                            >
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

<script src="./login.js"></script>

<style lang="css" scoped>
/* HTML: <div class="loader"></div> */
.loader {
    width: 60px;
    aspect-ratio: 4;
    background: radial-gradient(circle closest-side, #000 90%, #0000) 0 /
        calc(100% / 3) 100% space;
    clip-path: inset(0 100% 0 0);
    animation: l1 1s steps(4) infinite;
    margin: 20px 0px;
}
@keyframes l1 {
    to {
        clip-path: inset(0 -34% 0 0);
    }
}
</style>
