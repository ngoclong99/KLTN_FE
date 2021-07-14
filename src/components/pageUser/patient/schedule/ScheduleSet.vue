<template>
  <div class="container-fluid">
    <div class="row" id="time">
      <div class="title-top">set schedule</div>
      <CommonTable
        class="col-12"
        :data="listSDoctor"
        :columns="delvContentTableColumns"
        :isBusy="isBusy"
      ></CommonTable>
    </div>
  </div>
</template>

<script>
import CommonTable from "../../../table/CommonTable";
import TABLE_COLUMNS from "../../../../constants/table-column";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    CommonTable,
  },
  computed: {
    ...mapGetters("scheduleContent", ["listSDoctor","isBusy"]),
    delvContentTableColumns() {
      return TABLE_COLUMNS.APPOINTMENT_SCHEDULE_COLUMNS;
    },
  },
  methods: {
    ...mapActions("scheduleContent", ["getListScheduleDoctor"]),
  },
  created() {
    this.getListScheduleDoctor();
  },
};
</script>

<style scoped>

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
