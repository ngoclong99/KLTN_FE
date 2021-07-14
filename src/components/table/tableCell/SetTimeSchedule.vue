<template>
  <select name="time" v-model="timeDefault" @input="sendCalendarStatus">
    <option v-for="time in timeFrame" :key="time.value" :value="time.value">
      <span v-if="time.text">{{ time.text }}</span>
      <span>{{ time.startTime }} - {{ time.endTime }}</span>
    </option>
  </select>
</template>
<script>
import { HTTP } from "../../../services/services";
import moment from "moment";
import { EventBus } from "../../EventBus";
export default {
  watch: {
    timeDefault() {
      let time = this.timeDefault;
      switch (time) {
        case 1:
          timeStart = moment("08:00", "hh:mm a").format("hh:mm a");
          timeEnd = moment("09:00", "hh:mm a").format("hh:mm a");
          break;
        case 2:
          timeStart = moment("09:00", "hh:mm a").format("hh:mm a");
          timeEnd = moment("10:00", "hh:mm a").format("hh:mm a");
          break;
        case 3:
          timeStart = moment("10:00", "hh:mm a").format("hh:mm a");
          timeEnd = moment("11:00", "hh:mm a").format("hh:mm a");
          break;
        case 4:
          timeStart = moment("14:00", "hh:mm a").format("hh:mm a");
          timeEnd = moment("15:00", "hh:mm a").format("hh:mm a");
          break;
        case 5:
          timeStart = moment("15:00", "hh:mm a").format("hh:mm a");
          timeEnd = moment("16:00", "hh:mm a").format("hh:mm a");
          break;
        case 6:
          timeStart = moment("16:00", "hh:mm a").format("hh:mm a");
          timeEnd = moment("17:00", "hh:mm a").format("hh:mm a");
          break;
        default:
          break;
      }
      let timeStart;
      let timeEnd;
      this.start = timeStart;
      this.end = timeEnd;
      EventBus.$emit("timeDefault", timeStart, timeEnd);
    },
  },
  data() {
    return {
      date: "",
      start: "",
      end: "",
      timeDefault: 0,
      timeFrame: [
        {
          value: 0,
          text: "Select Time",
        },
        {
          value: 1,
          startTime: moment("08:00", "hh:mm a").format("hh:mm a"),
          endTime: moment("09:00", "hh:mm a").format("hh:mm a"),
        },
        {
          value: 2,
          startTime: moment("09:00", "hh:mm a").format("hh:mm a"),
          endTime: moment("10:00", "hh:mm a").format("hh:mm a"),
        },
        {
          value: 3,
          startTime: moment("10:00", "hh:mm a").format("hh:mm a"),
          endTime: moment("11:00", "hh:mm a").format("hh:mm a"),
        },
        {
          value: 4,
          startTime: moment("14:00", "hh:mm a").format("hh:mm a"),
          endTime: moment("15:00", "hh:mm a").format("hh:mm a"),
        },
        {
          value: 5,
          startTime: moment("15:00", "hh:mm a").format("hh:mm a"),
          endTime: moment("16:00", "hh:mm a").format("hh:mm a"),
        },
        {
          value: 6,
          startTime: moment("16:00", "hh:mm a").format("hh:mm a"),
          endTime: moment("17:00", "hh:mm a").format("hh:mm a"),
        },
      ],
    };
  },
  methods: {
    showA() {
      console.log(this.getCheckStatus);
    },
    sendCalendarStatus() {
      console.log(this.$data);
      // this.$store.dispatch(
      //   "scheduleContent/getCalendarStatus",
      //   this.getCheckStatus
      // );
    },
  },
  computed: {
    getCheckStatus() {
      this.timeFrame.find((time) => {
        return time.value === this.timeDefault;
      });
    },
  },
  mounted() {
    EventBus.$on("dateDefault", (dateUpdate) => {
      this.date = dateUpdate;
    });
  },
  // methods: {
  //   getStatus({ commit }) {
  //     HTTP.post("calendar/checkCalendarStatus", {
  //       headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  //     })
  //       .then((response) => {
  //         commit("setUserProfile", response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error.response.data.message);
  //       });
  //   },
  // },
};
</script>
<style lang="scss" scoped>
select {
  border: none;
  &:focus {
    outline: none;
  }
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
