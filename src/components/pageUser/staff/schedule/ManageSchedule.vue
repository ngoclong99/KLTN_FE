<template>
  <div class="">
    <div class="prescription__content">
      <ScheduleTable
        :data="listCalendar"
        :columns="serviceContentTableColumns"
        :isBusy="isBusy"
      ></ScheduleTable>
    </div>
  </div>
</template>

<script>
import ScheduleTable from "../../../table/ScheduleTable";
import TABLE_COLUMNS from "../../../../constants/table-column";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    ScheduleTable,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      listCalendar: "calendarContent/listCalendar",
      isBusy: "calendarContent/isBusy",
    }),
    serviceContentTableColumns() {
      return TABLE_COLUMNS.STAFF_SCHEDULE_COLUMNS;
    },
  },
  methods: {
    ...mapActions({
      getAllSchedule: "calendarContent/getAllSchedule",
    }),
  },
  created() {
    if (this.listCalendar == 0) this.getAllSchedule();
  },
};
</script>

<style scoped lang="scss"></style>
