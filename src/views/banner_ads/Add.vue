<template>
  <div class="container-fluid fixed-bottom py-2">
    <div
      class="row justify-content-center"
      :style="`height:100%;min-height : ${$store.getters.getNavbarHeight}px`"
    >
      <div class="col-md-6 p-3">
        <div class="card bg-dark p-2 h-100">
          <form class="form-inline">
            <div class="form-group">
              <label for="title">Banner Title</label>
              <span class="required"></span>
              <input type="text" class="form-control input" />
              <small class="mx-1 text-muted"
                >Shorter titles are recommended</small
              >
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <span class="float-end text-muted">{{ remainingLength }}</span>
              <textarea
                id="description"
                class="input border-0 form-control"
                :placeholder="'Maximum ' + maxLength"
                v-model="description"
                @keyup="keyup"
              ></textarea>
            </div>
          </form>

          <div class="py-2">
            <label for="imgUpload">Image</label>
            <span class="required"></span>
            <croppie
              :onChange="(data) => (image = data[0])"
              :config="config"
              title="SELECT BANNER IMAGE"
              :max="1"
            />
          </div>
          <label
            >Referred Product
            <span class="required"></span>
          </label>
          <div
            v-if="product && product.name"
            class="card bg-lighter border-0 rounded-0 mb-1"
          >
            <div class="card-body py-2">
              <div class="d-flex">
                <img
                  :src="product.images[0].image"
                  width="80"
                  height="80"
                  alt=""
                  class="rounded"
                />
                <div class="col px-2">
                  <h4 class="my-0">{{ product.name }}</h4>
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
            </div>
          </div>
          <loadingsm v-else :loading="[product ? true : false]" />
          <div class="h-100 d-flex justify-content-end align-items-end">
            <div class="mx-3">
              <loadingsm :loading="submitting" />
            </div>
            <button @click="submit" class="btn btn-primary">SUBMIT</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_PRODUCT_DETAIL } from "../../store/types";
import Croppie from "../../subcomponents/Croppie.vue";
import { formatPrice } from "../../utils/functions";
export default {
  props: ["bannerAds", "loading", "errored"],
  components: { Croppie },
  data() {
    return {
      image: null,
      description: "",
      maxLength: 100,
      title: null,
      config: {
        viewport: { width: 440, height: 330 },
      },
      product: {},
      submitting: false,
    };
  },
  computed: {
    remainingLength() {
      return this.maxLength - this.description.length;
    },
    slug() {
      return this.$route.query["product"];
    },
  },
  methods: {
    formatPrice,
    validate,
    removeImage(id) {
      console.log(id);
    },
    keyup(e) {
      this.description = String(e.target.value)
        .trimStart()
        .slice(0, this.maxLength);
    },
    getProduct() {
      this.$store
        .dispatch(`products/${GET_PRODUCT_DETAIL}`, this.slug)
        .then((data) => {
          this.product = data.data;
        })
        .catch(() => {
          this.$router.replace("/404/");
        });
    },
    submit(e) {
      e.preventDefault();
      this.submitting = true;
      this.$store.dispatch("addBannerAd", {
        title: this.title,
        description: this.description,
        image: this.image,
      });
    },
  },
  created() {
    this.$options.currentPage(this.$route.name);
  },
  mounted() {
    document.body.classList.add("overflow-hidden");
    this.getProduct();
  },
};
function validate(title, description, image) {
  console.log(this);
  const errors = {};
  if (!title) errors["title"] = "This field is required!";
  if (!image) errors["title"] = "Please select an image";
  if (!description) errors["title"] = "This field is required!";
}
</script>

<style scoped>
.container-fluid {
  right: 0 !important;
  background: rgba(30, 30, 43, 0.822) !important;
  border-radius: 1rem 0 0 1rem;
}
</style>