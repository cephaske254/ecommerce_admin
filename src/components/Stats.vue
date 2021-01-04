<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-sm-12">
        <perfomance-stats />
      </div>
    </div>

    <summary-stats />

    <div class="row">
      <recent-orders-stats />
    </div>
  </div>
</template>

<script>
import PerfomanceStats from "../subcomponents/Perfomance.stats.vue";
import RecentOrdersStats from "../subcomponents/RecentOrders.stats.vue";
import SummaryStats from "../subcomponents/Summary.stats.vue";
export default {
  name: "Stats",
  components: { PerfomanceStats, SummaryStats, RecentOrdersStats },
};
</script>

<style scoped>
</style>