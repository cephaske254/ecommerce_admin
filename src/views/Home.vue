<template>
  <DashboardVue />
</template>

<script>
import DashboardVue from "../components/Dashboard.vue";
export default {
  name: "Home",
  mounted: function () {
    this.$options.currentPage("Dashboard");
  },
  components: {
    DashboardVue,
  },
};
</script>
