<template>
  <div>
    <div @click="sendChange">Xem chi tiết</div>
    <CaseModel :accepts="accepts" @changeAccepts="change"></CaseModel>
  </div>
</template>
<script>
import CaseModel from "../../modal/CaseModel";
export default {
  components: { CaseModel },
  data() {
    return {
      accepts: false,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    sendChange() {
      this.accepts = !this.accepts;
    },
    change(value) {
      value !== false ? (this.accepts = false) : (this.accepts = value);
    },
  },
};
</script>
<style lang="scss" scoped>
div {
  color: var(--bg-color-main);
  &:hover {
    cursor: pointer;
    color: var(--bg-color-main-hover);
  }
}
</style>
