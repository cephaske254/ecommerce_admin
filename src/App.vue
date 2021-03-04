<template>
  <router-view />
</template>

<script>
import { _ } from "./utils/functions";
import "./assets/styles.css";

export default {
  mounted: function () {
    this.setHeight();
    const self = this;
    window.onload = () => self.setHeight();
    window.onresize = () => self.setHeight();

    setTimeout(() => {
      _("dataLoader").fade("out", 600);
    }, 1000);
  },
  beforeUnmount() {
    _("dataLoader").fade("in");
  },
  computed: {
    accessValid() {
      return this.$store.getters.accessValid;
    },
  },

  methods: {
    setHeight() {
      try {
        this.$store.dispatch(
          "navbarHeight",
          window.innerHeight - document.getElementById("nav-cont").clientHeight
        );
      } catch {
        return;
      }
    },
  },
  watch: {
    accessValid(val1) {
      if (val1 === false) this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
</style>