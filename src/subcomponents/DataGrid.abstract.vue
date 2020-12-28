<template>
  <div class="container-fluid py-2">
    <div class="card bg-lighter">
      <div v-if="config.header" class="card-header align-items-center">
        <small class="card-subtitle">{{ config.title }} Table</small>
        <div class="d-flex align-items-center">
          <h5 class="card-title my-0 col">
            {{ config.title.toUpperCase() }}
          </h5>
          <div class="btn-group">
            <button
              v-if="config.actions.refresh"
              class="btn btn-info"
              @click="config.actions.refresh()"
            >
              <i
                class="bi bi-arrow-counterclockwise text-white"
                :class="[loading ? 'spin' : '']"
              ></i>
            </button>
          </div>
        </div>
        <div
          v-if="Object.keys(config.checkActions).length > 0"
          class="justify-content-center d-flex"
        >
          <form
            class="d-flex w-100"
            @submit="runChecked"
            style="max-width: 250px"
          >
            <select
              class="form-control text-left form-control-sm bg-lighter border-info"
              name="selectedFunc"
              :disabled="!checked.length"
              id="selectedFunc"
            >
              <option disabled selected>select an option...</option>
              <option
                v-for="name in config.checkActions"
                :key="name"
                :value="name"
              >
                {{ name }}
              </option>
            </select>
            <button
              class="btn mx-1 btn-info btn-sm"
              :disabled="!checked.length"
            >
              GO
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="item in items"
        :key="item[unique]"
        class="col-sm-10 col-md-4 col-lg-3 py-2"
      >
        <div class="card bg-lighter">
          <div class="card-header">
            <h5 class="card-title">{{ item }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { trimText } from "@/utils/functions";

export default {
  props: ["cfg", "items", "fields", "unique", "loading"],
  data: function () {
    return {
      checked: [],
      config: {
        noview: false,
        header: true,
        actions: {},
        checkActions: {
          asd: "asd",
        },
        max: 80,
        title: null,
        refresh: false,
        ...this.cfg,
      },
    };
  },
  methods: {
    trimText,
    edit: function (id) {
      if (this.config.actions.edit) {
        this.config.actions.edit(id);
        return;
      }
      const current = this.$router.currentRoute.value.path;
      this.$router.push({ path: `${current}/${id}/edit` });
    },
    view: function (id) {
      if (this.config.actions.view) {
        this.config.actions.view(id);
        return;
      }
      const current = this.$router.currentRoute.value.path;
      this.$router.push({ path: `${current}/${id}` });
    },
    select: function (id) {
      if (this.checked.includes(id)) {
        this.checked = this.checked.filter(
          (item) => item !== id && item !== "__all__"
        );
        return;
      }
      if (id === "__all__") {
        this.checked = ["__all__"];
        return;
      }
      this.checked.push(id);
    },
    runChecked: function (e) {
      e.preventDefault();
      try {
        const option =
          e.target.children["selectedFunc"].selectedOptions[0].value;
        const func = this.config.checkActions[option];
        func(this.checked);
      } catch {}
    },
  },
};
</script>

<style>
.card-title,
table {
  color: hsla(0, 0%, 100%, 0.8) !important;
}
.actions .btn {
  font-size: 1rem;
}
#selectedFunc {
  cursor: unset;
}
@media only screen and (max-width: 768px) {
  table {
    width: 100% !important;
  }
}
</style>