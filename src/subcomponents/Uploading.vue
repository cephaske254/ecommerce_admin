<template>
  <div class="container-fluid uploading-cont bg-dark" v-if="uploading">
    <div class="row align-items-center justify-content-center">
      <div class="col-md-6 col-lg-4 col-sm-10 d-block">
        <div class="progress border border-primary">
          <div
            class="progress-bar progress-bar-stripped bg-primary"
            :aria-valuenow="progress"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{ width: progress + '%' }"
          >
            {{ progress + "%" }}
          </div>
        </div>
        <p class="text-white small text-center">PLEASE WAIT...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["uploading", "progress", "failed"],
};
</script>

<style>
.uploading-cont .progress {
  background: transparent;
}
.uploading-cont {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000 !important;
  bottom: 0;
}
.uploading-cont .row {
  height: 100%;
  width: 100%;
}
</style>