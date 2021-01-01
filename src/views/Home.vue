<template>
  <DashboardVue />
</template>

<script>
import DashboardVue from "../components/Dashboard.vue";
export default {
  name: "Home",
  mounted: function () {
    this.$options.currentPage("Home");
  },
  components: {
    DashboardVue,
  },
};
</script>
