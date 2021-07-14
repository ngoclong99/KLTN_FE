<template>
  <div>
    <b-modal
      scrollable
      hide-footer
      size="lg"
      v-model="showModal"
      ok-only
      @hidden="handleUser"
    >
      <div class="wrapper">
        <div class="wrapper__content container">
          <div class="row">
            <div class="col-lg-6 col-12 wrapper__content-info">
              <label class="info-label">DoctorID:</label>
              <input
                type="text"
                class="info-content"
                disabled
                v-model="details.doctorID"
              />
            </div>
            <div class="col-lg-6 col-12 wrapper__content-info">
              <label class="info-label">Full Name:</label>
              <input
                type="text"
                class="info-content"
                disabled
                v-model="details.patientName"
              />
            </div>
            <div class="col-lg-6 col-12">
              <div class=" wrapper__content-info">
                <label class="info-label">Phone Number:</label>
                <input
                  type="text"
                  class="info-content"
                  v-model="details.phoneNumber"
                  v-validate="{
                    required: true,
                    regex: /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,
                  }"
                  name="phoneNumber"
                />
              </div>
              <label
                v-show="errors.has('phoneNumber')"
                class="error alert-danger"
                >{{ errors.first("phoneNumber") }}</label
              >
            </div>
            <div class="col-lg-6 col-12 ">
              <div class="wrapper__content-info">
                <label class="info-label">Age:</label>
                <input
                  type="text"
                  class="info-content"
                  v-model="details.age"
                  v-validate="{
                    required: true,
                    max: 2,
                    min_value: 1,
                    numeric: true,
                  }"
                  name="agePatient"
                />
              </div>
              <label
                v-show="errors.has('agePatient')"
                class="error alert-danger"
                >{{ errors.first("agePatient") }}</label
              >
            </div>
            <div class="col-lg-6 col-12 ">
              <div class="wrapper__content-info">
                <label class="info-label">Height:</label>
                <input
                  type="text"
                  class="info-content"
                  v-model="details.height"
                  v-validate="{
                    regex: /^([0-9.\s]+)$/i,
                    min_value: 0.4,
                    max_value: 5,
                  }"
                  placeholder="m"
                  name="heightPatient"
                />
              </div>
              <label
                v-show="errors.has('heightPatient')"
                class="error alert-danger"
                >{{ errors.first("heightPatient") }}</label
              >
            </div>
            <div class="col-lg-6 col-12">
              <div class=" wrapper__content-info">
                <label class="info-label">Weight:</label>
                <input
                  type="text"
                  class="info-content"
                  v-model="details.weight"
                  v-validate="{
                    regex: /^([0-9.\s]+)$/i,
                    min_value: 2,
                    max_value: 1000,
                  }"
                  name="weightPatient"
                  placeholder="kg"
                />
              </div>
              <label
                v-show="errors.has('weightPatient')"
                class="error alert-danger"
                >{{ errors.first("weightPatient") }}</label
              >
            </div>
            <div class="col-12 ">
              <div class="wrapper__content-info">
                <label class="info-label">Address:</label>
                <textarea
                  type="text"
                  class="info-content-full"
                  v-model="details.address"
                  rows="2"
                  v-validate="{
                    required: true,
                    regex: /^([a-zA-Z0-9.,:()ếÀẾÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/,
                  }"
                  name="addressPatient"
                />
              </div>
              <label
                v-show="errors.has('addressPatient')"
                class="error alert-danger"
                >{{ errors.first("addressPatient") }}</label
              >
            </div>
            <div class="col-12">
              <div class=" wrapper__content-info">
                <label class="info-label">Note:</label>
                <textarea
                  type="text"
                  class="info-content-full"
                  v-model="details.note"
                  rows="3"
                  v-validate="{
                    required: true,
                    regex: /^([a-zA-Z0-9.,:()ếÀẾÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/,
                  }"
                  name="notePatient"
                />
              </div>
              <label
                v-show="errors.has('notePatient')"
                class="error alert-danger"
                >{{ errors.first("notePatient") }}</label
              >
            </div>
            <div class="col-lg-6 col-12">
              <div class=" wrapper__content-info">
                <label class="info-label">Topic:</label>
                <input
                  type="text"
                  class="info-content"
                  v-model="details.title"
                  v-validate="{
                    required: true,
                    regex: /^([a-zA-Z0-9ếÀẾÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/,
                  }"
                  name="topicPatient"
                />
              </div>
              <label
                v-show="errors.has('topicPatient')"
                class="error alert-danger"
                >{{ errors.first("topicPatient") }}</label
              >
            </div>
            <div class="col-lg-6 col-12 ">
              <div class="wrapper__content-info">
                <label class="info-label">Diagnostic:</label>
                <input
                  type="text"
                  class="info-content"
                  v-model="details.diagnostic"
                  v-validate="{
                    required: true,
                    regex: /^([a-zA-Z0-9ếÀẾÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/,
                  }"
                  name="diagnostic"
                />
              </div>
              <label
                v-show="errors.has('diagnostic')"
                class="error alert-danger"
                >{{ errors.first("diagnostic") }}</label
              >
            </div>
            <div class="col-lg-6 col-12 wrapper__content-info">
              <label class="info-label">Severity:</label>
              <input
                type="checkbox"
                v-model="details.severity"
                class="info-check"
              />
            </div>
            <div class="col-lg-6 col-12 ">
              <div class="wrapper__content-info" v-if="details.severity">
                <label class="info-label">Year Of Illness:</label>
                <input
                  type="text"
                  class="info-content"
                  v-model="details.yeaOfIllness"
                  v-validate="{
                    required: true,
                    numeric: true,
                    min_value: 1900,
                    max_value: new Date().getFullYear(),
                  }"
                  name="yearM"
                />
              </div>
              <label
                v-show="errors.has('yearM') && details.severity"
                class="error alert-danger"
                >{{ errors.first("yearM") }}</label
              >
            </div>
          </div>
          <div class="row justify-content-end">
            <button
              type="button"
              class="btn btn-outline-primary mr-3"
              @click="createRecord"
              :disabled="data.isLoadingCreate"
            >
              <font-awesome-icon
                v-show="data.isLoadingCreate"
                icon="spinner"
                class="icon-form-m"
                spin
              />
              Create
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="handleUser"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <template #modal-title>
        <h4>Record</h4>
      </template>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  props: {
    sendShowModel: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: this.sendShowModel,
      fllowIsShow: this.data.isLoadingCreate,
      details: {
        doctorID: localStorage.getItem("username"),
        patientName: this.data.fullName,
        patientId: this.data.userName,
        phoneNumber: "",
        age: "",
        height: "",
        weight: "",
        address: "",
        note: "",
        title: "",
        diagnostic: "",
        dateOfReExamination: new Date(),
        severity: false,
        yeaOfIllness: "",
      },
    };
  },
  methods: {
    handleUser() {
      this.showModal = false;
      this.details.phoneNumber = "";
      this.details.age = "";
      this.details.height = "";
      this.details.weight = "";
      this.details.address = "";
      this.details.note = "";
      this.details.title = "";
      this.details.diagnostic = "";
      this.details.dateOfReExamination = new Date();
      this.details.severity = true;
      this.details.yeaOfIllness = 0;
      this.$emit("changeUser", this.showModal);
    },
    createRecord() {
      const id = localStorage.getItem("username");
      const patient = this.data;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return false;
        } else {
          this.$store.commit("patientContent/setLoadingCreateRecord", {
            isLoadingCreate: true,
            patient: patient,
          });
          this.$store.dispatch("recordContent/setRecord", {
            doctorID: id,
            detail: this.details,
            router: this.$router,
            patient: patient,
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters("recordContent", ["isLoading"]),
  },
  watch: {
    sendShowModel() {
      this.showModal = this.sendShowModel;
    },
    isLoading() {
      if (this.isLoading == true) this.handleUser();
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  .wrapper__content {
    .wrapper__content-info {
      display: flex;
      margin-bottom: 10px;
      $height: 36px;
      justify-content: space-between;
      .info-label {
        font-weight: bold;
        font-size: 16px;
        height: $height;
        line-height: $height;
        text-transform: capitalize;
        color: var(--bg-color-main);
      }
      .info-content {
        text-indent: 10px;
        margin-left: 10px;
        max-width: 200px;
        font-size: 16px;
        font-weight: 400;
        color: #495057;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        &:focus {
          color: #495057;
          background-color: #fff;
          border-color: #80bdff;
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 25%);
        }
      }
      .info-content-full {
        text-indent: 10px;
        margin-left: 10px;
        flex: 1;
        font-size: 16px;
        font-weight: 400;
        color: #495057;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        &:focus {
          color: #495057;
          background-color: #fff;
          border-color: #80bdff;
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 25%);
        }
      }
      .info-check {
        line-height: $height;
        height: $height;
        width: 20px;
        margin-left: 10px;
      }
    }
    .btn {
      align-items: center;
    }
  }
}
</style>
