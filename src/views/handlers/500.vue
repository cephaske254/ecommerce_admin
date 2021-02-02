<template>
  <error-abstract :code="500" />
</template>

<script>
import ErrorAbstract from "../../subcomponents/handlers/Error.abstract.vue";
export default {
  components: { ErrorAbstract },
};
</script>