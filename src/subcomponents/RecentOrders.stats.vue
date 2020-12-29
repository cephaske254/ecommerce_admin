<template>
  <div class="col-sm-12 col-md-7 p-3">
    <div class="card bg-lighter text-light">
      <div class="card-header">
        <div class="d-flex">
          <h5 class="card-title w-100">RECENT ORDERS</h5>
          <button
            class="btn btn-sm btn-info text-white refresh"
            @click="refreshData"
          >
            <i
              class="bi bi-arrow-counterclockwise"
              :class="[loading ? 'spin' : '']"
            ></i>
          </button>
        </div>
      </div>
      <div class="card-body table-card">
        <table class="table table-sm table-bordered border-dark">
          <thead class="bg-dark">
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.order_id">
              <th scope="col">
                {{ item.order_id }}
              </th>
              <td>{{ item.first_name }}</td>
              <td>{{ item.last_name }}</td>
              <td>{{ item.status }}</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-sm text-info">
                    <i class="bi bi-arrow-counterclockwise"></i>
                  </button>
                  <button class="btn btn-sm text-info">
                    <i class="bi bi-eye-fill"></i>
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
function getRandom() {
  return "OR" + Math.random().toString(36).substring(7).toUpperCase();
}

export default {
  data: function () {
    return {
      loading: false,
      items: [
        {
          order_id: getRandom(),
          first_name: "Cephas",
          last_name: "Too",
          status: "B",
        },
        {
          order_id: getRandom(),
          first_name: "Ken",
          last_name: "Too",
          status: "A",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
        {
          order_id: getRandom(),
          first_name: "Bruno",
          last_name: "Too",
          status: "G",
        },
      ],
    };
  },
  methods: {
    refresh: function () {
      this.loading = !this.loading;
    },
    refreshSingle: function () {
      this.loading = !this.loading;
    },
    delete: function (e) {console.log(e)},
  },
  computed: {},
};
</script>

<style scoped>
/* table {
} */
.table-card {
  overflow: scroll;
  max-height: 380px;
}
</style>