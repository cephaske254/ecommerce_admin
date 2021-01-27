<template>
  <div
    class="carousel slide"
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
          <!-- <p class="h5" hidden>
            {item.price} &nbsp; {item.old_price != null ? (
            <strike class="text-muted">{item.old_price}</strike>
            ) : ( "" )}
          </p> -->
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
      <i class="fas fa-chevron-circle-left fa-lg" aria-hidden="true"></i>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carousel"
      role="button"
      data-bs-slide="next"
    >
      <i class="fas fa-chevron-circle-right fa-lg" aria-hidden="true"></i>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  props: ["carouselItems"],
  mounted() {
    document.getElementsByTagName("html")[0].classList.add("fullscreen");
  },
  beforeUnmount() {
    document.getElementsByTagName("html")[0].classList.remove("fullscreen");
  },
};
</script>

<style scoped>
.carousel-item {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-origin: border-box;
  min-height: 100vh;
}
.carousel-control-prev,
.carousel-control-next {
  max-height: 50px;
  width: 50px !important;
  top: 45% !important;
  margin: 0 1em;
  font-size: larger;
}
.carousel-caption {
  z-index: 1 !important;
  transition: 0.4s;
  width: 100%;
  background-color: #0000004b;
  text-align: start !important;
  padding-left: 3em;
  left: 0% !important;
  bottom: 16% !important;
}
.carousel-caption:hover {
  background-color: #000000b3;
}
.carousel-caption .shop-now {
  padding: 8px 16px;
  background: #0a0a0a;
  color: rgba(255, 255, 255, 0.808);
  border-radius: 0px;
  letter-spacing: 4px;
  border: 2px solid white;
}
.carousel-caption .shop-now:hover {
  background: transparent;
  color: #000000;
  background: white;
}

.carousel-caption .title {
  font-weight: 300;
  line-height: 2.8rem;
  font-size: 2.8rem;
}
.jumbotron-header {
  font-weight: 900 !important;
  font-style: italic;
}
.jumbotron-btn {
  padding: 10px 16px !important;
  border-radius: 40rem !important;
  letter-spacing: 4px;
}
</style>