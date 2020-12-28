<template>
  <data-list-abstract
    :fields="fields"
    :unique="unique"
    :items="items"
    :cfg="options"
    :loading="loading"
  />
</template>

<script>
export default {
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
        },
        {
          id: "asE4X",
          name: "Cephas Too",
          description:
            "As an example, you could use the jQuery code above to restrict the user from entering more than 10 characters while he's typing; the following code snippet does exactly this As an example, you could use the jQuery code above to restrict the user from entering more than 10 characters while he's typing; the following code snippet does exactly this",
          price: "Ksh 220",
        },
      ],
    };
  },

  methods: {
    refresh: function () {
      this.loading = !this.loading;
    },
    view: (id) => {
      console.log(id);
    },
    edit: function (id) {
      console.log(id);
    },
    delete: function (id) {
      console.log(id);
    },
    add: function () {
      console.log("ADD");
    },
  },
  mounted: function () {
    this.$options.currentPage("Products");
  },
};
</script>

<style>
</style>