<template>
  <div
    class="errors"
    v-if="
      (errors && errors[name] && touched.includes(name)) ||
      (name === 'images' && touched.length)
    "
  >
    <p v-for="error in errors[name]" :key="error" class="my-0">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: ["errors", "touched", "name"],
};
</script>

<style  scoped>
.errors {
  color: rgba(255, 0, 34, 0.885);
  margin-left: 0.8rem;
}
</style>