<template>
  <div class="wrap">
    <font-awesome-icon icon="user" class="icon-user" @click="sendUser" />
    <PatientInfoRecordModel
      :sendShowModel="typeUser"
      @changeUser="changeUser"
      :data="data"
    ></PatientInfoRecordModel>
  </div>
</template>
<script>
import PatientInfoRecordModel from "../../modal/PatientInfoRecordModel";
import { mapGetters } from "vuex";

export default {
  components: { PatientInfoRecordModel },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      typeUser: false,
      user: {},
    };
  },
  methods: {
    sendUser() {
      this.user = this.data;
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
