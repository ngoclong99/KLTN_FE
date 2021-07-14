<template>
  <div class="container-fluid">
    <div class="row">
      <div class="title-top">my schedule</div>
      <Fullcalendar
        class="fullCalendarl col-12"
        :plugins="calendarPlugins"
        :header="{
          left: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          right: 'prev today next',
        }"
        :weekends="true"
        :selectable="true"
        :events="listEvents"
        @eventClick="handleEventClick"
        :allDaySlot="false"
      >
      </Fullcalendar>
      <CalendarModel
        :accepts="accepts"
        @changeAccepts="change"
        :idEvent="idEvent"
        :listEvent="listEvent"
      ></CalendarModel>
    </div>
  </div>
</template>

<script>
require("@fullcalendar/core/main.min.css");
require("@fullcalendar/daygrid/main.min.css");
require("@fullcalendar/timegrid/main.min.css");

import Fullcalendar from "@fullcalendar/vue";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";
import ListPlugin from "@fullcalendar/list";

import CalendarModel from "../../modal/CalendarModal.vue";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  components: { Fullcalendar, CalendarModel },
  data() {
    return {
      calendarPlugins: [
        DayGridPlugin,
        TimeGridPlugin,
        InteractionPlugin,
        ListPlugin,
      ],
      accepts: false,

      idEvent: null,
      listEvent: null,
    };
  },
  computed: {
    ...mapGetters({
      events: "calendarContent/listCalendarDoctor",
    }),
    listEvents() {
      const listEventsa = this.events.map((event) => {
        const newEvent = {};
        newEvent.id = event.id;
        newEvent.title = event.title_calendar;
        newEvent.start = moment(event.startTime).format("YYYY-MM-DD hh:mm");
        newEvent.end = moment(event.endTime).format("YYYY-MM-DD hh:mm");
        return newEvent;
      });
      return listEventsa;
    },
  },
  methods: {
    ...mapActions({
      getSchedule: "calendarContent/getScheduleDoctor",
    }),
    sendChange() {
      this.accepts = !this.accepts;
    },
    change(value) {
      value !== false ? (this.accepts = false) : (this.accepts = value);
    },
    handleEventClick(arg) {
      const id = arg.event.id;
      const listEvent = this.events;
      this.idEvent = id;
      this.listEvent = listEvent;
      this.accepts = true;
    },
    formatDate(date) {
      var options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      var string = date.toLocaleDateString("");
    },
  },
  created() {
    this.getSchedule();
  },
};
</script>

<style lang="scss" scoped>
.fullCalendar {
  margin: 20px 0px 40px 0px;
}
.title-top {
  position: relative;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 36px;
  font-weight: bold;
  color: var(--bg-color-main);
  text-transform: capitalize;
  padding: 8px 32px;
  background-color: var(--bg-color-title);
  color: white;
  border-radius: 10px;
}
</style>
