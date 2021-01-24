<template>
  <div v-if="showProfileMenu" class="menu card shadow-sm">
    <ul class="p-0 nav-items m-0">
      <li class="nav-item">
        <a href="#" class="nav-link">LOGIN</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">SETTINGS</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["showProfileMenu", "loggedIn"],
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