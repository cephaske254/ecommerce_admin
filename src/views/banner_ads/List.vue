<template>
  <div>
    <loadingsm v-if="loading && !bannerAds.length" :loading="loading" />
    <error-abstract v-else-if="!loading && errored" :onRetry="onRetry" />
    <div v-else class="container-fluid">
      <div class="bg-lighter p-2 rounded text-light d-flex">
        <div class="w-100 d-flex">
          <div class="bg-dark p-1 rounded">
            <span class="bi-files-alt"></span>
            <span class="badge">{{ $store.getters.getTotalCount }}</span>
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
              v-if="bannerAds.length"
              :to="{ name: 'Preview Banner Ads' }"
              class="btn btn-outline-primary"
            >
              <i class="bi bi-eye"></i>
            </router-link>
          </div>
        </div>
      </div>
      <h4 v-if="!bannerAds.length && !loading" class="py-5 text-center">
        NO BANNER ADS TO SHOW
      </h4>

      <div class="d-flex flex-wrap">
        <card v-for="ad in bannerAds" :key="ad.slug" :item="ad" />
        <div v-if="!gotIt" class="col-md-4 col-sm-6 col-lg-4 p-2 text-light-tr">
          <div class="card h-100 bg-lighter shadow-sm border-dark">
            <div
              class="card-body align-items-center justify-content-center d-flex"
            >
              <p class="card-text mt-4">
                To create a banner ad, go to the
                <router-link
                  class="text-decoration-none"
                  :to="{ name: 'Products' }"
                >
                  Products</router-link
                >
                page, and click on the
                <button
                  class="btn btn-light btn-sm"
                  v-html="lightning"
                ></button>
                icon <br />
              </p>
            </div>
            <div class="px-2">
              <button
                @click="setGotIt"
                class="btn btn-primary my-2 btn-sm w-100"
              >
                GOT IT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { lightning } from "../../globalAssets";
import ErrorAbstract from "../../subcomponents/handlers/Error.abstract.vue";
import Card from "./Card.vue";
export default {
  props: {
    bannerAds: Array,
    loading: Boolean,
    errored: Boolean,
    onRetry: null,
  },
  components: { Card, ErrorAbstract },
  data() {
    return {
      gotIt: null,
      lightning,
      searchQuery: null,
    };
  },
  created() {
    this.$options.currentPage("Banner Ads");
  },

  mounted() {
    this.gotIt = JSON.parse(localStorage.getItem("gotIt"));
  },
  methods: {
    setGotIt() {
      localStorage.setItem("gotIt", JSON.stringify(true));
    },
  },
};
</script>

<style></style>