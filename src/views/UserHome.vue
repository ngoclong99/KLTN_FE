<template>
  <div>
    <SideBar></SideBar>
    <div class="container-fluid left-50">
      <NavBar></NavBar>
    </div>
    <router-view :key="$route.path" class="left-50 mt-50"></router-view>
  </div>
</template>
<script>
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
export default {
  components: {
    SideBar,
    NavBar,
  },
};
</script>

<style scoped>
.left-50 {
  margin-left: 50px;
  width: calc(100% - 50px);
}
.mt-50 {
}

</style>
