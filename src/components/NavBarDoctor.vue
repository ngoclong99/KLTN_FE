<template>
  <div class="row">
    <div class="col-12">
      <div class="examination">
        <router-link :to="{ name: 'ThePatient' }">
          patient
        </router-link>
        <router-link :to="{ name: 'TheRecord' }">
          record
        </router-link>
        <router-link :to="{ name: 'ThePrescription' }">
          details
        </router-link>
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
  max-width: 258px;
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
