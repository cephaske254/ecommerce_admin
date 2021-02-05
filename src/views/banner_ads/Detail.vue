<template>
  <div class="w-100">
    <router-link
      :to="{ name: 'Banner Ads' }"
      class="btn btn-sm btn-light position-fixed border-lighter"
      style="right: 0.5rem; top: 0.5rem; z-index: 10001"
      v-html="x"
    ></router-link>
    <div
      class="d-flex fixed-top h-100 justify-content-center align-items-center"
    >
      <div v-if="thisLoading === false || item.image">
        <form
          class="form-horizontal p-4 bg-dark-tr shadow-sm rounded"
          @submit="submit"
        >
          <div class="form-group">
            <label for="title">Banner Title</label>
            <input
              id="title"
              v-model="item.title"
              type="text"
              class="form-control input"
            />
            <form-errors :errors="validate" name="title" :touched="touched" />
          </div>

          <div class="form-group">
            <label for="imgUpload"
              >Banner Image
              <span class="text-muted small">(Prefer HD image)</span>
            </label>
            <div class="bg-lighter my-1 px-1 py-1">
              <croppie
                :onChange="setImage"
                :config="config"
                :hideResults="true"
                :max="1"
                :title="[
                  item.vacant || item.image
                    ? 'ADD BANNER IMAGE'
                    : 'UPDATE BANNER IMAGE',
                ]"
              />
            </div>
            <form-errors :errors="validate" name="image" :touched="touched" />
          </div>
          <div class="py-2 px-1 bg-lighter my-1">
            <div class="form-check form-switch">
              <label class="form-check-label" for="show_prices"
                >Show Product Prices</label
              >
              <input
                class="form-check-input"
                type="checkbox"
                id="show_prices"
                :checked="item.show_prices"
                @change="change"
              />
            </div>
          </div>
          <div class="py-2 px-1 bg-lighter my-1">
            <div class="form-check form-switch">
              <label class="form-check-label" for="active"
                >Activate Banner</label
              >
              <input
                class="form-check-input"
                type="checkbox"
                id="active"
                :checked="item.active"
                @change="change"
              />
            </div>
          </div>
          <div class="py-3">
            <div class="position-absolute">
              <loadingsm :loading="thisLoading" />
            </div>
            <button
              class="float-end btn btn-primary"
              v-html="[item.vacant === true ? 'SUBMIT' : 'UPDATE']"
              @click="submit"
            ></button>
          </div>
        </form>
      </div>
      <loadingsm v-else-if="loading || thisLoading" :loading="thisLoading" />
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
          :style="`background-image: url('${image}');background-color:rgba(200,200,200,.14)`"
        >
          <div class="carousel-caption">
            <p class="title">{{ item.title }}</p>
            <div class="px-2">
              <div class="d-flex" v-if="item.show_prices">
                <p class="h5" v-if="item.product && item.product.price">
                  {{ "KES " + item.product.price }}
                </p>
                <p
                  class="h5 ml-2"
                  v-if="item.product && item.product.market_price"
                >
                  <span class="mx-3 my-0 text-center">|</span>
                  <span class="strike text-light">
                    {{ "KES " + item.product.market_price }}
                  </span>
                </p>
              </div>
              <router-link
                :to="{ name: 'Product Detail', params: { slug } }"
                target="_blank"
                class="btn shop-now"
                >SHOP NOW</router-link
              >
            </div>
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
import {
  ADD_BANNER_AD,
  GET_BANNER_AD,
  UPDATE_BANNER_AD,
} from "../../store/types";
import Croppie from "../../subcomponents/Croppie.vue";
import FormErrors from "../../subcomponents/formErrors.vue";
import { buildImages } from "../products/helpers";
export default {
  components: { Croppie, FormErrors },
  props: ["errored", "loading", "bannerAds", "onRetry"],
  data() {
    return {
      thisLoading: false,
      touched: [],
      thisErrored: false,
      submitting: false,
      item: {
        vacant: false,
        image: null,
        active: false,
        show_prices: false,
        product: {},
      },
      config: {
        viewport: { width: 400, height: 300 },
      },
      x,
    };
  },
  computed: {
    validate() {
      const errors = {};
      if (!this.item.image) errors["image"] = ["Banner Image is required!"];
      if (!this.item.title) errors["title"] = ["Banner title is required!"];

      errors["valid"] = true;
      Object.entries(errors).forEach((error) => {
        if (error[1].length) {
          errors["valid"] = false;
        }
      });
      return errors;
    },
    image() {
      if (this.item.image) {
        return this.item.image.current || this.item.image.original;
      }
      return this.item.image;
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
      const banner = this.$store.getters.getBannerAds.find(
        (i) => i.product.slug === this.slug
      );

      if (banner) {
        this.item = { ...this.item, ...banner };
        return;
      }

      this.thisLoading = true;
      this.$store
        .dispatch(GET_BANNER_AD, this.slug)
        .then((data) => {
          this.item = { ...this.item, ...data.data };
        })
        .finally(() => (this.thisLoading = false));
    },
    submit(e) {
      e.preventDefault();
      this.touched = ["image", "title"];

      if (!this.validate.valid) return;

      this.thisLoading = true;

      const data = { ...this.item };
      data["image"] = data.image.current || data.image.original;

      if (this.item.vacant)
        this.$store.dispatch(ADD_BANNER_AD, data).finally(() => {
          this.thisLoading = false;
        });
      else
        this.$store.dispatch(UPDATE_BANNER_AD, data).finally(() => {
          this.thisLoading = false;
        });
    },
    change(e) {
      this.item[e.target.id] = e.target.checked;
    },
  },
  beforeUnmount() {
    document.getElementById("sidebar").hidden = false;
  },
  watch: {
    item(val1) {
      const self = this;
      buildImages([{ image: val1.image }], function (image) {
        self.item["image"] = image;
      });
    },
  },
};
</script>
<style   scoped>
label {
  color: #ccc;
}
</style>