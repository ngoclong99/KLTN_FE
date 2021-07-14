<template>
  <div>
    <div class="prescription__content">
      <PrescriptionTable
        :data="listPrescriptionRecord"
        :columns="recordContentTableColumns"
        :isBusyDetails="isBusyDetails"
      ></PrescriptionTable>
    </div>
  </div>
</template>

<script>
import PrescriptionTable from "../../../table/PrescriptionTable";
import TABLE_COLUMNS from "../../../../constants/table-column";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    PrescriptionTable,
  },
  computed: {
    ...mapGetters({
      listPrescriptionRecord: "recordContent/listPrescriptionRecord",
      isBusyDetails: "recordContent/isBusyDetails",
      listRecord: "recordContent/listRecord",
      ListService: "serviceContent/ListService",
      listAllDrug: "drugContent/listAllDrug",
      listPatient: "patientContent/listPatient",
    }),

    recordContentTableColumns() {
      return TABLE_COLUMNS.PATIENT_PRESCRIPTION_COLUMNS;
    },
  },
  methods: {
    ...mapActions({
      getListAllDrug: "drugContent/getListAllDrug",
      getListRecord: "recordContent/getListRecord",
      getListRecordDetails: "recordContent/getListRecordDetails",
      getListService: "serviceContent/getListService",
      getPatient: "patientContent/getPatient",
    }),
  },
  created() {
    if (this.listRecord.length == 0) this.getListRecord();
    if (this.ListService.length == 0) this.getListService();
    if (this.listAllDrug.length == 0) this.getListAllDrug();
    if (this.listPrescriptionRecord.length == 0) this.getListRecordDetails();
    if (this.listPatient.length === 0) this.getPatient();
  },
};
</script>

<style scoped lang="scss">
.prescription__content {
  position: relative;
  padding: 10px 15px;
}
</style>
