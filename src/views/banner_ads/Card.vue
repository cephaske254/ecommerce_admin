<template>
  <div class="col-md-4 col-sm-6 col-lg-4 p-2">
    <div class="card bg-lighter">
      <img
        :src="item.image"
        alt=""
        loading="lazy"
        class="card-img-top"
        @error="$emit('error', $event)"
      />
      <div class="card-body">
        <h5 class="card-title text-light-tr">{{ item.title }}</h5>
        <p class="card-text">
          {{
            trimText(
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptate, neque quasi doloremque maxime ducimus ipsa fuga impedit, facilis, dolorum est omnis magni quaerat iste explicabo. Ipsam exercitationem possimus atque!",
              100
            )
          }}
        </p>
      </div>
      <div class="card-footer">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            name="available"
            :checked="item.available"
          />
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import { trimText } from "../../utils/functions";
export default {
  props: ["item"],
  methods: {
    trimText,
  },
};
</script>

<style>
.card-img-top {
  min-height: 150px !important;
}
</style>