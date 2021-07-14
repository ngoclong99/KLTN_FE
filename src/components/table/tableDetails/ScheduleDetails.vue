<template>
  <b-card>
    <BasicTable :data="listSchedule" :columns="scheduleDetailsTableColumns">
    </BasicTable>
    <b-button size="sm" @click="data.toggleDetails">Hide Details</b-button>
  </b-card>
</template>
<script>
import { mapGetters } from "vuex";
import BasicTable from "../BasicTable";
import TABLE_COLUMNS from "../../../constants/table-column";

export default {
  components: { BasicTable },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listSchedule: [],
    };
  },
  computed: {
    scheduleDetailsTableColumns() {
      return TABLE_COLUMNS.STAFF_DETAILS_SCHEDULE_COLUMNS;
    },
    ...mapGetters({ listCalendarById: "calendarContent/listCalendarById" }),
  },
  mounted() {
    const schedule = this.listCalendarById(this.data.item.patientId);
    const detailsSchedule = schedule.listCalendar;
    detailsSchedule.forEach((item) => {
      item.loadingStatus = false;
    });
    this.listSchedule = detailsSchedule;
  },
};
</script>
<style lang="scss" scoped></style>
