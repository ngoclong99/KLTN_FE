<template>
  <div class="row">
    <div class="col-12">
      <div class="examination">
        <router-link :to="{ name: 'ShowService' }">
          Payment
        </router-link>
        <div class="dropdown">
          <router-link :to="{ name: 'Pay' }">
            Bill
          </router-link>
          <div class="dropdown-content">
            <router-link class="d-block" :to="{ name: 'Pay' }">
              Pay
            </router-link>
            <router-link class="d-block" :to="{ name: 'UnPay' }">
              UnPay
            </router-link>
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

<style scoped lang="scss">
$height: 40px;
.router-link-active,
.router-link-exact-active {
  background-color: var(--bg-color-main-hover-bold);
}
.examination {
  background-color: var(--bg-color-main);
  display: flex;
  max-width: 157px;
  a {
    display: inline-block;
    height: $height;
    line-height: $height;
    text-transform: capitalize;
    padding: 0 18px;
    &:hover {
      background-color: var(--bg-color-main-hover-bold);
    }
  }
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  min-width: 150px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 99;
  background-color: var(--bg-color-main);
}
.dropdown:hover .dropdown-content {
  display: block;
  cursor: pointer;
}

@media screen and (max-width: 393px) {
  .examination {
    flex-direction: column;
  }
}
a {
  color: var(--color-white) !important;
}
a:hover {
  text-decoration: none !important;
}
</style>
