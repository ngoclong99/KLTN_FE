<template>
  <div class="row">
    <div class="col-12">
      <div class="dropdown" style="float:right;">
        <font-awesome-icon icon="user-circle" class="dropbtn" />
        <div class="dropdown-content">
          <!-- <router-link :to="{ name: 'userProfile' }">profile</router-link>
          <router-link :to="{ name: 'ScheduleMe' }">schedule</router-link>
          <router-link v-if="selectRole == 0" :to="{ name: 'RecordCase' }">record</router-link>
          <router-link v-if="selectRole == 1" :to="{ name: 'Examination' }">
            Examination
          </router-link> -->
          <a @click="logOut">logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: localStorage.getItem("role"),
    };
  },
  methods: {
    logOut: function() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      this.$router.push("/home");
    },
  },
  computed: {
    selectRole() {
      if (this.role === "ROLE_PATIENT") return 0;
      else {
        if (this.role === "ROLE_DOCTOR") return 1;
        else if (this.role === "ROLE_ADMIN") return 2;
      }
    },
  },
};
</script>

<style scoped>
.router-link-active,
.router-link-exact-active {
  background-color: rgba(153, 168, 209, 0.5);
}
.dropbtn {
  font-size: 32px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
  margin-top: 10px;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: var(--bg-color-main);
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.dropdown-content a {
  padding: 10px 16px;
  text-decoration: none;
  display: block;
  text-transform: capitalize;
}

.dropdown-content a:hover {
  cursor: pointer;
  background-color: rgba(153, 168, 209, 0.5);
}
.dropdown:hover .dropdown-content {
  display: block;
}
a {
  color: var(--color-white) !important;
}
a:hover {
  text-decoration: none !important;
}
</style>
