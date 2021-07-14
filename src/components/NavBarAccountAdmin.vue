<template>
  <div class="row">
    <div class="col-12">
      <div class="examination" v-if="role != 'ROLE_STAFF'">
        <router-link :to="{ name: 'AccountDoctor' }">
          doctor
        </router-link>
        <router-link :to="{ name: 'AccountStaff' }">
          staff
        </router-link>
        <router-link :to="{ name: 'AccountPatient' }">
          patient
        </router-link>
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
};
</script>

<style scoped lang="scss">
$height: 40px;
.router-link-active,
.router-link-exact-active {
  background-color: var(--bg-color-main-hover-bold);
}
.examination-2 {
  max-width: 86px;
  background-color: var(--bg-color-main);
  display: flex;
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
.examination {
  background-color: var(--bg-color-main);
  display: flex;
  max-width: 239px;
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
a {
  color: var(--color-white) !important;
}
a:hover {
  text-decoration: none !important;
}

@media screen and (max-width: 393px) {
  .examination {
    flex-direction: column;
  }
}
</style>
