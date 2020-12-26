<template>
  <div class="container-fluid">
    <stats-vue />
  </div>
</template>

<script>
import StatsVue from "./Stats.vue";
export default {
  name: "Dashboard",
  components: {
    StatsVue,
  },
};
</script>

<style>
</style>