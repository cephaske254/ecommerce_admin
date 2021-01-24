<template>
  <div class="container-fluid">
    <div class="row vh-100 align-items-center justify-content-center">
      <div class="col-sm-8 col-md-5 col-lg-4 p-2 column">
        <div class="card bg-dark border-0 shadow-sm rounded-0">
          <div class="card-header bg-dark border-0 py-4 text-light-tr">
            <h4 class="card-title my-0">LOGIN</h4>
          </div>
          <div class="card-body">
            <form class="form-floating mb-3" @submit="submit">
              <div class="form-floating">
                <input
                  type="email"
                  class="form-control mb-2"
                  id="email"
                  placeholder="name@domain.com"
                  v-model="email"
                  @blur="blur"
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
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  v-model="password"
                  @blur="blur"
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
                <button class="btn btn-lg btn-primary w-100">LOGIN</button>
              </div>
            </form>
            <a
              href="/"
              class="card-link text-muted text-decoration-none text-center"
              >Forgot Password</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validators, { ValidateEmail } from "../products/validators";
validators;
export default {
  data() {
    return {
      email: null,
      password: null,
      touched: [],
    };
  },
  computed: {
    validate() {
      const errors = {};
      if (!this.email) errors["email"] = "Email is required!";
      if (this.email) errors["email"] = ValidateEmail(this.email);
      if (!this.password) errors["password"] = "Password is required!";
      return errors;
    },
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.touched = ["password", "email"];
    },
    blur(e) {
      const id = e.target.id;
      if (this.touched.includes(id)) return;
      this.touched = [...this.touched, id];
    },
    // focus(e) {
    //   const id = e.target.id;
    //   if (!this.touched.includes(id)) return;
    //   this.touched = this.touched.filter((i) => i !== id);
    // },
  },
  created() {
    this.$options.currentPage("Login");
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
  transition: 0.5s cubic-bezier(0.895, 0.53, 0.285, 3.22);
}
.error {
  color: red;
}
</style>