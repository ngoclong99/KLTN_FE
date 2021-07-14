<template>
  <div class="container-fluid">
    <NavBarDoctor></NavBarDoctor>
    <router-view></router-view>
  </div>
</template>
<script>
import NavBarDoctor from "../../../NavBarDoctor";
export default {
  components: {
    NavBarDoctor,
  },
};
</script>
<style lang="sass" scoped></style>
