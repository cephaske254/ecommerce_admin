<template>
  <div class="w-100">
    <router-link
      :to="{ name: 'Banner Ads' }"
      class="btn btn-light position-fixed border-lighter"
      style="right: 0.5rem; top: 0.5rem; z-index: 10001"
      v-html="x"
    ></router-link>
    <div
      class="d-flex fixed-top h-100 justify-content-center align-items-center"
      :class="[item.image ? '' : 'bg-dark-tr']"
    >
      <div v-if="thisLoading === false">
        <form class="form-horizontal p-4 bg-dark border border-lighter rounded">
          <div class="form-group">
            <label for="title">Banner Title</label>
            <input
              id="title"
              v-model="item.title"
              type="text"
              class="form-control input"
            />
          </div>
          <div class="form-group">
            <label for="imgUpload">Banner Image</label>
            <croppie
              :onChange="setImage"
              :config="config"
              :hideResults="true"
              :max="1"
              :title="[updating ? 'UPDATE BANNER IMAGE' : 'ADD BANNER IMAGE']"
            />
          </div>
          <div class="py-3">
            <button
              class="float-end btn btn-primary"
              v-html="[item.vacant ? 'SUBMIT' : 'UPDATE']"
            ></button>
          </div>
        </form>
      </div>
      <loadingsm v-else-if="loading" :loading="thisLoading" />
    </div>
    <div
      class="carousel slide"
      data-bs-ride="carousel"
      data-bs-pause="false"
      id="carousel"
    >
      <div class="carousel-inner">
        <div
          class="carousel-item active"
          :style="`background-image: url('${image}')`"
        >
          <div class="carousel-caption">
            <p class="title">{{ item.title }}</p>
            <p class="h5" v-if="item.product">
              {{ item.product.price }}
              <span class="text-muted strike">{{
                item.product.market_price
              }}</span>
              ) : ( "" )}
            </p>
            <button class="btn shop-now">SHOP NOW</button>
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carousel"
        role="button"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </a>
      <a
        class="carousel-control-next"
        href="#carousel"
        role="button"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </a>
    </div>
  </div>
</template>

<script>
import { x } from "../../globalAssets";
import { GET_BANNER_AD } from "../../store/types";
import Croppie from "../../subcomponents/Croppie.vue";
export default {
  components: { Croppie },
  props: ["errored", "loading", "bannerAds", "onRetry"],
  data() {
    return {
      thisLoading: false,
      thisErrored: false,
      item: {},
      config: {
        viewport: { width: 400, height: 300 },
      },
      x,
    };
  },
  computed: {
    image() {
      if (this.item.image && this.item.image.current) {
        return this.item.image.current;
      }
      return this.item.image;
    },
    updating() {
      if (this.item.image) return true;
      return false;
    },
    slug() {
      if (this.$route.params.slug) return this.$route.params.slug;
      return null;
    },
  },
  mounted() {
    this.getBannerAd();
    document.getElementById("sidebar").hidden = true;
    this.$options.currentPage(this.$route.name);
  },
  methods: {
    setImage(image) {
      this.item = { ...this.item, image: image[0] };
    },
    getBannerAd() {
      this.thisLoading = true;
      this.$store
        .dispatch(GET_BANNER_AD, this.slug)
        .then((data) => {
          this.item = data.data;
        })
        .finally(() => (this.thisLoading = false));
    },
  },
  beforeUnmount() {
    document.getElementById("sidebar").hidden = false;
  },
};
</script>