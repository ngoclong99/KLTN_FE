<template>
  <div class="wrap">
    <font-awesome-icon
      icon="user-injured"
      class="icon-user"
      @click="showDetailRecord"
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
  margin-left: 10px;
}
</style>
