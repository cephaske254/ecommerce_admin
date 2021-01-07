<template>
  <section>
    <div class="sidebar hide-scroll" id="sidebar">
      <div class="wrapper hide-scroll">
        <ul class="p-0 m-0 navItems h-100 px-1">
          <router-link
            @focus="click"
            class="text-white nav-link nav-item"
            to="/"
          >
            <div class="top">
              <i class="bi icon bi-pie-chart-fill"></i>
              <div class="text">DASHBOARD</div>
            </div>
          </router-link>

          <hr class="my-1" />
          <router-link
            @focus="click"
            class="text-white nav-link nav-item"
            to="/orders"
          >
            <div class="top">
              <i class="bi icon bi-cart"></i>
              <div class="text">ORDERS</div>
            </div>
          </router-link>

          <router-link
            @focus="click"
            class="text-white nav-link nav-item"
            to="/invoices"
          >
            <div class="top">
              <i class="bi icon bi-receipt"></i>
              <div class="text">INVOICES</div>
            </div>
          </router-link>

          <li class="nav-item">
            <div
              class="top"
              data-bs-target="#links-inventory"
              data-bs-toggle="collapse"
            >
              <i class="bi icon bi-journal"></i>
              <div class="text">INVENTORY</div>
              <i class="bi bi-caret-down-fill caret"></i>
            </div>
            <div class="links collapse" id="links-inventory">
              <router-link
                @focus="click"
                class="text-white nav-link"
                to="/categories"
                >CATEGORIES</router-link
              >
              <router-link @focus="click" to="/products" class="nav-link"
                >PRODUCTS</router-link
              >
              <!-- <a href="#" class="nav-link">MANUFACTURERS</a> -->
            </div>
          </li>

          <li class="nav-item">
            <div
              class="top"
              data-bs-target="#links-deals"
              data-bs-toggle="collapse"
            >
              <i class="bi icon bi-award"></i>
              <div class="text">DEALS & PROMOS</div>
              <i class="bi bi-caret-down-fill caret"></i>
            </div>
            <div class="links collapse" id="links-deals">
              <router-link @focus="click" to="/deals" class="nav-link"
                >DEALS</router-link
              >
              <router-link
                @focus="click"
                class="text-white nav-link"
                to="/promos"
                >PROMOS</router-link
              >
            </div>
          </li>
          <hr class="my-1" />
          <router-link
            @focus="click"
            class="text-white nav-link nav-item"
            to="/tasks"
          >
            <div class="top">
              <i class="bi icon bi-stopwatch"></i>
              <div class="text">TASKS</div>
            </div>
          </router-link>
          <router-link
            @focus="click"
            class="text-white nav-link nav-item"
            to="/settings"
          >
            <div class="top">
              <i class="bi icon bi-gear"></i>
              <div class="text">SETTINGS</div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  methods: {
    click: function () {
      setTimeout(() => {
        document.getElementsByTagName("html")[0].classList.remove("nav-open");
      }, 200);
    },
  },
  computed: {},
};
</script>
<style >
:root {
  --transition1: ease-in-out 0.4s cubic-bezier(0.685, 0.0473, 0.346, 1);
  --transition2: 0.3s cubic-bezier(0.685, 0.0473, 0.346, 1);
  --bs-gradient-info: #8c0eb3;
  --nav-item-hover: #8c0eb363;
}
.sidebar {
  box-shadow: 0 2px 22px 0 rgba(0, 0, 0, 0.4), 0 2px 30px 0 rgba(0, 0, 0, 0.35) !important;
  color: white;
  background: var(--bs-primary);
  background: linear-gradient(180deg, var(--bs-primary), var(--bs-secondary));
  display: block;
  position: fixed;
  z-index: 10001 !important;
  top: 0;
  height: 100vh;
  width: 260px;
  background-size: cover;
  background-position: 50%;
  background-attachment: fixed;
  overflow: scroll !important;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}
