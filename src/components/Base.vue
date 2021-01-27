<template>
  <navbar-vue />
  <section class="d-flex">
    <side-bar-vue height="navbarHeight" />
    <div
      class="main-panel hidse-scroll"
      :style="`height:${navbarHeight}px !important`"
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
    return {
      navbarHeight: null,
    };
  },
  components: {
    NavbarVue,
    SideBarVue,
  },

  mounted() {
    this.setHeight();
    const self = this;
    window.onresize = () => {
      self.setHeight();
    };
  },
  methods: {
    setHeight() {
      this.navbarHeight =
        window.innerHeight - document.getElementById("nav-cont").clientHeight;
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
