<template>
  <div class="container" v-if="product && product.name && errored === false">
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-7 py-2 imagesScroll">
        <div class="fluid">
          <div class="card bg-dark border-0 shadow-sm">
            <div
              class="carousel slide w-100"
              id="carousel"
              data-bs-ride="carousel"
              data-bs-wrap="true"
              data-bs-keyboard="true"
            >
              <div class="carousel-inner">
                <div
                  v-for="(image, index) in product.images"
                  :key="'carousel-img-' + index"
                  class="carousel-item"
                  :class="[index === 0 ? ' active' : '']"
                >
                  <div class="d-flex imageCont">
                    <img :src="image.image" alt="" class="img-fluid" />
                  </div>
                </div>
              </div>
              <ol v-if="product.images" class="carousel-indicators">
                <li
                  v-for="(image, index) in product.images"
                  :key="index"
                  data-bs-target="#carousel"
                  :data-bs-slide-to="index"
                  :style="{
                    backgroundImage: `url(${image.image})`,
                  }"
                  :class="[index === 0 ? 'active' : '']"
                ></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-5 py-2 px-3">
        <div class="title">
          <p class="my-0 d-flex h3">{{ product.name }}</p>
        </div>
        <div class="d-flex">
          <p class="prc m-0 col prc h5">
            KES {{ formatPrice(product.price) }}
          </p>
          <p
            v-if="product.market_price && product.discount_price"
            class="prc m-0 col strike"
          >
            KES {{ formatPrice(product.market_price) }}
          </p>
        </div>

        <h5>Description</h5>
        <div
          v-if="product.description"
          class="text"
          v-html="product.description"
        />

        <p v-if="!product.description" class="text-muted text-center">
          No Description Provided
        </p>

        <router-link
          :to="{ name: 'Edit Product', params: { slug: product.slug } }"
          class="btn btn-gradient w-100 btn-sm"
          >EDIT PRODUCT</router-link
        >
      </div>
    </div>
  </div>
  <error-abstract v-else :onRetry="getProduct" />
</template>

<script>
import * as types from "@/store/types";
import ErrorAbstract from "../../subcomponents/handlers/Error.abstract.vue";
import { formatPrice } from "../../utils/functions";
export default {
  components: { ErrorAbstract },
  data() {
    return {
      errored: false,
    };
  },
  computed: {
    productId() {
      return this.$route.params.slug;
    },
    product() {
      return this.$store.getters["products/getProductDetail"];
    },
  },
  methods: {
    formatPrice,
    getProduct() {
      this.$store
        .dispatch("products/" + types.GET_PRODUCT_DETAIL, this.productId)
        .then(() => (this.errored = false))
        .catch(() => {
          this.errored = true;
        });
    },
  },
  mounted: function () {
    if (this.$route.query.ref === "Edit Product") {
      if (
        this.product &&
        this.description &&
        this.$route.params.slug === this.product.slug
      )
        return;
    }
    this.getProduct();
  },
  watch: {
    product() {},
  },
};
</script>

<style>
@import url("./Detail.css");
.carousel-indicators {
  margin-right: 15%;
  margin-left: 15%;
}
</style>