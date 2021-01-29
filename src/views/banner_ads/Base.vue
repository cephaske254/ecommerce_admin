<template>
  <router-view
    :bannerAds="bannerAds"
    :errored="errored"
    :loading="loading"
    :onRetry="() => fetch('refresh')"
  />
</template>

<script>
import { GET_BANNER_ADS } from "../../store/types";
export default {
  data() {
    return {
      loading: false,
      errored: false,
    };
  },
  computed: {
    bannerAds() {
      return this.$store.getters.getBannerAds || [];
    },
  },
  methods: {
    fetch(payload) {
      this.loading = true;
      this.errored = false;
      this.$store
        .dispatch(GET_BANNER_ADS, payload)
        .catch(() => (this.errored = true))
        .finally(() => (this.loading = false));
    },
    refresh() {
      this.fetch("refresh");
    },
  },
  mounted() {
    if (!this.bannerAds.length) this.fetch();
  },
};
</script>

<style>
</style>