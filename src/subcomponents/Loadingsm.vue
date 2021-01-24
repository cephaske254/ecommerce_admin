<template>
  <!-- <p v-if="!noNav && !next && !loading" class="m-0 text-center small">
    <span>All items loaded</span>
  </p> -->
  <div v-if="loading" class="row justify-content-center">
    <div class="spinner-border"></div>
  </div>
</template>
<script>
export default {
  props: ["loading", "next", "noNav"],
};
</script>
<style>
</style>