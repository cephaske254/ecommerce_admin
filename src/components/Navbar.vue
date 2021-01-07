<template>
  <div class="sticky-top bg-dark w-100 container-fluid">
    <nav
      class="navbar d-flex navbar-expand-lg navbar main-panel topNav navbar-dark"
    >
      <div class="nav-panel">
        <button class="btn nav-toggle navbar-toggler btn-sm" @click="toggleNav">
          <i class="bi bi-list"></i>
        </button>
      </div>
      <div class="d-flex flex-fill align-items-center">
        <div class="navbar-brand mt-1" id="current-page">
          {{ currentRoute.toUpperCase() }}
        </div>
      </div>
      <div style="margin-right: 3rem">
        <button
          class="btn btn-sm btn-white text-white navbar-toggler"
          data-bs-target="#navbarCollapse"
          data-bs-toggle="collapse"
        >
          <i class="bi bi-three-dots-vertical"></i>
        </button>
      </div>
      <div class="px-2 position-absolute" style="right: 0">
        <img
          style="width: 2rem; height: 2rem"
          class="rounded-circle"
          src="../assets/images/user.jpg"
        />
      </div>
      <div
        class="navbar-collapse collapse"
        id="navbarCollapse"
        style="margin-right: 3rem"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <button class="btn px-1">
              <i class="bi bi-search searchIcon"></i>
            </button>
          </li>
          <li class="nav-item">
            <button class="btn px-1">
              <i class="bi bi-bell searchIcon"></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    toggleNav: function () {
      const html = document.getElementsByTagName("html");
      html[0].classList.toggle("nav-open");
    },
  },
  computed: {
    currentRoute() {
      const current = this.$router.currentRoute.value.name;
      return current || "Dashboard";
    },
  },
  watch: {},
};
</script>

<style scoped>
.searchIcon {
  font-weight: bold;
  font-size: 1rem;
  color: var(--bs-white);
}
@media (min-width: 992px) {
  .topNav {
    min-height: 7.5vh;
  }
}
.navbar-collapse {
  justify-content: end;
}
.navbar-toggler {
  box-shadow: none !important;
  color: white !important;
  font-size: 1.4rem !important;
  font-weight: 500 !important;
  border: none !important;
}

.fullscreen .sticky-top,
.fullscreen .navbar {
  transition: 1s;
  display: none !important;
}
</style>