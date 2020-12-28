<template>
  <div class="col-sm-12 column col-md-4 col-lg-3 col-sm-6 col-6 col-xs-6 py-2">
    <div class="card bg-lighter product-card">
      <img
        @click="$emit('view', item.id)"
        src="http://placehold.it/250x250"
        alt=""
        class="card-img-top"
      />
      <div @click="$emit('view', item.id)" class="card-body">
        <h6 class="card-title">
          {{ trimText(item.name, 30).toUpperCase() }}
        </h6>
        <div class="d-flex">
          <p class="col prc card-subtitle text-uppercase small">Ksh 3,000</p>
          <p class="col small card-subtitle text-end">IN STOCK</p>
        </div>
      </div>
      <div class="card-footer d-flex bg-lighter border-0 pb-1">
        <div class="btn-group">
          <button class="btn btn-sm text-info" @click="$emit('edit', item.id)">
            <i class="bi bi-pen"></i>
          </button>
          <button
            class="btn btn-sm text-danger"
            @click="$emit('delete', item.id)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <div class="w-100">
          <div
            class="d-flex float-end align-items-center p-1 rounded bg-s text-info"
            title=" images"
          >
            <i class="bi bi-images"></i
            ><span class="px-1 small rounded">{{ item.imageCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { trimText } from "@/utils/functions";
export default {
  props: ["item", "onView", "onEdit", "onDelete"],
  methods: {
    trimText,
  },
};
</script>

<style>
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
.product-card {
  cursor: pointer;
}
</style>