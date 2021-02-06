<template>
  <div class="container-fluid bgg">
    <div class="row vh-100 align-items-center justify-content-center">
      <div class="col-sm-8 col-md-5 col-lg-4 p-2 column mb-5 pb-5">
        <div class="card bg-dark border-0 shadow-sm rounded-0 mb-4">
          <div class="card-header bg-dark border-0 py-4 text-light-tr">
            <div class="d-flex justify-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                viewBox="0 0 16 16"
                class="m-0"
              >
                <path
                  d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"
                />
                <path
                  fill-rule="evenodd"
                  d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                />
              </svg>
            </div>
            <h4
              v-html="[reset ? 'RESET PASSWORD' : 'LOGIN']"
              class="card-title my-0"
            ></h4>
          </div>
          <p v-if="resetSuccess" class="small text-center my-0 text-primary">
            We've sent you a password reset email
          </p>
          <form-errors
            v-else
            name="email"
            :errors="errors"
            :touched="touched"
          />

          <div class="card-body">
            <form class="form-floating mb-3" @submit="submit">
              <p
                v-if="errors && errors.detail"
                class="small text-danger mx-1 my-0"
              >
                {{ errors["detail"] }}
              </p>
              <div class="form-floating">
                <input
                  type="email"
                  class="form-control mb-2"
                  id="email"
                  placeholder="name@domain.com"
                  v-model="email"
                  @blur="blur"
                  @focus="focus"
                />
                <label
                  class="text-danger"
                  v-if="validate.email && touched.includes('email')"
                  for="email"
                >
                  {{ validate.email }}</label
                >
                <label v-else for="email">Email address</label>
              </div>
              <div v-if="!reset" class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  v-model="password"
                  @blur="blur"
                  @focus="focus"
                />
                <label
                  class="text-danger"
                  v-if="validate.password && touched.includes('password')"
                  for="password"
                >
                  {{ validate.password }}</label
                >
                <label v-else for="email">Password</label>
              </div>
              <div class="pt-3">
                <button
                  v-html="[reset ? 'RESET' : 'LOGIN']"
                  class="btn btn-lg btn-primary w-100"
                ></button>
              </div>
            </form>
            <div class="d-flex">
              <router-link
                v-if="!reset"
                class="col text-muted text-decoration-none"
                :to="{ hash: '#reset' }"
                >Forgot Password</router-link
              >
              <router-link
                v-else
                class="col text-muted text-decoration-none"
                :to="{ name: 'Login' }"
                >Login</router-link
              >

              <router-link
                class="col btn py-0 btn-light"
                :to="{ name: 'Test Credentials' }"
                >GET TEST CREDENTIALS</router-link
              >
              <div class="position-absolute w-100">
                <loadingsm :loading="loading" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import FormErrors from "../../subcomponents/formErrors.vue";
import validators, { ValidateEmail } from "../products/validators";
validators;
export default {
  components: { FormErrors },
  data() {
    return {
      email: null,
      password: null,
      errors: {},
      touched: [],
      loading: false,
      resetSuccess: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    validate() {
      const errors = {};
      if (!this.email) errors["email"] = "Email is required!";
      if (this.email) errors["email"] = ValidateEmail(this.email);
      if (!this.password) errors["password"] = "Password is required!";
      return { ...errors };
    },
    reset() {
      return this.$route.hash === "#reset" ? true : false;
    },
  },
  methods: {
    checkLogin() {
      const route = this.$route.query["next"] || "/";
      if (this.isLoggedIn === true) {
        this.$router.push(route);
      }
    },
    submit(e) {
      e.preventDefault();
      this.touched = ["password", "email"];

      if (!this.reset && (!this.email || !this.password)) return;
      else if (!this.email) return;

      this.loading = true;
      this.errors = {};
      this.resetSuccess = false;

      if (!this.reset)
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.checkLogin();
          })
          .catch((error) => {
            this.password = null;
            this.errors = error.response &&error.response.data
              ? error.response && error.response.data
              : { detail: "A network error occured!" };
            this.touched = this.touched.filter((i) => i !== "password");
          })
          .finally(() => (this.loading = false));
      else
        this.$store
          .dispatch("reset", { email: this.email })
          .then(() => {
            this.resetSuccess = true;
          })
          .catch((error) => {
            this.errors = error.response.data
              ? error.response.data
              : { detail: "A network error occured!" };
          })
          .finally(() => (this.loading = false));
    },
    blur(e) {
      const id = e.target.id;
      if (this.touched.includes(id)) return;
      this.touched = [...this.touched, id];
    },
    focus() {
      if (this.errors && this.errors.detail) this.errors.detail = null;
    },
  },
  created() {
    this.$options.currentPage("Login");
  },
  mounted() {
    this.checkLogin();
  },

  watch: {
    isLoggedIn() {
      this.checkLogin();
    },
    reset() {
      this.touched = [];
      this.resetSuccess = false;
    },
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
input {
  background: var(--bs-lighter) !important;
  border-color: var(--bs-dark) !important;
}
input,
button {
  border-radius: 0.1rem;
}
button {
  padding: 0.7rem;
}
.column {
  min-height: 250px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.bgg {
  background-repeat: no-repeat;
  background-size: 150%;
  background-position: bottom;
  background-origin: border-box;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%2327293d' fill-opacity='.6' d='M0,64L40,80C80,96,160,128,240,165.3C320,203,400,245,480,240C560,235,640,181,720,181.3C800,181,880,235,960,240C1040,245,1120,203,1200,202.7C1280,203,1360,245,1400,266.7L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
}
</style>