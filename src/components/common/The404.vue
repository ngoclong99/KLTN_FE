<template id="login">
  <div class="text-center err">
    <font-awesome-icon icon="exclamation-triangle" class="iconError" />
    <h2>404</h2>
    <p>Looks like we've got some broken links.</p>
    <a class="text-err" @click="goBack">Go to Back.</a>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.text-err {
  color: blue !important;
  cursor: pointer;
}
.err {
  margin: 5% auto;
}
.iconError {
  font-size: var(--font-text-big);
  color: var(--bg-color-main);
}
</style>

