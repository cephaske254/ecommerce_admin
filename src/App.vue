<template>
  <navbar-vue />
  <section class="d-flex">
    <side-bar-vue />
    <div
      class="main-panel hide-scroll"
      :style="`height:${$store.getters.getNavbarHeight}px !important`"
    >
      <router-view v-slot="{ Component }">
        <transition
          :name="transitionName"
          @afterEnter="afterEnter"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </section>
</template>


<script>
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

import { _ } from "./utils/functions";
import "./assets/styles.css";

/* eslint-disable */
import "bootstrap/js/dist/carousel";
import "bootstrap/js/dist/collapse";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavbarVue from "./components/Navbar.vue";
import SideBarVue from "./components/SideBar.vue";

export default {
  components: { NavbarVue, SideBarVue },
  data() {
    return {
      prevHeight: 0,
      randomTransitionName: null,
      transitions: ["zoom", "slide-right", "fade", "slide-left", "bounce"],
    };
  },
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
    transitionName() {
      if (this.randomTransitionName) return this.randomTransitionName;
      return "fade";
    },
  },
  methods: {
    afterEnter(element) {
      element.style.height = "auto";
      this.randomTransitionName = this.transitions.random();
    },
    setHeight() {
      try {
        this.$store.dispatch(
          "navbarHeight",
          window.innerHeight - document.getElementById("nav-cont").clientHeight
        );
      } catch {}
    },
  },
};

// beforeLeave(element) {
//       this.prevHeight = getComputedStyle(element).height;
//     },
//     enter(element) {
//       const { height } = getComputedStyle(element);

//       element.style.height = this.prevHeight;

//       setTimeout(() => {
//         element.style.height = height;
//       });
//     },
//     afterEnter(element) {
//       element.style.height = "auto";
//       this.randomTransitionName = this.transitions.random();
//     }
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
/* TRANSITIONS */
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}

.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}

.slither-enter-active,
.slither-leave-active {
  transition: transform 0.5s;
}

.slither-enter,
.slither-leave-to {
  transform: translateX(-100%);
}

.slither-enter-to,
.slither-leave {
  transform: translateX(0);
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>