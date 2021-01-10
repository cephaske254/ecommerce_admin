<template>
  <navbar-vue />
  <div class="d-flex">
    <side-bar-vue />
    <section class="section main-panel w-100 mt-1">
      <router-view> </router-view>
    </section>
  </div>
</template>

<script>
import NavbarVue from "./components/Navbar.vue";
import SideBarVue from "./components/SideBar.vue";
import { _ } from "./utils/functions";
import "bootstrap/js/dist/carousel";
import "bootstrap/js/dist/collapse";
import "bootstrap-icons/font/bootstrap-icons.css";
export default {
  components: {
    NavbarVue,
    SideBarVue,
  },
  mounted: function () {
    setTimeout(() => {
      _("dataLoader").fade("out", 600);
    }, 1000);
  },
  beforeUnmount() {
    _("dataLoader").fade("in");
  },
};
</script>

<style>
@import url("assets/styles.css");
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
  font-family: initial !important;
  display: flex;
}
.list-style-none {
  list-style-type: none;
}
.strike {
  text-decoration: line-through;
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s !important;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>