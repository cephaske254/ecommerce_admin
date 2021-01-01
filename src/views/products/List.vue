<template>
  <div class="container-fluid">
    <div class="bg-lighter p-2 rounded text-light d-flex">
      <i class="bi-filter h4 m-0"></i>
      <div class="w-100">
        <router-link to="/products/add/" class="btn btn-sm btn-info float-end">
          <i class="bi bi-plus"></i>
        </router-link>
      </div>
    </div>
    <div class="row">
      <product-card
        v-for="item in items"
        unique="id"
        :key="item"
        :item="item"
      />
    </div>
    <loadingsm :next="next" :loading="loading" />
  </div>
</template>
<script>
import ProductCard from "@/subcomponents/ProductCard.vue";
import * as types from "@/store/types";

export default {
  components: { ProductCard },
  computed: {
    items() {
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
    view: function (id) {
      this.$router.push({
        path: `${this.$router.currentRoute.value.path}/${id}`,
      });
    },
    refresh: function () {
      this.loading = !this.loading;
    },
    edit: function (id) {
      this.$router.push({
        path: `${this.$router.currentRoute.value.path}/${id}/edit`,
      });
    },
    deleteItem: function (id) {
      console.log(id);
    },
    add: function () {
      console.log("ADD");
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
    if (!this.items.length) this.fetch();
  },
};
</script>

<style scoped>
.bi {
  font-size: 1.2rem;
}
</style>