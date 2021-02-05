<template>
  <div
    class="carousel slide carousel-slide"
    data-bs-ride="carousel"
    data-bs-pause="false"
    id="carousel"
  >
    <div class="carousel-inner">
      <div
        v-for="(item, index) in carouselItems"
        :key="'carousel-2sa-' + index"
        class="carousel-item"
        :class="[index === 0 ? 'active' : '']"
        :style="`background-image: url('${item.image}')`"
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
              :to="{
                name: 'Product Detail',
                params: { slug: item.product.slug },
              }"
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
</template>

<script>
export default {
  props: ["carouselItems", "errored", "loading"],
  data() {
    return {};
  },
  mounted() {
    document.getElementsByTagName("html")[0].classList.add("fullscreen");
  },
  beforeUnmount() {
    document.getElementsByTagName("html")[0].classList.remove("fullscreen");
  },
};
</script>