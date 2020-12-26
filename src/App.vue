
<template>
  <navbar-vue />
  <div class="d-flex">
    <side-bar-vue />
    <section class="section main-panel w-100 mt-1">
      <router-view />
    </section>
  </div>
</template>

<script>
import NavbarVue from "./components/Navbar.vue";
import SideBarVue from "./components/SideBar.vue";

export default {
  components: {
    NavbarVue,
    SideBarVue,
  },
};
</script>

<style>
@import url("assets/styles.css");
@import url("~bootstrap-icons/font/bootstrap-icons.css");

.main-panel {
  transition: ease-in-out 0.4s;
}
@media (min-width: 768px) {
  .nav-open body {
    overflow: scroll !important;
  }
}
.nav-open body {
  overflow: hidden;
}
.bi {
  font-family: initial;
  display: flex;
}
</style>