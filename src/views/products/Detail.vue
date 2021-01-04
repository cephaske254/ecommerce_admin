<template>
  <div class="container" v-if="product">
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-7 py-2 imagesScroll">
        <div class="fluid">
          <div class="card bg-lighter border-0 shadow-sm">
            <div
              class="carousel slide w-100"
              id="carousel"
              data-ride="carousel"
              data-wrap="true"
              data-keyboard="true"
            >
              <div
                v-for="(image, index) in product.images"
                :key="'image' + index"
                class="carousel-inner"
              >
                <div
                  :key="'carousel-img-'"
                  index
                  :class="['carousel-item' + index === 0 ? ' active' : '']"
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
                  data-target="#carousel"
                  :data-slide-to="index"
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
          <p class="my-0 d-flex">{{ product.name }}</p>
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

        <!-- {this.props.product.attributes && (
                <AttributeCont attributes={this.props.product.attributes} />
              )} -->
        <p class="prc m-0">{{ product.price }}</p>
        <router-link
          :to="{ name: 'Edit Product', params: { slug: product.slug } }"
          class="btn btn-gradient w-100 btn-sm"
          >EDIT PRODUCT</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "@/store/types";

export default {
  computed: {
    productId() {
      return this.$route.params.slug;
    },
    product() {
      return this.$store.getters["products/getProductDetail"];
    },
  },
  methods: {
    getProduct() {
      this.$store
        .dispatch("products/" + types.GET_PRODUCT_DETAIL, this.productId)
        .then((data) => {
          console.log(data.status);
        })
        .finally(console.log(this.product));
    },
  },
  mounted: function () {
    this.getProduct();
  },
  watch: {
    product() {
      console.log(JSON.stringify(this.product.description));
    },
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