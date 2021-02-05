<template>
  <div class="container-fluid fixed-top del">
    <div
      class="row bg-dark-tr vh-100 align-items-center justify-content-center"
    >
      <div class="col-lg-4 col-md-6 col-sm-8 col-xs-12 p-1 rounded card-cont">
        <div class="card bg-lighter shadow">
          <div class="card-body flex-column">
            <span class="bi bi-x-circle text-danger m-2"></span>
            <p class="h3 card-title">ARE YOU SURE?</p>
          </div>
          <div
            v-if="loading"
            class="position-absolute w-100 justify-content-center"
          >
            <loadingsm :loading="true" />
          </div>
          <p v-if="errored" class="text-danger my-0 text-center">
            A network error occured. Try again
          </p>
          <div class="card-footer">
            <div class="d-flex btns">
              <button
                :disabled="loading"
                @click="
                  () => {
                    $router.push({ name: 'Categories' });
                  }
                "
                class="btn btn-light mx-2"
              >
                Cancel
              </button>
              <button
                :disabled="loading"
                @click="deleteCategory"
                class="btn btn-danger mx-2"
              >
                Delete!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/delete.css";
import { DELETE_CATEGORY } from "../../store/types";
export default {
  data() {
    return { loading: false, errored: false };
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
  },
  methods: {
    deleteCategory() {
      this.loading = true;
      this.errored = false;

      this.$store
        .dispatch("categories/" + DELETE_CATEGORY, this.slug)
        .then(() => {
          this.$router.replace({ name: "Categories" });
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>