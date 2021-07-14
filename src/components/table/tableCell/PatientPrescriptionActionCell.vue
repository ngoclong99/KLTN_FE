<template>
  <div class="wrap ml-2">
    <font-awesome-icon icon="pills" class="icon-user" @click="sendUser" />
    <PrescriptionModal
      :sendShowModel="typeUser"
      @changeUser="changeUser"
      :data="this.data"
    ></PrescriptionModal>
  </div>
</template>
<script>
import PrescriptionModal from "../../modal/PrescriptionModal";

export default {
  components: { PrescriptionModal },
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
