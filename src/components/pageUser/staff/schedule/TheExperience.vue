<template>
  <div class="">
    <div class="prescription__content">
      <ApporveTable
        :data="getCalendarWaiting"
        :columns="approveContentTableColumns"
        :isBusy1="isBusy1"
      ></ApporveTable>
    </div>
  </div>
</template>

<script>
import ApporveTable from "../../../table/ApporveTable";
import TABLE_COLUMNS from "../../../../constants/table-column";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    ApporveTable,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      allListSchedule: "calendarContent/allListSchedule",
      isBusy1: "calendarContent/isBusy1",
    }),
    approveContentTableColumns() {
      return TABLE_COLUMNS.STAFF_APPROVE_SCHEDULE_COLUMNS;
    },
    getCalendarWaiting() {
      const list = this.allListSchedule.filter(function(item) {
        return item.status === "WAITING";
      });
      return list.reverse();
    },
  },
  methods: {
    ...mapActions({
      getAllListCalendar: "calendarContent/getAllListCalendar",
    }),
  },
  created() {
    if (this.allListSchedule.length === 0) this.getAllListCalendar();
  },
};
</script>

<style scoped lang="scss"></style>
