<template>
  <div id="dataLoader" class="data-loader">
    <img :src="loadingSvg" alt="" />
  </div>
</template>

<script>
import loadingSvg from "../assets/images/loader.svg";
export default {
  data() {
    return { loadingSvg };
  },
};
</script>

<style>
</style>