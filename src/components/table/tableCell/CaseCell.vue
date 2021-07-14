<template>
  <div>
    <div @click="sendChange">Details</div>
    <CaseModel
      :data="data"
      :accepts="accepts"
      @changeAccepts="change"
    ></CaseModel>
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
      console.log(this.data);
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
