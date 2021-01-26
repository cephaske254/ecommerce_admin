<template>
  <div class="container-fluid">
    <div class="bg-lighter p-2 rounded text-light d-flex">
      <div class="w-100 d-flex">
        <div class="bg-dark p-1 rounded">
          <span class="bi-files-alt"></span>
          <span class="badge">4/12</span>
        </div>
      </div>
      <form class="w-100" @submit="search">
        <input
          type="search"
          class="form-control form-control-sm bg-dark border-0"
          v-model="searchQuery"
          placeholder="Search"
        />
      </form>
      <div class="w-100">
        <div class="btn-group float-end">
          <button
            title="refresh"
            @click="refresh"
            class="btn btn-outline-primary btn-sm"
          >
            <i
              class="bi bi-arrow-counterclockwise"
              :class="[loading ? 'spin' : '']"
            ></i>
          </button>
          <router-link
            :to="{ name: 'Add Product' }"
            class="btn btn-sm btn-primary"
          >
            <i class="bi bi-plus"></i>
          </router-link>
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap">
      <card v-for="ad in bannerAds" :key="ad.slug" :item="ad" />
    </div>
  </div>
</template>

<script>
import { GET_BANNER_ADS } from "../../store/types";
import Card from "./Card.vue";
export default {
  components: { Card },
  data() {
    return {
      loading: false,
      errored: false,
      searchQuery: null,
    };
  },
  computed: {
    bannerAds() {
      return this.$store.getters.getBannerAds || [];
    },
  },
  created() {
    this.$options.currentPage("Banner Ads");
  },
  mounted() {
    if (!this.bannerAds.length) {
      this.loading = true;
      this.$store
        .dispatch(GET_BANNER_ADS)
        .catch(() => (this.errored = true))
        .finally(() => (this.loading = false));
    }
  },
};
</script>

<style
Card>
</style>