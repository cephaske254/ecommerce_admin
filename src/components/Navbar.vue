<template>
  <div class="sticky-top">
    <nav class="container-fluid navbar topNav navbar-dark bg-dark">
      <button class="btn nav-toggle float-left" @click="toggleNav">
        <i class="navbar-toggler-icon"></i>
      </button>
      <a href="#" class="navbar-brand">ADMIN PANEL</a>
      <div class="controls">ss</div>
    </nav>

    <div class="sidebar" id="sidebar">
      <ul class="p-0 m-0 navItems bg-light h-100 px-1">
        <li class="d-flex">
          <div class="icon">
            <i class="bi bi-pie-chart-fill"></i>
          </div>
          <div class="text">Dashboard</div>
        </li>
        <li class="d-flex nav-item">
          <div class="icon">
            <i class="bi bi-app"></i>
          </div>
          <div class="text">Components</div>
        </li>
      </ul>
    </div>
  </div>

  <div class="body">data</div>
</template>

<script>
export default {
  name: "Navbar",
  components: {},
  methods: {
    toggleNav: function () {
      const nav = document.getElementById("sidebar");
      if (nav.classList.contains("show")) {
        nav.classList.remove("show");
        return;
      }
      nav.classList.add("show");
      return;
    },
  },
};
</script>

<style scoped>
.nav-toggle {
  box-shadow: none !important;
}
.nav-toggle:hover,
.nav-toggle.active {
  color: white !important;
}
.body {
  transition: ease-in-out 1s;
}
.topNav {
  height: 7.5vh;
  padding: 0 !important;
  margin: 0 !important;
}

.sidebar {
  transition: ease-in-out 2s;
  height: 92.5vh;
  float: left;
  padding-left: 0.2em;
}
.icon {
  font-size: 2.5rem;
}
.navItems li {
  border-bottom: 1px solid purple;
  align-items: center;
  cursor: pointer;
  opacity: 0.8;
  transition: ease-in 0.2s;
}
.navItems li:hover,
.sidebar.show li {
  opacity: 1;
}
.sidebar .text {
  margin-left: 0.6rem;
  width: 0;
  overflow: hidden;
  animation: close 0.2s;
}
.sidebar.show li .text {
  animation: open 0.5s;
  min-width: 200px;
}

@keyframes open {
  from {
    min-width: 0;
    opacity: 0;
  }
  to {
    min-width: 200px;
    opacity: 1;
  }
}

@keyframes close {
  to {
    min-width: 0;
    opacity: 0;
  }
  from {
    min-width: 200px;
    opacity: 1;
  }
}
</style>