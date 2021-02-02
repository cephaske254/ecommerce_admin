<template>
  <router-link
    :to="{ name: 'Banner Ads' }"
    class="btn m-2 btn-sm btn-light position-absolute"
    style="right: 0; z-index: 3"
    v-html="x"
  ></router-link>
  <carousel :carouselItems="bannerAds" />
</template>

<script>
import carousel from "./carousel.vue";
import { x } from "../../globalAssets";

export default {
  props: ["errored", "loading", "bannerAds", "onRetry"],
  components: { carousel },
  data() {
    return { x };
  },
  created() {
    this.$options.currentPage(this.$route.name);
  },
  mounted() {
    if (!this.bannerAds.length) this.$router.replace({ name: "Banner Ads" });
  },
};
</script>

<style>
</style>