<template>
  <div class="container-fluid">
    <div class="row">
      <ProductCard
        :onView="view"
        :onEdit="edit"
        :onDelete="deleteItem"
        v-for="item in items"
        :item="item"
        :key="item.id"
      />
    </div>
    <div v-if="loading" class="spinner-border"></div>
  </div>
</template>
<script>
import ProductCard from "../subcomponents/ProductCard.vue";
import * as types from "../store/types";

export default {
  components: { ProductCard },
  computed: {
    items() {
      return this.$store.getters.getProducts;
    },
  },
  data: function () {
    return {
      options: {
        actions: {
          add: this.add,
          refresh: this.refresh,
          delete: this.delete,
        },
        title: "Products",
      },
      fields: ["id", "name", "description", "price"],
      unique: "id",
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
      this.loading = true;
      this.$store.dispatch(types.GET_PRODUCTS, param).finally(() => {
        this.loading = false;
      });
    },
  },
  mounted: function () {
    window.onscroll = () => {
      const percent = this.$options.scrollPercentage();
      if (
        percent.percent >= 80 &&
        percent.increase === true &&
        this.loading === false
      ) {
        this.fetch("next");
      }
    };
  },
  watch: {
    loading: function (val) {
      console.log(val), "Loading";
    },
  },
};
</script>

<style>
</style>