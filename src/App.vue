<template>
  <router-view />
</template>


<script>
import { _ } from "./utils/functions";
import "./assets/styles.css";

export default {
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