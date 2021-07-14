<template>
  <b-card>
    <BasicTable
      :data="listPrescription"
      :columns="patientServiceDetailsTableColumns"
    >
    </BasicTable>
    <div>
      <p class="float-right mr-3">
        Total:
        <span>{{
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            currencySign: "accounting",
          }).format(totalMonney)
        }}</span>
      </p>
    </div>
    <b-button size="sm" @click="data.toggleDetails">Hide Details</b-button>
  </b-card>
</template>
<script>
import BasicTable from "../BasicTable";
import TABLE_COLUMNS from "../../../constants/table-column";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { BasicTable },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totalMonney() {
      var monney = 0;
      this.listPrescription.forEach((item) => {
        monney += item.fees;
      });
      return monney;
    },
    patientServiceDetailsTableColumns() {
      return TABLE_COLUMNS.STAFF_DETAILS_SERVICE_COLUMNS;
    },
    listPrescription() {
      const list = this.data.item.listServiceUsedCustom;
      return list;
    },
  },
};
</script>
<style lang="scss" scoped></style>
