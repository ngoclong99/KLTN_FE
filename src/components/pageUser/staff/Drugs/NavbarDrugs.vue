<template>
  <div class="row">
    <div class="col-12">
      <div class="examination">
        <router-link :to="{ name: 'GroupDrug' }">
          Group Drugs
        </router-link>
        <router-link :to="{ name: 'ManageDrug' }">
          Drugs
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
  max-width: 207px;
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
