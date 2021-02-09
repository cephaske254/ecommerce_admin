<template>
  <div>
    <loadingsm v-if="loading && !sortedBanners.length" :loading="loading" />
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
                :class="[loading || thisLoading ? 'spin' : '']"
              ></i>
            </button>
            <router-link
              v-if="sortedBanners.length"
              :to="{ name: 'Preview Banner Ads' }"
              class="btn btn-outline-primary"
            >
              <i class="bi bi-eye"></i>
            </router-link>
          </div>
        </div>
      </div>
      <h4 v-if="!sortedBanners.length && !loading" class="py-5 text-center">
        NO BANNER ADS TO SHOW
      </h4>
      <div v-else-if="sortedBanners.length">
        <draggable
          class="d-flex flex-wrap"
          itemKey="slug"
          v-model="sortedBanners"
          @change="reOrdered = true"
        >
          <template #item="{ element }">
            <card :item="element" />
          </template>
        </draggable>
      </div>
      <button
        v-if="reOrdered"
        class="position-fixed btn btn-sm btn-primary m-2"
        style="right: 0; bottom: 0"
        @click="saveOrder"
      >
        SAVE ORDER
      </button>

      <div
        v-if="!gotIt || !sortedBanners.length"
        class="col-md-4 col-sm-6 col-lg-4 p-2 text-light-tr"
        :class="[!sortedBanners.length ? 'mx-auto' : '']"
      >
        <div class="card h-100 bg-lighter shadow-sm border-dark">
          <div
            class="card-body align-items-center justify-content-center d-flex flex-column"
          >
            <div class="w-100 border-bottom border-dark pb-2">
              <span class="bi bi-info-circle bi-lg"></span>
            </div>
            <ol class="px-1 m-0">
              <li class="card-text mt-2">
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
              </li>
              <li>Drag the 'Cards' to re-order the banner ads.</li>
            </ol>
          </div>
          <div class="px-2">
            <button @click="setGotIt" class="btn btn-primary my-2 btn-sm w-100">
              GOT IT
            </button>
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
import draggable from "vuedraggable";
import {
  COMMIT_BANNER_ADS,
  RESET_BANNER_ADS_STATE,
  CHANGE_BANNER_ADS_ORDER,
} from "../../store/types";
import Card from "./Card.vue";

export default {
  props: {
    loading: Boolean,
    errored: Boolean,
    onRetry: null,
  },
  components: { Card, ErrorAbstract, draggable },
  data() {
    return {
      gotIt: null,
      lightning,
      searchQuery: null,
      reOrdered: false,
      thisLoading: false,
    };
  },
  computed: {
    sortedBanners: {
      get() {
        return this.$store.getters.getBannerAds;
      },
      set(value) {
        this.$store.commit(RESET_BANNER_ADS_STATE);
        this.$store.commit(COMMIT_BANNER_ADS, { data: value });
      },
    },
  },
  created() {
    this.$options.currentPage("Banner Ads");
  },

  mounted() {
    this.gotIt = JSON.parse(localStorage.getItem("gotIt"));
  },
  methods: {
    setGotIt() {
      this.gotIt = true;
      localStorage.setItem("gotIt", JSON.stringify(true));
    },
    saveOrder() {
      this.thisLoading = true;
      this.$store
        .dispatch(CHANGE_BANNER_ADS_ORDER, this.sortedBanners)
        .finally(() => {
          this.reOrdered = false;
          this.thisLoading = false;
        });
    },
  },
};
</script>