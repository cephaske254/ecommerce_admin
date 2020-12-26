<template>
  <div class="container-fluid py-2">
    <div class="card bg-lighter">
      <div v-if="!noheader" class="card-header align-items-center">
        <small>{{ title }} Table</small>
        <div class="d-flex">
          <h5 class="text-light card-title my-0 w-100">
            {{ title.toUpperCase() }}
          </h5>
          <div class="btn-group">
            <button class="btn btn-info" @click="$emit('refresh')">
              <i
                class="bi bi-arrow-counterclockwise text-white"
                :class="[loading ? 'spin' : '']"
              ></i>
            </button>
          </div>
        </div>
      </div>
      <div class="card-body overflow-scroll">
        <table class="table table-sm table-bordered border-dark">
          <thead class="bg-dark sticky-top">
            <tr>
              <th
                class="text-capitalize"
                v-for="field in fields"
                :key="field"
                scope="col"
              >
                {{ field }}
              </th>
              <th v-if="actions">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.order_id">
              <td v-for="field in fields" :key="field">
                {{ trimText(item[field], max) }}
              </td>
              <td v-if="actions">
                <div class="btn-group">
                  <button
                    class="btn btn-sm text-info"
                    @click="$emit('refreshItem', item[unique])"
                  >
                    <i class="bi bi-arrow-counterclockwise"></i>
                  </button>
                  <button
                    class="btn btn-sm text-info"
                    @click="$emit('view', item[unique])"
                  >
                    <i class="bi bi-eye-fill"></i>
                  </button>
                  <button
                    class="btn btn-sm text-light"
                    @click="$emit('edit', item[unique])"
                  >
                    <i class="bi bi-pen"></i>
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
  props: [
    "fields",
    "title",
    "unique",
    "items",
    "actions",
    "loading",
    "noheader",
    "max",
  ],
  methods: {
    trimText,
  },
};
</script>

<style>
</style>