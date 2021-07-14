<template>
  <div>
    <b-modal
      hide-footer
      scrollable
      size="lg"
      v-model="showModal"
      ok-only
      @ok="handleUser"
      @hidden="handleUser"
    >
      <div class="wrapper">
        <div class="wrapper__content container">
          <div class="row">
            <div class="col-6 text-right">
              <p>Date of booking:</p>
              <p>TimeFrame:</p>
              <p>Doctor:</p>
              <p>Your imfomation:</p>
              <p>Your topic:</p>
              <p>Describe your problem:</p>
            </div>
            <div class="col-6">
              <p>
                <span>{{ date }}</span>
                <font-awesome-icon
                  icon="calendar-alt"
                  class="ml-2"
                ></font-awesome-icon>
              </p>
              <p>
                <span>{{ timeStart }} - {{ timeEnd }}</span>
                <font-awesome-icon
                  icon="clock"
                  class="ml-2"
                ></font-awesome-icon>
              </p>
              <p>{{ fullName }}</p>
              <p>{{ user.fullName }}</p>
              <input
                type="text"
                placeholder="Title"
                class="w-100"
                v-model="titleCalendar"
                name="title"
                v-validate="{
                  required: true,
                  regex: /^([a-zA-Z0-9=.,:`'ếÀẾÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/,
                }"
              />
              <label v-show="errors.has('title')" class="error alert-danger">{{
                errors.first("title")
              }}</label>
              <textarea
                class="mt-3 w-100"
                v-model="description"
                v-validate="{
                  required: true,
                  regex: /^([a-zA-Z0-9-.,:`'ếÀẾÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/,
                }"
                name="description"
              ></textarea>
              <label
                v-show="errors.has('description')"
                class="error alert-danger"
                >{{ errors.first("description") }}</label
              >
            </div>
            <div class="col-12 text-right mb-3">
              <button
                type="button"
                class="btn btn-outline-primary mr-3"
                @click="handleUser"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="postSchedule"
                :disabled="isLoading"
              >
                <font-awesome-icon
                  icon="spinner"
                  class="icon-remove ml-2"
                  spin
                  v-show="isLoading"
                />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <template #modal-title>
        <h4>Details</h4>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { EventBus } from "../EventBus";
import moment from "moment";
import axios from "axios";
export default {
  props: {
    sendShowModel: {
      type: Boolean,
      required: true,
    },
    nameDoctor: {
      type: String,
      required: true,
    },
    idDoctor: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showModal: this.sendShowModel,
      fullName: this.nameDoctor,
      description: "",
      doctorID: this.idDoctor,
      date: "",
      timeEnd: "",
      timeStart: "",
      titleCalendar: "",
      isLoading: false,
    };
  },
  mounted() {
    EventBus.$on("timeDefault", (timeStart, timeEnd) => {
      this.timeStart = timeStart;
      this.timeEnd = timeEnd;
    });
    EventBus.$on("dateDefault", (dateUpdate) => {
      this.date = dateUpdate;
    });
  },
  methods: {
    handleUser() {
      this.showModal = false;
      this.$emit("changeUser", this.showModal);
    },
    postSchedule() {
      if (this.timeStart == "" && this.timeEnd == "")
        alert("Please select time");
      else {
        this.$validator.validateAll().then((isValid) => {
          if (!isValid) {
            return false;
          } else {
            this.isLoading = true;
            axios
              .post(
                "https://clinicspringboot.herokuapp.com/api/v1/calendar/makeAnAppointment",
                {
                  description: this.description,
                  doctorID: this.doctorID,
                  startTime: moment(this.date + " " + this.timeStart).format(),
                  endTime: moment(this.date + " " + this.timeEnd).format(),
                  titleCalendar: this.titleCalendar,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
              .then((response) => {
                alert(response.data.message);
                this.isLoading = false;
                this.$router.push({ name: "ScheduleMe" });
              })
              .catch((err) => {
                this.isLoading = false;
                alert(err.data.message);
              });
          }
        });
      }
    },
  },

  computed: {
    ...mapGetters({
      user: "profile/user",
    }),
  },
  watch: {
    sendShowModel() {
      this.showModal = this.sendShowModel;
    },
    fullName() {
      this.fullName = this.fullName;
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  .wrapper__content {
  }
}
</style>
