<template>
  <div class="container-fluid">
    <NavbarSchedule></NavbarSchedule>
    <router-view></router-view>
  </div>
</template>
<script>
import NavbarSchedule from "./NavbarSchedule";
export default {
  components: {
    NavbarSchedule,
  },
};
</script>
<style lang="sass" scoped></style>
