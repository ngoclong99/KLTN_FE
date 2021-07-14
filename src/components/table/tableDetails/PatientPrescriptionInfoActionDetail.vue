<template>
  <b-card>
    <BasicTable :data="listPrescription" :columns="patientDetailsTableColumns">
    </BasicTable>
    <hr />
    <BasicTable
      :data="listServicePatients"
      :columns="patientServiceDetailsTableColumns"
    >
    </BasicTable>
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
    ...mapGetters({
      ListService: "serviceContent/ListService",
    }),
    patientDetailsTableColumns() {
      return TABLE_COLUMNS.PATIENT_DETAILS_PRESCRIPTION_COLUMNS;
    },
    patientServiceDetailsTableColumns() {
      return TABLE_COLUMNS.PATIENT_DETAILS_SERVICE_COLUMNS;
    },
    listPrescription() {
      const list = this.data.item.detailMRs[0].prescriptions;
      return list;
    },
    listServices() {
      const list = this.data.item.detailMRs[0].detailServiceUsed;
      return list;
    },
    listServicePatients() {
      const listAdd = this.ListService;
      const patientService = this.listServices;
      const res = listAdd.filter((el) => {
        return patientService.find((element) => {
          // return element.id === el.id;
          return element.service.id === el.id;
        });
      });
      return res;
    },
  },
};
</script>
<style lang="scss" scoped></style>
