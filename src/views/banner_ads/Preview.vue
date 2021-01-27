<template>
  <carousel :carouselItems="carouselItems" />
</template>

<script>
import carousel from "./carousel.vue";
export default {
  components: { carousel },
  computed: {
    carouselItems() {
      return this.$store.getters.getBannerAds;
    },
  },
  created() {
    this.$options.currentPage(this.$route.name);
  },
};
</script>

<style>
</style>