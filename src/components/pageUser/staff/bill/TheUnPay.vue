<template>
  <div class="prescription__content">
    <BillTable
      :data="ListUnPayBill"
      :columns="unPayContentTableColumns"
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
      ListUnPayBill: "billContent/ListUnPayBill",
      isBusy: "billContent/isBusy",
    }),
    unPayContentTableColumns() {
      return TABLE_COLUMNS.STAFF_UN_PAY_COLUMNS;
    },
  },
  methods: {
    ...mapActions({ getUnPayBill: "billContent/getUnPayBill" }),
  },
  created() {
    if (this.ListUnPayBill == 0) this.getUnPayBill();
  },
};
</script>

<style scoped lang="scss">
.prescription__content {
  position: relative;
  padding: 10px 15px;
}
</style>
