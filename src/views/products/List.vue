<template>
  <loadingsm v-if="loading && !products.length" :loading="loading" />
  <div v-else-if="!errored" class="container-fluid">
    <div class="bg-lighter p-2 rounded text-light d-flex">
      <div class="w-100">
        <i class="bi-filter h4 m-0"></i>
      </div>
      <form class="w-100" @submit="search">
        <input
          type="search"
          class="form-control form-control-sm bg-dark border-0"
          v-model="searchQuery"
          placeholder="Search"
        />
      </form>
      <div class="w-100">
        <div class="btn-group float-end">
          <button
            title="refresh"
            @click="refresh"
            class="btn btn-outline-primary"
          >
            <i
              class="bi bi-arrow-counterclockwise"
              :class="[loading ? 'spin' : '']"
            ></i>
          </button>
          <router-link :to="{ name: 'Add Product' }" class="btn btn-primary">
            <i class="bi bi-plus"></i>
          </router-link>
        </div>
      </div>
    </div>
    <h4 class="text-center text-muted mt-5" v-if="!products.length">
      NO PRODUCTS TO SHOW
    </h4>
    <div v-else class="row">
      <product-card
        v-for="product in products"
        :key="product.id || product.slug"
        :product="product"
        :onView="view"
        :onEdit="edit"
        :onError="error"
      />
    </div>
  </div>
  <error-abstract :onRetry="refresh" v-else-if="errored" />
</template>
<script>
import ProductCard from "@/subcomponents/ProductCard.vue";
import * as types from "@/store/types";
import errorImage from "@/assets/images/error.png";
import ErrorAbstract from "../../subcomponents/handlers/Error.abstract.vue";
import { apiGetProducts } from "../../api/products";

export default {
  components: { ProductCard, ErrorAbstract },
  computed: {
    products() {
      return this.$store.getters["products/getProducts"];
    },
    next() {
      return this.$store.getters["products/getNext"];
    },
  },
  data: function () {
    return {
      loading: false,
      errored: false,
      searchQuery: null,
      searchData: {},
    };
  },

  methods: {
    view: function (slug) {
      this.$router.push({ name: "Product Detail", params: { slug } });
    },
    refresh() {
      this.fetch("refresh");
    },
    edit: function (slug) {
      this.$router.push({ name: "Edit Product", params: { slug: slug } });
    },
    error: function (e) {
      e.target.onerror = null;
      e.target.src = errorImage;
    },
    fetch: function (param) {
      if (
        (!this.next && param == "next") ||
        (param === "refresh" && this.loading !== false)
      )
        return;

      const self = this;
      this.loading = true;
      this.errored = false;

      self.$store
        .dispatch("products/" + types.GET_PRODUCTS, param)
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          self.loading = false;
        });
    },
    navigateTosearch() {
      if (!this.searchQuery) return;
      this.$router.push({ query: { q: this.searchQuery } });
    },
    search(e) {
      if (e) e.preventDefault();
      if (!this.searchQuery) return;

      this.loading = true;
      this.errored = false;
      apiGetProducts("search", `/categories/?q=${this.searchQuery}`)
        .then((data) => {
          this.searchData = data.data;
        })
        .catch(() => {
          this.errored = true;
          this.loading = false;
        });
      this.$router.push({ query: { q: this.searchQuery } });
    },
  },
  created: function () {
    window.scrollTo({ top: 0 });
    window.onscroll = () => {
      const percent = this.$options.scrollPercentage();
      const self = this;
      if (
        percent.percent >= 80 &&
        percent.increase === true &&
        this.loading === false
      ) {
        self.fetch("next");
      }
    };

    this.searchQuery = this.$route.query["q"] || null;
    if (this.$route.query["q"]) {
      this.search();
      return;
    }
    if (!this.products.length) this.fetch();
  },
  watch: {
    searchQuery(val1) {
      if (val1 === "" || val1 === null || !val1) {
        this.searchData = {};
        this.$router.replace({});
      }
    },
  },
};
</script>

<style scoped>
/* .bi {
  font-size: 1rem;
} */
</style>