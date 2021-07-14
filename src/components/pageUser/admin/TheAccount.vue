<template>
  <div class="container-fluid">
    <NavBarAccountAdmin></NavBarAccountAdmin>
    <router-view></router-view>
  </div>
</template>
<script>
import NavBarAccountAdmin from "../../NavBarAccountAdmin";
export default {
  components: {
    NavBarAccountAdmin,
  },
};
</script>
<style lang="sass" scoped></style>
