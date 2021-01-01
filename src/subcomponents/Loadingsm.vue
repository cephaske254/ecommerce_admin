<template>
  <p v-if="!next && !loading" class="m-0 text-center small">
    <span>No more items to load</span>
  </p>
  <div v-if="loading" class="row justify-content-center">
    <div class="spinner-border"></div>
  </div>
</template>
<script>
export default {
  props: ["loading", "next"],
};
</script>
<style>
</style>