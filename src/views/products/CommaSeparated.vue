<template>
  <div class="w-100">
    <div class="btn-group w-100">
      <input
        @keyup="getSuggestions"
        type="text"
        ref="input"
        v-model="string"
        class="btn text-start input form-control bg-dark border-lighter"
        placeholder="Use comma to add multiple "
      />
      <button
        @click="$emit('change', processed)"
        type="button"
        class="btn btn-lighter"
      >
        ADD
      </button>
    </div>
    <div v-if="suggestions.length" class="card py-0 mt-1 border-0 mb-0">
      <ul
        class="list-style-none position-absolute d-block bg-lighter w-100 shadow"
      >
        <li
          @click="complete(suggestion.value)"
          v-for="suggestion in suggestions"
          :key="suggestion"
        >
          {{ suggestion.value }}
        </li>
      </ul>
    </div>
  </div>
</template>



<script>
import { commaValues } from "../../utils/functions";
import { getCategorySuggestions } from "../../api/products";
// import debounce from "lodash.debounce";

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      callback.apply(this, args);
    }, wait);
  };
}

export default {
  props: ["btnValue", "onChange"],
  data() {
    return {
      string: "",
      suggestions: [],
    };
  },
  computed: {
    processed() {
      return commaValues(this.string, "encode");
    },
  },
  methods: {
    debounce,
    complete(value) {
      const current = commaValues(this.string, "encode").slice(-1)[0];
      this.string = this.string.replace(current, value + ", ");
      this.suggestions = [];
      this.focus();
    },
    focus() {
      this.$refs.input.focus();
    },
    getSuggestions(e) {
      const value = commaValues(e.target.value, "encode");
      let q = value.slice(-1)[0];
      if (q === null || q === "" || !q || q === undefined) return;

      debounce(() => {
        getCategorySuggestions(value).then(
          (data) => (this.suggestions = data.data.data)
        );
      }, 200)(value);
    },
  },
};
</script>

<style scoped>
input {
  border-radius: 1px;
  color: hsla(0, 0%, 100%, 0.6) !important;
  padding: 0.8rem 1rem;
  font-size: 0.7rem;
}
ul {
  width: max-content;
  display: flex;
  z-index: 1;
}
li {
  font-size: 0.7rem;
}
</style>