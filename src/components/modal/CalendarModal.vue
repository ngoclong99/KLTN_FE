<template>
  <div>
    <b-modal
      scrollable
      size="lg"
      v-model="show"
      ok-only
      title="Details"
      @ok="handleOk"
      @hidden="handleOk"
      hide-backdrop
    >
      <div class="wrapper__content container">
        <div class="row">
          <div class="col-6 text-right">
            <p>Date of booking:</p>
            <p>TimeFrame:</p>
            <p>Doctor:</p>
            <p>Your imfomation:</p>
            <p>Your topic:</p>
            <p>Describe your problem:</p>
            <p>Status:</p>
          </div>
          <div class="col-6">
            <p>
              <span>{{ dateTime }}</span>
              <font-awesome-icon
                icon="calendar-alt"
                class="ml-2"
              ></font-awesome-icon>
            </p>
            <p>
              <span>{{ timeStart }} - {{ timeEnd }}</span>
              <font-awesome-icon icon="clock" class="ml-2"></font-awesome-icon>
            </p>
            <p>{{ nameDoctor }}</p>
            <!-- <p>{{ yourName }}</p> -->
            <p>{{ yourName }}</p>
            <!-- v-model="titleCalendar" -->
            <p>{{ topic }}</p>
            <!-- v-model="description" -->
            <p>{{ desc }}</p>
            <p>{{ status }}</p>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      show: this.accepts,
      dateTime: null,
      timeStart: null,
      timeEnd: null,
      nameDoctor: "",
      yourName: "",
      topic: "",
      desc: "",
      status: "",
    };
  },
  props: ["accepts"],
  props: {
    accepts: {
      type: Boolean,
      required: true,
    },
    idEvent: {
      type: String,
      required: true,
    },
    listEvent: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleOk() {
      this.show = false;
      this.$emit("changeAccepts", this.show);
    },
  },
  watch: {
    accepts() {
      const id = parseInt(this.idEvent);
      const list = this.listEvent;
      const el = list.find((item) => {
        return item.id == id;
      });
      console.log(el);
      this.dateTime = moment(el.startTime).format("DD-MM-YYYY");
      this.timeStart = moment(el.startTime).format("hh:mm a");
      this.timeEnd = moment(el.endTime).format("hh:mm a");
      this.nameDoctor = el.doctorName;
      this.yourName = el.patientName;
      this.topic = el.title_calendar;
      this.desc = el.description;
      this.status = el.status;

      this.show = this.accepts;
    },
  },
};
</script>

<style></style>
