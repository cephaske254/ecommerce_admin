<template>
  <navbar-vue />
  <section class="d-flex">
    <side-bar-vue />
    <section class="main-panel">
      <router-view />
    </section>
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
  components: {
    NavbarVue,
    SideBarVue,
  },
};
</script>

<style scoped>
.main-panel {
  width: 100% !important;
}
</style>
