<template>
  <div class="container-fluid bg-b">
    <div class="row">
      <div class="container">
        <div class="row mt-5 mb-5">
          <h1 class="">services</h1>
          <hr />
          <div class="col-sm-12 col-md-4 col-lg-4 text-center">
            <div class="services flex2">
              <div class="service">
                <font-awesome-icon icon="procedures" class="icon-service" />
                <p>services</p>
              </div>
              <div class="service">
                <font-awesome-icon icon="calendar-check" class="icon-service" />
                <p>make an appointment</p>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-4 text-center">
            <div class="services flex2">
              <div class="service">
                <font-awesome-icon icon="stethoscope" class="icon-service" />
                <p>manage medical record</p>
              </div>
              <div class="service">
                <font-awesome-icon icon="heartbeat" class="icon-service" />
                <p>Periodic health examination</p>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-4 text-center">
            <div class="services flex2">
              <div class="service">
                <font-awesome-icon icon="user-md" class="icon-service" />
                <p>doctor</p>
              </div>
              <div class="service">
                <font-awesome-icon icon="users" class="icon-service" />
                <p>support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.bg-b {
  background-color: var(--bg-color-blue-b);
}
.services {
  $height-server: 220px;
  max-height: $height-server;
  width: 100%;
  .service {
    max-height: $height-server/2;
    margin-top: 20px;
    transition: 0.5s;
    .icon-service {
      font-size: var(--font-text-big);
      color: var(--bg-color-main);
    }
    p {
      text-transform: uppercase;
      color: var(--bg-color-main);
      font-weight: bold;
      font-size: var(--font-text-content-m);
    }
    &:hover {
      color: var(--color-black-m);
      transform: scale(1.1);
      cursor: pointer;
    }
  }
}
@media (max-width: 768px) {
  .flex2 {
    display: flex;
    .service {
      width: 50%;
      padding: 16px;
    }
  }
}
</style>
