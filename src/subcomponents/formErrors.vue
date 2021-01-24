<template>
  <div
    class="errors"
    v-if="
      (errors && errors[name] && touched.includes(name)) ||
      (touched.length && name == 'images')
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
  color: rgba(237, 34, 61, 0.809);
  margin-left: 0.2rem;
  font-size: .7rem;
}
</style>