<template>
  <navbar-vue />
  <section class="d-flex">
    <side-bar-vue />
    <div
      class="main-panel hide-scroll"
      :style="`height:${$store.getters.getNavbarHeight}px !important`"
    >
      <router-view />
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import "bootstrap/js/dist/carousel";
import "bootstrap/js/dist/collapse";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavbarVue from "./Navbar.vue";
import SideBarVue from "./SideBar.vue";

export default {
  data() {
    return {};
  },
  components: {
    NavbarVue,
    SideBarVue,
  },

  mounted() {
    this.setHeight();
    const self = this;
    window.onload = () => self.setHeight();
    window.onresize = () => self.setHeight();
  },
  methods: {
    setHeight() {
      this.$store.dispatch(
        "navbarHeight",
        window.innerHeight - document.getElementById("nav-cont").clientHeight
      );
    },
  },
};
</script>

<style scoped>
.main-panel {
  width: 100% !important;
  overflow-y: scroll;
  overflow-x: hidden;
}
.uploading .main-panel,
.fullscreen .main-panel {
  min-height: 100vh;
}
</style>
