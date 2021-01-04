<template>
  <div class="col-sm-12 bg-dark full-col" id="performanceCol">
    <div class="card card-stats bg-lighter">
      <div class="card-header py-1">
        <div class="d-flex">
          <p class="small m-0 w-100">{{ chartNames[chart] }}</p>
          <div class="py-1">
            <div class="btn-group">
              <button
                title="Returning & New customers"
                class="btn btn-sm"
                :class="[chart === 'general' ? 'btn-primary' : 'btn-outline-primary']"
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
import {
  buildGeneral,
  buildReturning,
  chartNames,
} from "./helpers/performance.helper";

export default {
  name: "PerformanceStats",
  mounted: function () {
    const self = this;
    self.mountChart();
    window.onresize = function () {
      self.$options.debounce(self.mountChart);
    };
  },
  data: () => ({
    chart: "general",
    type: "line",
    chartNames,
  }),
  methods: {
    mountChart: function () {
      const self = this;
      const ctx = document.getElementById("performance-stats");
      if (self.chart === "general")
        buildGeneral(ctx.getContext("2d"))(self.type);
      if (self.chart === "returning")
        buildReturning(ctx.getContext("2d"))(self.type);
    },
    toggleFullscreen: function () {
      document.body.classList.toggle("fullscreen");
      this.$options.hideNav();
      this.mountChart();
    },
  },
  watch: {
    chart: function () {
      this.mountChart();
    },
    type: function () {
      this.mountChart();
    },
  },
};
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