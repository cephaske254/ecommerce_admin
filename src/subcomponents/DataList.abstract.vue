<template>
  <!-- config.checkActions.constructor === Object -->
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
      <div class="card-body overflow-scroll hide-scroll">
        <table class="table table-sm table-bordered border-dark">
          <thead class="bg-dark">
            <tr>
              <th>
                <input
                  @click="select('__all__')"
                  type="checkbox"
                  class="bg-dark"
                  name=""
                  :checked="checked.includes('__all__')"
                />
              </th>
              <th
                class="text-capitalize"
                v-for="field in fields"
                :key="field"
                scope="col"
              >
                {{ field }}
              </th>
              <th v-if="config.actions && unique && fields.includes(unique)">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.order_id">
              <td>
                <div class="d-block my-auto">
                  <input
                    :checked="
                      checked.includes(item[unique]) ||
                      checked.includes('__all__')
                    "
                    @click="select(item[unique])"
                    type="checkbox"
                    name="selected"
                  />
                </div>
              </td>
              <td v-for="field in fields" :key="field">
                {{ trimText(item[field], config.max) }}
              </td>
              <td v-if="config.actions && unique && fields.includes(unique)">
                <div class="btn-group actions">
                  <button
                    v-if="config.actions.refreshSingle"
                    @click="config.actions.refreshSingle(item[unique])"
                    class="btn btn-sm text-info"
                    :id="item[unique]"
                  >
                    <i class="bi bi-arrow-counterclockwise"></i>
                  </button>
                  <button
                    v-if="view && !config.noview"
                    class="btn btn-sm text-info"
                    @click="view(item[unique])"
                  >
                    <i class="bi bi-eye-fill"></i>
                  </button>
                  <button
                    class="btn btn-sm text-light"
                    v-if="edit && !config.readonly"
                    @click="edit(item[unique])"
                  >
                    <i class="bi bi-pen"></i>
                  </button>
                  <button class="btn btn-sm text-danger">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
      this.checked = [...this.checked.filter(item), id];
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
  mounted: function () {
    // console.log(JSON.stringify(this.checked));
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