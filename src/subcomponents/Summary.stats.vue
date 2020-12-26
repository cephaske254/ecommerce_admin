<template>
  <div class="row stats pt-3">
    <div class="col-lg-3 col-md-6">
      <div class="card card-stats bg-lighter">
        <div class="card-body">
          <div class="row">
            <div class="col-5">
              <div class="info-icon text-center icon-warning">
                <i class="bi bi-bell"></i>
              </div>
            </div>
            <div class="col-7 card-info">
              <p class="card-subtitle">Unread Notifications</p>
              <h3 class="card-title">0</h3>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="stats">Update Now</div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6">
      <div class="card card-stats bg-lighter">
        <div class="card-body">
          <div class="row">
            <div class="col-5">
              <div class="info-icon text-center icon-warning">
                <i class="bi bi-basket2"></i>
              </div>
            </div>
            <div class="col-7 card-info">
              <p class="card-subtitle">Stock Items</p>
              <h3 class="card-title">15,121</h3>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="stats">In stock</div>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-md-6">
      <div class="card card-stats bg-lighter">
        <div class="card-body">
          <div class="row">
            <div class="col-5">
              <div class="info-icon text-center">
                <i class="bi bi-cart-check"></i>
              </div>
            </div>
            <div class="col-7 card-info">
              <p class="card-subtitle">Orders Today</p>
              <h3 class="card-title">121</h3>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="stats">Orders processed on this date</div>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-md-6">
      <div class="card card-stats bg-lighter">
        <div class="card-body">
          <div class="row">
            <div class="col-5">
              <div class="info-icon text-center">
                <i class="bi bi-chat"></i>
              </div>
            </div>
            <div class="col-7 card-info">
              <p class="card-subtitle">Customers feedback</p>
              <h3 class="card-title">2,345</h3>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="stats">Total Feedbacks</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.card {
  height: 100%;
}
.info-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  font-size: 3em;
  border-radius: 50%;
  color: white;
  background-size: 210% 210%;
}
.row.stats .col-lg-3.col-md-6 {
  padding: 1em;
}
.row.stats div:nth-child(1) .info-icon {
  background: #00f2c3;
  background-image: linear-gradient(to bottom left, #00f2c3, #0098f0, #00f2c2);
}
.row.stats div:nth-child(2) .info-icon {
  background: #fd5d93;
  background-image: linear-gradient(to bottom left, #fd5d93, #ec250d, #fd5d93);
}
.row.stats div:nth-child(3) .info-icon {
  background: #e14eca;
  background-image: linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca);
}

.row.stats div:nth-child(4) .info-icon {
  background: #ff8d72;
  background-image: linear-gradient(to bottom left, #ff8d72, #ff6491, #ff8d72);
}

.card-info {
  text-align: end;
}
.card-title {
  color: white;
}
</style>