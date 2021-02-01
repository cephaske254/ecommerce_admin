<template>
  <div class="carousel">
    <div class="carousel-inner">
      <div
        class="carousel-item active"
        :style="`background-image: url('${item.image}')`"
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
          <router-link
            :to="`/${item.link}`"
            target="_blank"
            class="btn shop-now"
            >SHOP NOW</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_BANNER_AD } from "../../store/types";
export default {
  data() {
    return {
      loading: false,
      errored: false,
      item: {},
    };
  },
  computed: {
    slug() {
      if (this.$route.params.slug) return this.$route.params.slug;
      return null;
    },
  },
  methods: {
    getBannerAd() {
      this.$store.dispatch(GET_BANNER_AD, this.slug);
    },
  },
};
</script>

<style>
</style>