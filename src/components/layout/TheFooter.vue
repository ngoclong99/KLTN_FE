<template>
  <div class="container-fluid">
    <div class="row">
      <div class="theFooter">
        <h1 class="pt-3 text-white">where to find us</h1>
        <div class="container">
          <div class="row text-white">
            <div class="col-sm-12 col-md-6 col-lg-6 text-left mt-5">
              <p>
                <font-awesome-icon icon="envelope" class="iconFooter" />
                <span>Email: phongkhamdtu@gmail.com</span>
              </p>
              <p>
                <font-awesome-icon icon="phone-volume" class="iconFooter" />
                <span>Hotline: 02363 848 418 - 0935 115 0905</span>
              </p>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6 text-left mt-5">
              <p>
                <font-awesome-icon icon="map-marker-alt" class="iconFooter" />
                <span>Địa chỉ: 03 Quang Trung, Q. Hải Châu, Đà Nẵng</span>
              </p>
              <p>
                <font-awesome-icon icon="link" class="iconFooter" />
                <span>Kết nối với chúng tôi:</span>
                <font-awesome-icon :icon="['fab', 'facebook-square']" class="iconFooter"/>

              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style  lang='scss' scoped>
h1 {
  width: 100%;
  font-weight: bold;
}
.theFooter {
  width: 100%;
  background-image: url("../../assets/footer.jpg");
  font-weight: bold;
  font-size: var(--font-text-content-m);
}
.iconFooter {
  font-size: var(--font-text-title);
  margin-right: 10px;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
  }
  &:visited {
    color: var(--bg-color-main-hover);
  }
}
</style>
