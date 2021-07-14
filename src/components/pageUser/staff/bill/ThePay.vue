<template>
  <div class="prescription__content">
    <BillTable
      :data="ListPayBill"
      :columns="payContentTableColumns"
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
      ListPayBill: "billContent/ListPayBill",
      isBusy: "billContent/isBusy",
    }),
    payContentTableColumns() {
      return TABLE_COLUMNS.STAFF_PAY_COLUMNS;
    },
  },
  methods: {
    ...mapActions({
      getPayBill: "billContent/getPayBill",
      getListRecord: "recordContent/getListRecord",
    }),
  },
  created() {
    if (this.ListPayBill == 0) this.getPayBill();
  },
};
</script>

<style scoped lang="scss">
.prescription__content {
  position: relative;
  padding: 10px 15px;
}
</style>
