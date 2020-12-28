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
  </div>
</template>
<script>
import ProductCard from "../subcomponents/ProductCard.vue";
export default {
  components: { ProductCard },

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

      items: [
        {
          id: "2x3D",
          name: "Cephas Too",
          description:
            "As an example, you could use the jQuery code above to restrict the user from entering more than 10 characters while he's typing; the following code snippet does exactly this As an example, you could use the jQuery code above to restrict the user from entering more than 10 characters while he's typing; the following code snippet does exactly this",
          price: "Ksh 220",
          imageCount: 3,
        },
        {
          id: "asE4X",
          name: "Cephas Too",
          description:
            "As an example, you could use the jQuery code above to restrict the user from entering more than 10 characters while he's typing; the following code snippet does exactly this As an example, you could use the jQuery code above to restrict the user from entering more than 10 characters while he's typing; the following code snippet does exactly this",
          price: "Ksh 220",
          imageCount: 8,
        },
      ],
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
      if (param === "next") {
      }
      axios
        .get("/")
        .then((data) => {
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted: function () {
    window.onscroll = () => {
      const percent = this.$options.scrollPercentage();
      console.log(percent);
      this.fetch("next");
    };
  },
};
</script>

<style>
</style>