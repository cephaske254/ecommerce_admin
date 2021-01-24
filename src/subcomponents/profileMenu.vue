<template>
  <div v-if="showProfileMenu" class="menu card shadow-sm">
    <ul class="p-0 nav-items m-0">
      <li class="nav-item">
        <a @click="logout" v-if="isLoggedIn" href="#" class="nav-link"
          >LOGOUT</a
        >
        <router-link v-else :to="{ name: 'Login' }" class="nav-link"
          >LOGIN</router-link
        >
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">SETTINGS</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["showProfileMenu", "isLoggedIn"],
  emits: ["closeProfileMenu"],
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    handleClick() {
      if (this.showProfileMenu) return;
      this.$emit("closeProfileMenu");
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClick);
  },
};
</script>

<style scoped>
.menu {
  position: absolute;
  top: 0;
  right: 0;
  margin: 3rem 0 0 0;
  background: rgba(30, 30, 43, 0.97);
}
.menu {
  min-width: 150px;
}
</style>