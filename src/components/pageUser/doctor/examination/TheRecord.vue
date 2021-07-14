<template>
  <div>
    <div class="patient__content">
      <CommonTable
        :data="listRecord"
        :columns="recordContentTableColumns"
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
    ...mapGetters({
      listRecord: "recordContent/listRecord",
      ListService: "serviceContent/ListService",
      listAllDrug: "drugContent/listAllDrug",
      listPatient: "patientContent/listPatient",
      isBusy: "recordContent/isBusy",
    }),
    recordContentTableColumns() {
      return TABLE_COLUMNS.PATIENT_RECORD_COLUMNS;
    },
  },
  methods: {
    ...mapActions({
      getListAllDrug: "drugContent/getListAllDrug",
      getListRecord: "recordContent/getListRecord",
      getListService: "serviceContent/getListService",
      getPatient: "patientContent/getPatient",
    }),
  },
  created() {
    if (this.listRecord.length == 0) this.getListRecord();
    if (this.ListService.length == 0) this.getListService();
    if (this.listAllDrug.length == 0) this.getListAllDrug();
    if (this.listPatient.length === 0) this.getPatient();
  },
};
</script>

<style scoped lang="scss">
@mixin button {
  text-transform: capitalize;
  margin-left: 5px;
  background-color: var(--bg-color-main);
  color: var(--color-white);
  border-color: var(--bg-color-main);
}
.patient__content {
  position: relative;
  padding: 10px 15px;
}
.height-auto {
  max-height: 400px;
  overflow: auto;
}
</style>
