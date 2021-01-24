<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6 col-sm-6 col-md-2 col-lg-2 p-1">
        <div class="card border-0 h-100 bg-dark">
          <div class="card-body">
            <h4 class="card-title">92500</h4>
            <p class="card-subtitle">Total Orders</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-sm-6 col-md-2 col-lg-2 p-1">
        <div class="card border-0 h-100 bg-dark">
          <div class="card-body">
            <h4 class="card-title">16089</h4>
            <p class="card-subtitle">Orders Delivered</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-sm-6 col-md-2 col-lg-2 p-1">
        <div class="card border-0 h-100 bg-dark">
          <div class="card-body">
            <h4 class="card-title">9145</h4>
            <p class="card-subtitle">Pending Orders</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-sm-6 col-md-2 col-lg-2 p-1">
        <div class="card border-0 h-100 bg-dark">
          <div class="card-body">
            <h4 class="card-title">467</h4>
            <p class="card-subtitle">Orders Hold</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-sm-6 col-md-2 col-lg-2 p-1">
        <div class="card border-0 h-100 bg-dark">
          <div class="card-body">
            <h4 class="card-title">500</h4>
            <p class="card-subtitle">Orders Hold</p>
          </div>
        </div>
      </div>
      <div
        class="col-6 col-sm-6 col-md-2 col-lg-2 p-1 d-flex align-items-center"
      >
        <div class="card-body">
          <button
            class="btn btn-gradient rounded-md d-flex align-items-center px-4 py-2"
          >
            ADD NEW <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="py-3">
      <table
        class="table table-striped table-borderlesss table-hover border-lighter table-dark"
      >
        <thead class="border-bottom border-dark">
          <tr>
            <th scope="row">ID</th>
            <th>Order ID</th>
            <th>Order ID</th>
            <th>Order ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col">
              <a href="#" class="card-link">ORDHA7AB</a>
            </th>
            <td scope="col"></td>
            <td scope="col"></td>
            <td scope="col"></td>
          </tr>
          <tr>
            <th scope="col">
              <a href="#" class="card-link">ORDHA7AB</a>
            </th>
            <td scope="col"></td>
            <td scope="col"></td>
            <td scope="col"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card-link {
  text-decoration: none;
}
</style>