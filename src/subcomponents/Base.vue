<template>
  <navbar-vue />
  <section class="d-flex">
    <side-bar-vue />
    <router-view v-slot="{ Component }">
      <div
        class="main-panel hide-scroll overflow-y-scroll"
        :style="`height:${$store.getters.getNavbarHeight}px !important`"
      >
        <transition :name="transitionName" @enter="afterEnter" mode="out-in">
          <component :is="Component" />
        </transition>
      </div>
    </router-view>
  </section>
</template>


<script>
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

/* eslint-disable */
import "bootstrap/js/dist/carousel";
import "bootstrap/js/dist/collapse";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavbarVue from "../components/Navbar.vue";
import SideBarVue from "../components/SideBar.vue";

export default {
  components: { NavbarVue, SideBarVue },
  data() {
    return {
      prevHeight: 0,
      randomTransitionName: "zoom",
      transitions: ["zoom", "bounce", "slither"],
    };
  },

  computed: {
    transitionName() {
      if (this.randomTransitionName) return this.randomTransitionName;
      return "zoom";
    },
  },
  methods: {
    afterEnter(element) {
      element.style.height = "auto";
      const available = this.transitions.filter(
        (i) => i !== this.randomTransitionName
      );
      this.randomTransitionName = available.random();
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