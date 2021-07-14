<template>
  <div class="wrap">
    <font-awesome-icon
      icon="pills"
      class="icon-user"
      @click="showDetailRecord"
    />
    <font-awesome-icon
      icon="spinner"
      class="icon-remove ml-2"
      spin
      v-show="data.loadingRemove"
      :disabled="data.loadingRemove"
    />
    <font-awesome-icon
      v-show="!data.loadingRemove"
      icon="trash-alt"
      class="icon-user ml-2"
      @click="removeGroup"
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
    removeGroup() {
      const id = this.data.id;
      const data = this.data;
      this.$bvModal
        .msgBoxConfirm("Are you sure delete ?", {
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
        })
        .then((value) => {
          // if enter OK button
          if (value) {
            Object.assign(data, { loadingRemove: true });
            this.$store.dispatch("drugContent/removeGroupDrugs", {
              id: id,
              data: data,
            });
          } else {
            return false;
          }
        })
        .catch((err) => {});
    },
    showDetailRecord() {
      this.data._showDetails = !this.data._showDetails;
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
  cursor: pointer;
  &:hover {
    color: black;
  }
}

.icon-user {
  @include icon();
}
.icon-edit {
  @include icon();
}
.icon-remove {
  color: var(--bg-color-main);
  &:hover {
    color: black;
  }
}
</style>
