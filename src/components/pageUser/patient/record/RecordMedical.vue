<template>
  <div class="container-fluid">
    <div class="row">
      <div class="title-top">medical history</div>
      <CommonTable
        class="col-12"
        :data="listRecordMeImp"
        :columns="delvContentTableColumns"
        :isBusy="isBusy"
      ></CommonTable>
    </div>
  </div>
</template>

<script>
import CommonTable from "../../../table/CommonTable";
import TABLE_COLUMNS from "../../../../constants/table-column";
import { mapGetters } from "vuex";
export default {
  name: "schedule",
  components: {
    CommonTable,
  },
  computed: {
    ...mapGetters("recordContent", ["listRecordMeImp", "isBusy"]),
    delvContentTableColumns() {
      return TABLE_COLUMNS.MEDICAL_HISTORY_COLUMNS;
    },
  },
};
</script>

<style lang="scss" scoped>
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
