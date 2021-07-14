<template>
  <div class="container-fluid">
    <NavbarDrugs></NavbarDrugs>
    <router-view></router-view>
  </div>
</template>
<script>
import NavbarDrugs from "./NavbarDrugs";
export default {
  components: {
    NavbarDrugs,
  },
};
</script>
<style lang="sass" scoped></style>