.nav-open .main-panel {
  transform: translate3d(260px, 0, 0);
}
.nav-open .sidebar {
  transition: var(--transition2);
  transform: translateZ(0);
}
.nav-open .sidebar:before {
  content: unset;
}

@media screen and (min-width: 1200px) {
  .sidebar {
    height: 90vh !important;
    min-width: 200px;
    max-width: 260px;
    width: min-content !important;
    height: max-content;
    top: calc(7.5vh + 1rem) !important;
    position: sticky !important;
    left: 0;
    height: max-content;
  }
  .sidebar:before {
    content: unset;
  }
  .main-panel {
    width: auto !important;
    transform: translate3d(0, 0, 0) !important;
  }
  .sidebar,
  .wrapper {
    transition: var(--transition1);
    border-radius: 0 1rem 1rem 0;
    transform: translateX(0) !important;
  }
  .nav-panel {
    display: none;
  }
  .wrapper {
    transition: var(--transition1);
  }
}

@media (min-width: 992px) and (max-width: 1200px) {
  .sidebar {
    top: 0;
    width: 260px !important;
    right: auto;
    left: 0;
    margin: 0;
    border-radius: 0;
    visibility: visible;
    overflow-y: visible;
    padding: 0;
    transition: var(--transition2);
    transform: translate3d(-260px, 0, 0);
  }
  .sidebar .wrapper {
    transition: var(--transition1);
    height: 100vh;
  }
  .main-panel {
    transition: var(--transition2);
  }
  .wrapper {
    transition: var(--transition1);
  }
  .sidebar .sidebar-wrapper {
    height: 100vh;
  }
  .main-panel {
    transition: var(--transition2);
  }
  .nav-open .main-panel {
    right: 0;
    transform: translate3d(260px, 0, 0);
  }

  .nav-open .sidebar:before {
    content: unset;
  }
  .nav-toggle {
    display: flex !important;
  }
}
@media (max-width: 992px) {
  .sidebar {
    visibility: visible;
    overflow-y: visible;
    transition: var(--transition2);
    transform: translate3d(-260px, 0, 0);
  }
  .sidebar .wrapper {
    height: 100vh;
    transition: var(--transition1);
  }
  .nav-open .main-panel {
    right: 0;
    transform: translate3d(260px, 0, 0) !important;
  }

  .nav-open .sidebar:before {
    content: unset;
  }
}
.icon {
  font-size: 2rem;
  vertical-align: text-bottom;
  align-items: center;
  display: flex;
  justify-content: center;
  font-family: initial !important;
  padding: 0.2rem;
  width: 40px;
  height: 40px;
}
.links a.nav-link {
  margin-left: 2rem;
  color: inherit !important;
}
.top {
  display: flex;
  align-items: center;
}
.text {
  padding: 0.2rem;
}
.navItems {
  font-size: 0.73412rem;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 1.625rem;
}
.nav-item {
  display: block;
  cursor: pointer;
}
.nav-item .text {
  width: 100%;
}
.navItems li,
.navItems a.nav-item {
  padding: 0.5rem 0;
  align-items: center;
  border-radius: 1.8rem;
  color: inherit;
  transition: 0.5s;
  padding: 0.5rem 1rem;
}
.navItems li:hover,
.navItems li:focus,
.navItems a.nav-item:hover,
.navItems a.nav-item:focus {
  background: var(--nav-item-hover);
}
.navItems li.nav-item a {
  border-radius: 1.8rem;
  margin-bottom: 0.1rem;
}
.navItems li.nav-item a:hover,
.navItems a.router-link-exact-active,
.navItems a.router-link-active {
  background: rgba(0, 0, 0, 0.144) !important;
}
.caret {
  float: right !important;
}
.fullscreen .sidebar {
  transition: var(--transition2) !important;
  transform: translate3d(-260px, 0, 0) !important;
  display: none;
}
</style>