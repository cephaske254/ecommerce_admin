<template>
  <div id="deleteCont" class="container-fluid fixed-top del" @click="click">
    <div class="row vh-100 align-items-center justify-content-center">
      <div class="col-lg-4 col-md-6 col-sm-8 col-xs-12 p-1 rounded card-cont">
        <div class="card bg-lighter shadow">
          <div class="card-body flex-column">
            <span class="bi bi-x-circle text-danger m-2"></span>
            <p class="h3 card-title">ARE YOU SURE?</p>

            <h4 class="text-left w-100 card-subtitle">Please note that</h4>

            <ul class="px-3 w-100">
              <li>Cart items related to this product will NOT be affected.</li>
              <li>Links referring to this product will get broken.</li>
              <li>This product and its related data will be deleted.</li>
              <li>This action CANNOT be reversed!</li>
            </ul>
          </div>
          <div
            v-if="loading"
            class="position-absolute w-100 justify-content-center"
          >
            <loadingsm :loading="true" />
          </div>
          <p v-if="errored" class="text-danger my-0 text-center">
            A network error occured. Try again
          </p>
          <div class="card-footer">
            <div class="d-flex btns">
              <button
                :disabled="loading"
                @click="
                  () => {
                    $router.push({ name: 'Edit Product' });
                  }
                "
                class="btn btn-light mx-2"
              >
                Cancel
              </button>
              <button
                :disabled="loading"
                @click="deleteProduct"
                class="btn btn-danger mx-2"
              >
                Delete!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DELETE_PRODUCT } from "../../store/types";
import "../../assets/delete.css";
export default {
  data() {
    return {
      loading: false,
      errored: false,
    };
  },
  beforeMount() {
    document.addEventListener("keydown", this.handleEventListener);
  },
  mounted() {
    document.getElementsByTagName("html")[0].classList.add("fullscreen");
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleEventListener);
    document.getElementsByTagName("html")[0].classList.remove("fullscreen");
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
  },
  methods: {
    handleEventListener(e) {
      if (e.code === "Escape") this.dismiss();
    },
    dismiss() {
      this.$router.replace({ name: "Edit Product" });
    },
    click(e) {
      if (e.target.parentElement.id === "deleteCont") this.dismiss();
    },
    deleteProduct() {
      this.loading = true;
      this.errored = false;

      this.$store
        .dispatch("products/" + DELETE_PRODUCT, this.slug)
        .then(() => {
          this.$router.push({ name: "Products" });
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>