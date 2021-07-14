<template>
  <div class="wrap">
    <font-awesome-icon icon="clipboard" class="icon-edit" @click="sendChange"/>
    <PatientSendRecordModel
      :sendShowModel="typeUser"
      @changeUser="changeUser"
      :data="this.data"
    ></PatientSendRecordModel>
  </div>
</template>
<script>
import PatientSendRecordModel from "../../modal/PatientSendRecordModel";
import { mapGetters } from "vuex";

export default {
  components: { PatientSendRecordModel },
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
    sendChange() {
      this.typeUser = !this.typeUser;
    },
    changeUser(value) {
      value !== false ? (this.typeUser = false) : (this.typeUser = value);
    },
  },
  computed: {
    ...mapGetters({
      listPatient: "patientContent/listPatient",
    }),
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
.wrap {
  display: inline-block;
}
</style>
