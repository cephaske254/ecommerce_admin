<template>
  <div class="container-fluid bgg">
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
    <div class="wave-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#5000ca"
          fill-opacity="1"
          d="M0,128L40,149.3C80,171,160,213,240,240C320,267,400,277,480,234.7C560,192,640,96,720,74.7C800,53,880,107,960,122.7C1040,139,1120,117,1200,101.3C1280,85,1360,75,1400,69.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
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

      if (!this.email || !this.password) return;

      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
    blur(e) {
      const id = e.target.id;
      if (this.touched.includes(id)) return;
      this.touched = [...this.touched, id];
    },
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
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
/* .bgg {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  background-origin: border-box;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%2327293d' fill-opacity='.6' d='M0,64L40,80C80,96,160,128,240,165.3C320,203,400,245,480,240C560,235,640,181,720,181.3C800,181,880,235,960,240C1040,245,1120,203,1200,202.7C1280,203,1360,245,1400,266.7L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
} */
.wave-container {
  position: relative;
  background: #09f;
  color: #fff;
  text-align: center;
  overflow: hidden;
}
.wave-container > svg {
  display: block;
  transform-origin: bottom;
  animation: animateWave 1000ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes animateWave {
  0% {
    transform: scale(1, 0);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>