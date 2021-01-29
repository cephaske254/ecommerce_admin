<template>
  <loadingsm v-if="loading && !bannerAds" :loading="loading" />
  <error-abstract v-else-if="!loading && errored" :onRetry="onRetry" />
  <div v-else class="container-fluid">
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
          <button title="refresh" @click="onRetry" class="btn btn-primary">
            <i
              class="bi bi-arrow-counterclockwise"
              :class="[loading ? 'spin' : '']"
            ></i>
          </button>
          <router-link
            :to="{ name: 'Preview Banner Ads' }"
            class="btn btn-outline-primary"
          >
            <i class="bi bi-eye"></i>
          </router-link>
          <router-link :to="{ name: 'Add Banner Ad' }" class="btn btn-primary">
            <i class="bi bi-plus"></i>
          </router-link>
        </div>
      </div>
    </div>
    <h4 v-if="!bannerAds.length" class="py-5 text-center">
      NO BANNER ADS TO SHOW
    </h4>

    <div class="d-flex flex-wrap">
      <card v-for="ad in bannerAds" :key="ad.slug" :item="ad" />
    </div>
  </div>
  <router-view />
</template>

<script>
import ErrorAbstract from "../../subcomponents/handlers/Error.abstract.vue";
import Loadingsm from "../../subcomponents/Loadingsm.vue";
import Card from "./Card.vue";
export default {
  props: ["bannerAds", "loading", "errored", "onRetry"],
  components: { Card, Loadingsm, ErrorAbstract },
  data() {
    return {
      searchQuery: null,
    };
  },
  created() {
    this.$options.currentPage("Banner Ads");
  },

  mounted() {},
  methods: {},
};
</script>

<style></style>