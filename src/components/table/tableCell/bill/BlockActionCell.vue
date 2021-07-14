<template>
  <div class="wrap" disable>
    <font-awesome-icon icon="check" disabled class="icon-user" />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    deteleBill() {
      const id = this.data.billId;
      this.$store.dispatch("billContent/statusBill", {
        id: id,
        router: this.$router,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: inline-block;
}
@mixin icon {
  color: var(--bg-color-main);
}

.icon-user {
  @include icon();
}
.icon-edit {
  @include icon();
  margin-left: 10px;
}
</style>
