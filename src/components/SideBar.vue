<template>
  <div id="menu-user" class="container-fluid">
    <div class="row wrap-user">
      <!--  @item-click="onItemClick" -->
      <sidebar-menu
        class="sidebar"
        :menu="this.selectRole"
        :collapsed="collapsed"
        @collapse="onCollapse"
        width="250px"
      >
      </sidebar-menu>
    </div>
  </div>
</template>

<script>
import SIDEBAR from "../constants/sidebar";
import { mapState } from "vuex";
export default {
  data() {
    return {
      statusSidebar: true,   
      collapsed: true,
      role: localStorage.getItem("role"),
    };
  },
  // auth/role
  computed: {
    ...mapState("account", ["status", "username"]),
    selectRole() {
      switch (this.role) {
        case "ROLE_PATIENT":
          return SIDEBAR.menuPatient;
        case "ROLE_DOCTOR":
          return SIDEBAR.menuDoctor;
        case "ROLE_ADMIN":
          return SIDEBAR.menuAdmin;
        case "ROLE_STAFF":
          return SIDEBAR.menuStaff;
      }
    },
  },
  methods: {
    onCollapse(c) {
      console.log("onCollapse");
      this.collapsed = c;
    },
    onMenu() {
      this.statusSidebar = !this.statusSidebar;
    },
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="scss" scoped></style>
