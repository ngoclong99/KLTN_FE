<template>
  <b-card>
    <div class="row">
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">User Name:</label>
          <b-form-input
            class="user-input"
            size="sm"
            :value="data.item.userName"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">Full Name:</label>
          <b-form-input
            class="user-input"
            size="sm"
            :value="data.item.fullName"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">Email:</label>
          <b-form-input
            class="user-input"
            size="sm"
            :value="data.item.email"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">Phone Number:</label>
          <b-form-input
            class="user-input"
            size="sm"
            :value="data.item.phoneNumber"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">Gender:</label>
          <b-form-input
            class="user-input"
            size="sm"
            :value="data.item.gender ? 'FeMale' : 'Male'"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">Date:</label>
          <b-form-input
            class="user-input"
            size="sm"
            :value="data.item.dateOfBirth"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">Date Create:</label>
          <b-form-input
            class="user-input"
            size="sm"
            v-model="dateCreate"
            disabled
          ></b-form-input>
        </div>
      </div>
      <div class="col-12">
        <div class="wrap">
          <label class="user-lable mr-3">Address:</label>
          <b-form-textarea
            rows="2"
            max-rows="6"
            :value="data.item.address"
            disabled
          ></b-form-textarea>
        </div>
      </div>
      <div class="col-md-6 col-12" v-if="isDoctor >= 1">
        <div class="wrap">
          <label class="user-lable">Experience:</label>
          <b-form-input
            class="user-input"
            size="sm"
            v-model="experience"
            name="experience"
            v-validate="{
              required: true,
              numeric: true,
              min_value: 1,
              max: 90,
            }"
          ></b-form-input>
        </div>
        <label v-show="errors.has('experience')" class="error alert-danger">{{
          errors.first("experience")
        }}</label>
      </div>
      <div class="col-md-6 col-12" v-if="isDoctor >= 1">
        <div class="wrap">
          <label class="user-lable">Specialized:</label>
          <b-form-input
            class="user-input"
            size="sm"
            v-model="specialized"
            name="specialized"
            v-validate="{
              required: true,
              alpha_spaces: true,
            }"
          ></b-form-input>
        </div>
        <label v-show="errors.has('specialized')" class="error alert-danger">{{
          errors.first("specialized")
        }}</label>
      </div>
    </div>
    <div class="float-right">
      <b-button
        size="sm"
        class="mr-3"
        @click="changeUser"
        v-if="experience >= 1"
        :disabled="isLoading"
      >
        <font-awesome-icon
          v-show="isLoading"
          icon="spinner"
          class="icon-form-m"
          spin
        />
        Save
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
      dateCreate: moment(this.data.item.createdAt).format("DD-MMM-YYYY"),
      status: this.data.item.enable,
      experience: this.data.item.experience,
      specialized: this.data.item.specialized,
      userDoctor: this.data.item.userName,
      isDoctor: this.data.item.experience,
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
      isLoading: "accountContent/isLoading",
    }),
  },
  methods: {
    cancelEdit() {
      this.data.toggleDetails();
    },
    changeUser() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.$store.commit("accountContent/setIsLoading", false);
        } else {
          this.$store.dispatch("accountContent/setAccountDoctor", {
            experience: this.experience,
            specialized: this.specialized,
            userDoctor: this.userDoctor,
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
