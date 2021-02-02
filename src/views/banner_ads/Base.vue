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
.carousel-item {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-origin: border-box;
  min-height: 100vh;
}
.carousel-control-prev,
.carousel-control-next {
  max-height: 50px;
  width: 50px !important;
  top: 45% !important;
  margin: 0 1em;
  font-size: larger;
}
.carousel-caption {
  z-index: 1 !important;
  transition: 0.4s;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.552);
  text-align: start !important;
  padding-left: 3em;
  left: 0% !important;
  bottom: 16% !important;
}
.carousel-caption:hover {
  background-color: rgba(0, 0, 0, 0.774);
}
.carousel-caption .shop-now {
  padding: 8px 16px;
  background: #0a0a0a;
  color: rgba(255, 255, 255, 0.808);
  border-radius: 0px;
  letter-spacing: 4px;
  border: 2px solid white;
}
.carousel-caption .shop-now:hover {
  background: transparent;
  color: #000000;
  background: white;
}

.carousel-caption .title {
  font-weight: 300;
  line-height: 2.8rem;
  font-size: 2.8rem;
}
.jumbotron-header {
  font-weight: 900 !important;
  font-style: italic;
}
.jumbotron-btn {
  padding: 10px 16px !important;
  border-radius: 40rem !important;
  letter-spacing: 4px;
}

.carousel-control-next,
.carousel-control-prev {
  background: rgba(0, 0, 0, 0.863);
  border-radius: 50%;
}
</style>