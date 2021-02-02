<template>
  <div class="container-fluid fixed-top bg-dark-tr">
    <div class="row vh-100 align-items-csenter justify-content-center">
      <div class="col-12 p-2"></div>
      <div class="col-lg-4 col-md-6 col-sm-8 col-xs-12 p-1 rounded card-cont">
        <div v-if="(slug && initial) || !slug" class="card bg-lighter shadow">
          <form class="card-body text-light-tr" @submit="submit">
            <h4 v-if="slug">EDIT PRODUCT CATEGORY</h4>
            <h4 v-else>ADD PRODUCT CATEGORY</h4>
            <hr />
            <h6 class="card-subtitle" v-if="initial">{{ initial }}</h6>
            <label for="name">Name</label>
            <span class="required"></span>
            <input
              type="text"
              v-model="name"
              @blur="blur"
              id="name"
              class="form-control input bg-dark"
              style="border-radius: 0.1rem"
              placeholder="Category name"
            />
            <form-errors :errors="validate" :touched="touched" name="name" />
          </form>
          <div class="card-footer">
            <div class="d-flex btns">
              <router-link
                :to="{ name: 'Categories' }"
                class="btn btn-light mx-2"
                >Cancel</router-link
              >
              <button @click="submit" class="btn btn-primary mx-2">
                Submit
              </button>
              <span
                v-if="loading"
                class="spinner-border position-absolute"
                style="left: 1rem; font-size: 0.1rem"
              ></span>
            </div>
          </div>
        </div>
        <loadingsm v-else :loading="true" />
      </div>
      <div class="col-12 p-2"></div>
    </div>
  </div>
</template>

<script>
import { ADD_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../../store/types";
export default {
  data() {
    return {
      touched: [],
      name: null,
      initial: null,
      errors: {},
      loading: false,
    };
  },

  created() {
    document.getElementsByTagName("html")[0].classList.add("fullscreen");
  },
  beforeUnmount() {
    document.getElementsByTagName("html")[0].classList.remove("fullscreen");
  },
  mounted() {
    if (!this.slug) return;
    this.$store
      .dispatch("categories/" + GET_CATEGORY, this.slug)
      .then((data) => {
        this.name = data.data.name;
        this.initial = data.data.name;
      })
      .catch(() => this.navigate());
  },
  computed: {
    slug() {
      if (this.$route.name === "Edit Category" && this.$route.params.slug)
        return this.$route.params.slug || null;
      return null;
    },
    validate() {
      return !this.name
        ? { name: ["Please add a category name"] }
        : this.errors;
    },
  },

  methods: {
    blur(e) {
      this.touched = [e.target.id];
    },
    navigate() {
      this.$router.replace({ name: "Categories" });
    },
    done() {
      this.loading = false;
    },
    submit(e) {
      e.preventDefault();
      const self = this;
      self.touched = ["name"];
      if (!self.name) return;

      this.loading = true;
      if (this.slug) {
        this.$store
          .dispatch("categories/" + UPDATE_CATEGORY, {
            slug: this.slug,
            name: this.name,
          })
          .then(() => {
            this.navigate();
          })
          .catch((error) => {
            this.errored = true;
            this.errors = error.data;
          })
          .finally(() => this.done());
      } else {
        this.$store
          .dispatch("categories/" + ADD_CATEGORY, { name: this.name })
          .then(() => {
            this.navigate();
          })
          .catch((error) => {
            this.errored = true;
            this.errors = error.data;
          })
          .finally(() => this.done());
      }
    },
  },
};
</script>

<style>
</style>