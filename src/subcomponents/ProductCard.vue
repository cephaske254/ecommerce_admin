<template>
  <div class="col-sm-12 column col-md-4 col-lg-3 col-sm-6 col-6 col-xs-6 py-2">
    <div
      class="card bg-lighter p-2 text border-0 shadow-sm h-100 text-decoration-none"
    >
      <div
        class="card-top text-decoration-none h-100"
        @click="$emit('view', product.slug)"
      >
        <div class="product-image-cont">
          <img :src="loadingSvg" class="loadingImg" alt="" />
          <img
            :src="product.image"
            alt=""
            loading="lazy"
            class="card-img-top abs"
            @error="$emit('error', $event)"
          />
        </div>
        <div
          class="card-footer px-2 bg-lighter border-0 d-flex flex-column justify-content-end"
        >
          <p class="font-weight-bold mb-1">
            {{ product.name }}
          </p>
          <div class="d-flex small">
            <div class="col p-0">
              {{ formatPrice(product.price) }}
            </div>
            <div
              v-if="product.market_price && product.discount_price"
              class="text-right strike text-muted"
            >
              {{ formatPrice(product.market_price) }}
            </div>
          </div>
        </div>
      </div>
      <div class="w-100 py-1">
        <router-link
          :to="{ name: 'Banner Ad Detail', params: { slug: product.slug } }"
          class="btn btn-sm btn-dark float-end"
          :class="[product.has_banner_ad ? 'text-primary' : ' ']"
          v-html="lightning"
        ></router-link>
      </div>
      <div class="d-flex justify-self-end">
        <button
          @click="$emit('edit', product.slug)"
          class="btn btn-mono btn-gradient btn-sm w-100"
        >
          EDIT PRODUCT
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import loadingSvg from "../assets/images/loader.svg";
import { trimText } from "@/utils/functions";
import { formatPrice } from "../utils/functions";
import { lightning } from "../globalAssets";
export default {
  props: ["product", "onView", "onEdit", "onDelete", "onError"],
  data() {
    return {
      loadingSvg,
      lightning,
    };
  },
  methods: {
    trimText,
    formatPrice,
  },
  mounted() {},
};
</script>

<style scoped>
/* 768 576 */
@media only screen and (min-width: 576px) and (max-width: 768px) {
  .column {
    width: 50%;
  }
}
@media only screen and (max-width: 576px) {
  .column {
    width: 100%;
  }
}
.card {
  cursor: pointer;
  color: hsla(0, 0%, 100%, 0.8) !important;
}
.prc {
  font-weight: 600;
  letter-spacing: 0.07rem;
  margin-left: 0.5rem;
}
</style>