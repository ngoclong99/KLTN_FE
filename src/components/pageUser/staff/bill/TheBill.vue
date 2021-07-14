<template>
  <div class="container-fluid">
    <NavBarBill></NavBarBill>
    <router-view></router-view>
  </div>
</template>
<script>
import NavBarBill from "./NavBarBill";
export default {
  components: {
    NavBarBill,
  },
};
</script>
<style lang="sass" scoped></style>
