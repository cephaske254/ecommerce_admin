<template>
  <div class="fixed-top container-fluid bg-dark-tr">
    <div class="row vh-100 align-items-center justify-content-center">
      <div class="col-sm-8 col-md-5 col-lg-4 p-2 column mb-5 pb-5">
        <div class="card bg-lighter border-0 shadow-sm rounded-0 mb-4">
          <div class="card-body text-light-tr">
            <h5 class="card-title">Test Credentials</h5>
            <p class="small mx-1 card-subtitle">Spare 🙏</p>

            <hr class="mt-1 mb-3" />
            <div class="d-flex">
              <div class="col">Email</div>
              <div class="col text-muted">admin@admin.com</div>
            </div>
            <div class="d-flex">
              <div class="col">Password</div>
              <div class="col text-muted">admin</div>
            </div>
          </div>
          <div class="card-footer border-0">
            <router-link :to="{ name: 'Login' }" class="btn btn-primary py-0"
              >BACK TO LOGIN</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    let returning = JSON.parse(sessionStorage.getItem("view"));
    if (returning !== true || returning !== "true") {
      axios.post("/visitorIn/");
      sessionStorage.setItem("view", JSON.stringify(true));
      returning = true;
    }
  },
};
</script>

<style>
</style>