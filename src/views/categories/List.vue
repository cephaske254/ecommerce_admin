<template>
  <loadingsm v-if="loading && !categories.length" :loading="loading" />
  <div v-else-if="!errored && categories" class="container-fluid">
    <div class="bg-lighter p-2 rounded text-light d-flex">
      <div class="d-flex w-100">
        <i class="bi-filter h4 m-0"></i>
      </div>
      <form class="w-100" @submit="search">
        <input
          type="search"
          class="form-control form-control-sm bg-dark border-0"
          v-model="searchQuery"
          placeholder="Search"
        />
      </form>
      <div class="w-100">
        <div class="btn-group float-end">
          <button
            title="refresh"
            class="btn btn-outline-primary"
            @click="getCategories('refresh')"
          >
            <i
              class="bi bi-arrow-counterclockwise"
              :class="[loading ? 'spin' : '']"
            ></i>
          </button>
          <router-link :to="{ name: 'Add Category' }" class="btn btn-primary">
            <i class="bi bi-plus"></i>
          </router-link>
        </div>
      </div>
    </div>
    <br />
    <table
      v-if="!errored && categories.length"
      class="table table-striped table-borderlesss table-hover border-lighter table-dark"
    >
      <thead class="border-info">
        <tr class="border-info">
          <th scope="row">ID</th>
          <th>Name</th>
          <th>Product Count</th>
          <th>Date Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="'Aj@I-' + category.id">
          <th scope="col">{{ category.id }}</th>
          <td scope="col">{{ category.name }}</td>
          <td scope="col">{{ category.product_count }}</td>
          <td scope="col">{{ category.created }}</td>
          <td scope="col">
            <div class="btn-group">
              <button title="View Products" class="btn btn-sm text-info">
                <i class="bi bi-eye"></i>
              </button>
              <router-link
                :to="{
                  name: 'Edit Category',
                  params: { slug: category.slug },
                }"
                title="Edit"
                class="btn btn-sm text-light"
              >
                <i class="bi bi-pen"></i>
              </router-link>
              <button title="Delete" class="btn btn-sm text-danger">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <h4
      class="text-center text-muted mt-5"
      v-if="!errored && !categories.length"
    >
      NO CATEGORIES TO SHOW
    </h4>
  </div>

  <error-abstract
    :onRetry="searchQuery ? search : getCategories"
    v-else-if="errored"
  />
  <router-view />
</template>

<script>
import * as types from "../../store/types";
import { apiGetCategories } from "../../api/categories";
import ErrorAbstract from "../../subcomponents/handlers/Error.abstract.vue";

export default {
  components: { ErrorAbstract },
  data() {
    return {
      loading: false,
      errored: false,
      searchQuery: null,
      searchData: {},
      category: {},
    };
  },
  computed: {
    categories() {
      if (this.$route.query["q"]) {
        return this.searchData.data;
      }
      return this.$store.getters["categories/getCategories"];
    },
  },
  created() {
    this.searchQuery = this.$route.query["q"] || null;
    if (this.$route.query["q"]) {
      this.search();
      // return;
    }
    if (!this.categories.length) this.getCategories();
  },
  methods: {
    getCategories(param) {
      this.loading = true;
      this.errored = false;

      this.$store
        .dispatch("categories/" + types.GET_CATEGORIES, param)
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    search(e) {
      if (e) e.preventDefault();
      if (!this.searchQuery) return;

      this.loading = true;
      this.errored = false;
      apiGetCategories("search", `/categories/?q=${this.searchQuery}`)
        .then((data) => {
          this.searchData = data.data;
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
      this.$router.push({ query: { q: this.searchQuery } });
    },
  },
  watch: {
    searchQuery(val1) {
      if (val1 === "" || val1 === null || !val1) {
        this.searchData = {};
        this.$router.replace({});
      }
    },
  },
};
</script>

<style>
</style>