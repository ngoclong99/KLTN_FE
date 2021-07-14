<template>
  <div class="prescription__content">
    <BillTable
      :data="getRecordService"
      :columns="serviceContentTableColumns"
      :isBusy="isBusy"
    ></BillTable>
  </div>
</template>
<script>
import BillTable from "../../../table/BillTable";
import TABLE_COLUMNS from "../../../../constants/table-column";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    BillTable,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getRecordService: "billContent/getRecordService",
      ListService: "billContent/ListService",
      isBusy: "billContent/isBusy",
    }),
    serviceContentTableColumns() {
      return TABLE_COLUMNS.STAFF_RECORD_SERVICE_COLUMNS;
    },
  },
  methods: {
    change() {
      console.log(this.getRecordService);
    },
    ...mapActions({
      getListRecordService: "billContent/getListRecordService",
      getListService: "billContent/getListService",
    }),
  },
  created() {
    if (this.getRecordService == 0) this.getListRecordService();
    if (this.ListService == 0) this.getListService();
  },
};
</script>

<style scoped lang="scss">
.prescription__content {
  position: relative;
  padding: 10px 15px;
}
</style>
