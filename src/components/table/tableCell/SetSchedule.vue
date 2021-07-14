<template>
  <div>
    <span class="icon-user" @click="sendUser">Register</span>
    <SetScheduleModel
      :sendShowModel="typeUser"
      @changeUser="changeUser"
      :nameDoctor="getNameDoctor"
      :idDoctor="getidDoctor"
    ></SetScheduleModel>
  </div>
</template>
<script>
import SetScheduleModel from "../../modal/SetScheduleModel";
export default {
  components: { SetScheduleModel },
  data() {
    return {
      typeUser: false,
    };
  },
  computed: {
    getNameDoctor() {
      return this.$attrs.data.fullName;
    },
    getidDoctor() {
      return this.$attrs.data.userName;
    },
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
