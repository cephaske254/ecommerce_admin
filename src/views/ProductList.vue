<template>
  <data-list-abstract
    :items="items"
    :fields="fields"
    :title="title"
    :unique="unique"
    :actions="true"
    max="67"
    v-on:refresh="refresh"
    v-on:refreshItem="refreshItem"
    v-on:edit="edit"
    v-on:view="view"
    :loading="loading"
  />
</template>

<script>
export default {
  data: () => ({
    loading: false,
    fields: ["id", "name", "description", "price"],
    title: "Products",
    unique: "id",
    items: [
      {
        id: "2x3D",
        name: "Cephas Too",
        description:
          "As an example, you could use the jQuery code above to restrict the user from entering more than 10 characters while he's typing; the following code snippet does exactly this As an example, you could use the jQuery code above to restrict the user from entering more than 10 characters while he's typing; the following code snippet does exactly this",
        price: "Ksh 220",
      },
    ],
  }),

  methods: {
    refresh: function () {
      this.loading = !this.loading;
    },
    view: (id) => {
      console.log(id);
    },
    refreshItem: (id) => {
      console.log(id);
    },
    edit: function (id) {
      console.log(id);
    },
    delete: function (id) {
      console.log(id);
    },
  },
  mounted: function () {
    this.$options.currentPage("Products");
  },
};
</script>

<style>
</style>