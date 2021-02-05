<template>
  <div class="col-md-4 col-sm-6 col-lg-4 p-2">
    <div class="card bg-lighter" @click="click">
      <img
        :src="item.image"
        loading="lazy"
        class="card-img-top rounded"
        @error="$emit('error', $event)"
      />

      <div class="card-body position-absolute py-1 text-light-tr">
        <h5 class="card-title m-0">{{ item.title }}</h5>
        <p class="card-subtitle small">~ {{ item.product.name }} ~</p>
        <label
          :for="`available-${item.slug}`"
          class="p-1 w-100"
          @click="updateAvailability"
        >
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              name="available"
              :id="`available-${item.slug}`"
              :checked="item.active"
            />
          </div>
        </label>
      </div>
    </div>
  </div>
</template> 

<script>
import { UPDATE_BANNER_AD } from "../../store/types";
import { trimText } from "../../utils/functions";
export default {
  props: ["item"],
  data() {
    return {
      item1: {
        active: this.item.active,
        product: { slug: this.item.product.slug },
      },
    };
  },
  methods: {
    trimText,
    updateAvailability(e) {
      e.stopPropagation();
      this.item1.active = e.target.checked;
      this.$store.dispatch(UPDATE_BANNER_AD, this.item1);
    },
    click() {
      this.$router.push({
        name: "Banner Ad Detail",
        params: { slug: this.item.product.slug },
      });
    },
  },
};
</script>

<style scoped>
.card {
  cursor: pointer;
}
.card-img-top {
  min-height: 150px !important;
}
.card-body {
  bottom: 5%;
  width: 100%;
  text-align: center;
  background: var(--bs-dark-tr);
}
</style>