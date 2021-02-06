<template>
  <div class="col-sm-12 bg-dark full-col" id="performanceCol">
    <div class="card card-stats bg-lighter">
      <div
        v-if="loading"
        class="position-absolute h-100 w-100 d-flex align-items-center justify-content-center"
        style="z-index: 12"
      >
        <loadingsm :loading="true" />
      </div>
      <div class="card-header py-1">
        <div class="d-flex">
          <p class="small m-0 w-100">{{ chartNames[chart] }}</p>
          <div class="py-1">
            <div class="btn-group">
              <button
                title="Returning & New customers"
                class="btn btn-sm"
                :class="[
                  chart === 'general' ? 'btn-primary' : 'btn-outline-primary',
                ]"
                @click="chart = 'general'"
              >
                General
              </button>
              <button
                title="Returning customers"
                class="btn btn-sm"
                :class="[
                  chart === 'returning' ? 'btn-primary' : 'btn-outline-primary',
                ]"
                @click="chart = 'returning'"
              >
                Returning
              </button>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <h4 class="text-light m-0 w-100">ORDERS</h4>
          <div class="btn-group controls">
            <button
              class="btn btn-sm"
              title="Bar Graph"
              @click="type = 'bar'"
              :class="[type === 'bar' ? 'btn-primary' : 'btn-outline-primary']"
            >
              <i class="bi bi-bar-chart"></i>
            </button>
            <button
              class="btn btn-sm"
              title="Line Graph"
              @click="type = 'line'"
              :class="[type === 'line' ? 'btn-primary' : 'btn-outline-primary']"
            >
              <i class="bi bi-alt"></i>
            </button>
            <button
              @click="toggleFullscreen()"
              title="fullscreen"
              class="btn btn-sm btn-outline-primary"
            >
              <i class="bi bi-arrows-fullscreen"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="py-1 canvas-cont">
        <canvas id="performance-stats"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PerformanceStats",

  data: () => ({
    chart: "general",
    type: "line",
    chartNames,
    loading: false,
  }),
  computed: {
    stats() {
      let data = { returning: [], general: [] };
      data = { ...data, ...this.$store.getters.getPerformanceStats };
      return data;
    },
  },
  methods: {
    mountChart: function () {
      if (this.$route.name !== "Dashboard") return;
      const self = this;
      const ctx = document.getElementById("performance-stats");
      if (self.chart === "general")
        buildGeneral(ctx.getContext("2d"), this.stats["general"])(self.type);
      if (self.chart === "returning")
        buildReturning(
          ctx.getContext("2d"),
          this.stats["returning"]
        )(self.type);
    },
    toggleFullscreen: function () {
      document.body.classList.toggle("fullscreen");
      this.$options.hideNav();
      this.mountChart();
    },
    getPerformanceStats() {
      this.loading = true;

      this.$store
        .dispatch(GET_PERFORMANCE_STATS)
        .finally(() => (this.loading = false));
    },
  },
  mounted: function () {
    const self = this;
    self.mountChart();
    if (!self.stats.general.length || !self.stats.returning.length)
      this.getPerformanceStats();

    window.onresize = function () {
      self.$options.debounce(self.mountChart);
    };
  },
  watch: {
    chart: function () {
      this.mountChart();
    },
    type: function () {
      this.mountChart();
    },
    stats: function () {
      this.mountChart();
    },
  },
};

import Chart from "chart.js/dist/Chart.js";
import { GET_PERFORMANCE_STATS } from "../store/types";
const chartNames = {
  general: "All Customers",
  returning: "Returning Customers",
  new: "New Customers",
};

function buildBg(ctx) {
  let grd = ctx.createLinearGradient(70, 360, 70, 0);
  grd.addColorStop(0, "transparent");
  // grd.addColorStop(.01, "rgb(0, 195, 145,.1)");
  grd.addColorStop(1, "rgba(225, 78, 202,.3)");
  return grd;
}
function buildDataSet(context, data, label) {
  return {
    backgroundColor: buildBg(context),
    label,
    borderWidth: 2,
    // borderColor: "rgba(0, 189, 145)",
    borderColor: "rgb(225, 78, 202)",
    data,
  };
}
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const options = {
  responsiveAnimationDuration: 0,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    mode: "nearest",
  },
};

function buildGeneral(
  context,
  data = [0, 10, 5, 2, 20, 30, 25, 60, 21, 43, 33, 9]
) {
  destroyChart();
  return (type = "line") => {
    window.performanceChart = new Chart(context, {
      type,
      data: {
        labels,
        datasets: [new buildDataSet(context, data, "General Customers")],
      },
      options,
    });
  };
}

function buildReturning(
  context,
  data = [0, 2, 4, 5, 7, 13, 6, 2, 5, 10, 4, 1]
) {
  destroyChart();
  return (type = "line") => {
    window.performanceChart = new Chart(context, {
      type,
      data: {
        labels,
        datasets: [new buildDataSet(context, data, "Returning Customers")],
      },
      options,
    });
  };
}

function destroyChart() {
  if (window.performanceChart) {
    window.performanceChart.destroy();
  }
}
</script>

<style scoped>
@media screen and (min-width: 768px) {
  canvas {
    height: 40vh !important;
  }
}
.canvas-cont {
  overflow: hidden;
}
@media screen and (max-width: 768px) {
  canvas {
    height: 28vh !important;
  }
}
.controls button {
  font-size: 1rem;
  padding-top: 0;
  padding-bottom: 0;
  font-size: small;
}

.fullscreen .full-col,
.nav-open .fullscreen .full-col {
  position: fixed !important;
  top: 0;
  right: 0;
  z-index: 10002 !important;
  width: 100vw;
  height: 100vh;
}
.fullscreen .card {
  width: 100%;
  height: 100%;
}
.fullscreen .canvas-cont {
  height: 90% !important;
}
.fullscreen .canvas-cont canvas {
  height: 90% !important;
}
.card {
  display: block;
}
</style>