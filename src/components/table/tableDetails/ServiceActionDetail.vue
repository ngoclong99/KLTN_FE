<template>
  <b-card>
    <div class="row">
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">ID:</label>
          <b-form-input
            class="user-input"
            size="sm"
            :value="id"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">Date Created:</label>
          <b-form-input
            class="user-input"
            size="sm"
            :value="createdAt"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">Name:</label>
          <b-form-input
            class="user-input"
            size="sm"
            v-model="name"
            name="serviceName"
            v-validate="{
              required: true,
              regex: /^([a-zA-Z0-9-._:ếÀẾÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/,
            }"
          ></b-form-input>
        </div>
        <label v-show="errors.has('serviceName')" class="error alert-danger">{{
          errors.first("serviceName")
        }}</label>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">Fees:</label>
          <b-form-input
            class="user-input"
            size="sm"
            v-model="fees"
            name="serviceFees"
            v-validate="{
              required: true,
              numeric: true,
            }"
          ></b-form-input>
        </div>
        <label v-show="errors.has('serviceFees')" class="error alert-danger">{{
          errors.first("serviceFees")
        }}</label>
      </div>
    </div>
    <div class="float-right">
      <b-button
        size="sm"
        class="mr-3"
        @click="changeService"
        :disabled="this.data.item.loadingDetails"
      >
        <font-awesome-icon
          v-show="this.data.item.loadingDetails"
          icon="spinner"
          class="icon-form-m mr-1"
          spin
        />Save
      </b-button>
      <b-button size="sm" @click="cancelEdit">Cancel</b-button>
    </div>
  </b-card>
</template>
<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      createdAt: moment(this.data.item.createdAt).format("DD-MMM-YYYY"),
      name: this.data.item.name,
      fees: this.data.item.fees,
      id: this.data.item.id,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      isLoading: "serviceContent/isLoading",
    }),
  },
  methods: {
    cancelEdit() {
      this.data.toggleDetails();
    },
    changeService() {
      const service = this.data.item;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return false;
        } else {
          this.$store.dispatch("serviceContent/setService", {
            name: this.name,
            fees: this.fees,
            id: this.id,
            service: service,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  .user-lable {
    font-size: 14px;
  }
  .user-input {
    max-width: 250px;
  }
}
.wrap-status {
  display: flex;
}
</style>
