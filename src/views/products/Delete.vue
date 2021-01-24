<template>
  <div id="deleteCont" class="container-fluid fixed-top" @click="click">
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
          <div class="card-footer">
            <div class="d-flex btns">
              <router-link
                :to="{ name: 'Edit Product' }"
                class="btn btn-light mx-2"
                >Cancel</router-link
              >
              <button class="btn btn-danger mx-2">Delete!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  },
};
</script>

<style scoped>
.card-cont {
  background: linear-gradient(
    40deg,
    rgb(225, 78, 78),
    rgb(225, 78, 202),
    rgb(12, 119, 220),
    rgb(12, 220, 185)
  );
}
@media screen and (max-width: 768px) {
  .card-cont {
    margin-bottom: 8rem;
  }
}
.card {
  border-radius: 0.1rem;
  min-height: 40vh;
  z-index: 12;
}
.card-body {
  align-items: center;
  justify-content: center;
  display: flex;
}
.bi {
  font-size: 7rem;
}

</style>