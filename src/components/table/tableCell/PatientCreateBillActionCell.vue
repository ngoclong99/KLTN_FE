<template>
  <div class="wrap ml-2">
    <font-awesome-icon icon="notes-medical" class="icon-user" @click="sendUser" />
    <PrescriptionBillModal
      :sendShowModel="typeUser"
      @changeUser="changeUser"
      :data="this.data"
    ></PrescriptionBillModal>
  </div>
</template>
<script>
import PrescriptionBillModal from "../../modal/PrescriptionBillModal";

export default {
  components: { PrescriptionBillModal },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      typeUser: false,
    };
  },
  methods: {
    sendUser() {
      this.typeUser = !this.typeUser;
    },
    changeUser(value) {
      value !== false ? (this.typeUser = false) : (this.typeUser = value);
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
