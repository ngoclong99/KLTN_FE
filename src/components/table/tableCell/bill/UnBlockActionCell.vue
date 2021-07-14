<template>
  <div class="wrap">
    <font-awesome-icon
      icon="spinner"
      class="icon-remove ml-2"
      spin
      v-if="data.loadingStatus"
    />
    <font-awesome-icon
      v-show="!data.loadingStatus"
      icon="times"
      class="icon-user ml-2"
      @click="addBill"
      disabled
    />
    <font-awesome-icon
      icon="spinner"
      class="icon-remove ml-2"
      spin
      v-if="data.loadingRemove"
    />
    <font-awesome-icon
      v-show="!data.loadingRemove"
      icon="trash-alt"
      class="icon-remove ml-2"
      @click="removeBill"
    />
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
    addBill() {
      const id = this.data.billId;
      this.$bvModal
        .msgBoxConfirm("Are you sure change ?", {
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
        })
        .then((value) => {
          if (value) {
            Object.assign(this.data, { loadingStatus: true });
            this.$store.dispatch("billContent/unStatusUnBill", {
              id: id,
              router: this.$router,
            });
          } else return false;
        })
        .catch((err) => {});
    },
    removeBill() {
      const id = this.data.billId;
      const data = this.data;
      this.$bvModal
        .msgBoxConfirm("Are you sure delete ?", {
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
        })
        .then((value) => {
          if (value) {
            Object.assign(this.data, { loadingRemove: true });
            this.$store.dispatch("billContent/removeBill", {
              id: id,
            });
          } else return false;
        })
        .catch((err) => {});
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
  &:hover {
    color: black;
  }
}

.icon-user {
  @include icon();
  cursor: pointer;
}
.icon-remove {
  @include icon();
  cursor: pointer;
}
</style>
