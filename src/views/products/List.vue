<template>
  <div key="Aslfnakfkajf " class="container-fluid">
    <div class="bg-lighter p-2 rounded text-light d-flex">
      <i class="bi-filter h4 m-0"></i>
      <div class="w-100">
        <div class="btn-group float-end">
          <button title="refresh" class="btn btn-outline-primary btn-sm">
            <i
              class="bi bi-arrow-counterclockwise"
              :class="[loading ? 'spin' : '']"
              @click="fetch('refresh')"
            ></i>
          </button>
          <router-link to="/products/add/" class="btn btn-sm btn-primary">
            <i class="bi bi-plus"></i>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <product-card
        v-for="product in products"
        :key="product.id || product.slug"
        :product="product"
        :onView="view"
        :onEdit="edit"
        :onError="error"
      />
    </div>
    <loadingsm :next="next" :loading="loading" />
  </div>
</template>
<script>
import ProductCard from "@/subcomponents/ProductCard.vue";
import * as types from "@/store/types";
import errorImage from "@/assets/images/error.png";
export default {
  components: { ProductCard },
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
    };
  },

  methods: {
    view: function (slug) {
      this.$router.push({ name: "Product Detail", params: { slug } });
    },
    refresh: function () {
      this.loading = !this.loading;
    },
    edit: function (slug) {
      this.$router.push({ name: "Edit Product", params: { slug: slug } });
    },
    error: function (e) {
      e.target.onerror = null;
      e.target.src = errorImage;
    },
    fetch: function (param) {
      if ((param === "next" && !this.next) || this.loading === true) return;
      const self = this;
      this.loading = true;
      setTimeout(function () {
        clearTimeout(300);
        self.$store
          .dispatch("products/" + types.GET_PRODUCTS, param)
          .finally((self.loading = false));
      }, 300);
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
    if (!this.products.length) this.fetch();
  },
};
</script>

<style scoped>
.bi {
  font-size: 1.2rem;
}
</style>