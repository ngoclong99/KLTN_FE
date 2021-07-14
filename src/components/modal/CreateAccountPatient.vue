<template>
  <div>
    <b-modal
      hide-footer
      scrollable
      size="lg"
      v-model="show"
      ok-only
      title="Create"
      @ok="handleOk"
      @hidden="handleOk"
    >
      <div class="row">
        <div class="col-lg-6 col-12">
          <b-form-group label="User Name:">
            <b-form-input
              type="text"
              v-model="userName"
              v-validate="{
                required: true,
                min: 8,
                max:16,
                alpha_num: true,
              }"
              name="userName"
            ></b-form-input
          ></b-form-group>
          <label v-show="errors.has('userName')" class="error alert-danger">{{
            errors.first("userName")
          }}</label>
        </div>
        <div class="col-lg-6 col-12">
          <b-form-group label="Password:">
            <b-form-input
              type="password"
              v-model="password"
              v-validate="{
                required: true,
                regex: '^\\S*$',
                min: 6,
              }"
              name="passWord"
            ></b-form-input
          ></b-form-group>
          <label v-show="errors.has('passWord')" class="error alert-danger">{{
            errors.first("passWord")
          }}</label>
        </div>
        <div class="col-lg-6 col-12">
          <b-form-group label="Full Name:">
            <b-form-input
              type="text"
              v-model="fullName"
              v-validate="{
                required: true,
                regex: /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂếẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i,
              }"
              name="fullName"
            ></b-form-input
          ></b-form-group>
          <label v-show="errors.has('fullName')" class="error alert-danger">{{
            errors.first("fullName")
          }}</label>
        </div>
        <div class="col-lg-6 col-12">
          <b-form-group label="Phone Number:">
            <b-form-input
              type="text"
              v-model="phoneNumber"
              name="phoneNumber"
              v-validate="{
                required: true,
                regex: /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,
              }"
            ></b-form-input
          ></b-form-group>
          <label
            v-show="errors.has('phoneNumber')"
            class="error alert-danger"
            >{{ errors.first("phoneNumber") }}</label
          >
        </div>
        <div class="col-lg-6 col-12">
          <b-form-group label="Email:">
            <b-form-input
              type="text"
              v-model="email"
              name="email"
              v-validate="{
                required: true,
                regex: '^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$',
              }"
            ></b-form-input
          ></b-form-group>
          <label v-show="errors.has('email')" class="error alert-danger">{{
            errors.first("email")
          }}</label>
        </div>
        <div class="col-lg-6 col-12">
          <b-form-group label="Gender:">
            <b-form-radio v-model="gender" name="some-radios" value="false"
              >Male</b-form-radio
            >
            <b-form-radio v-model="gender" name="some-radios" value="true"
              >FeMale</b-form-radio
            >
          </b-form-group>
        </div>
        <div class="col-12">
          <b-form-group label="Address:">
            <b-form-textarea
              id="textarea"
              v-model="address"
              placeholder="Enter something..."
              rows="2"
              max-rows="6"
              name="address"
              v-validate="{
                required: true,
              }"
            ></b-form-textarea>
          </b-form-group>
          <label v-show="errors.has('address')" class="error alert-danger">{{
            errors.first("address")
          }}</label>
        </div>
      </div>
      <button
        type="button"
        class="btn btn-outline-primary mr-3"
        @click="createPatient"
        :disabled="isLoadingCreatePatient"
      >
        <font-awesome-icon
          v-show="isLoadingCreatePatient"
          icon="spinner"
          class="icon-form-m"
          spin
        />
        Create
      </button>
      <button type="button" class="btn btn-outline-primary" @click="handleOk">
        Cancel
      </button>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      show: this.accepts,
      userName: "",
      password: "",
      fullName: "",
      phoneNumber: "",
      email: "",
      gender: false,
      address: "",
    };
  },
  props: {
    accepts: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      isLoadingCreatePatient: "accountContent/isLoadingCreatePatient",
    }),
  },
  methods: {
    handleOk() {
      this.show = false;
      this.$emit("changeAccepts", this.show);
      this.userName = "";
      this.password = "";
      this.fullName = "";
      this.phoneNumber = "";
      this.email = "";
      this.gender = false;
      this.address = "";
    },
    createPatient() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return false;
        } else {
          this.$store.commit("accountContent/setIsLoadingCreatePatient", true);
          this.$store.dispatch("accountContent/createAccountPatient", {
            userName: this.userName,
            password: this.password,
            fullName: this.fullName,
            phoneNumber: this.phoneNumber,
            email: this.email,
            gender: this.gender,
            address: this.address,
          });
        }
      });
    },
  },
  watch: {
    accepts() {
      this.show = this.accepts;
    },
    isLoadingCreatePatient() {
      if (this.isLoadingCreatePatient == false) this.handleOk();
    },
  },
};
</script>

<style scoped lang="scss"></style>
