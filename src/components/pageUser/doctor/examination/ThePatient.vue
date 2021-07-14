<template>
  <div>
    <div class="patient__content">
      <CommonTable
        :data="listPatient"
        :columns="patientContentTableColumns"
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
      isBusy: "patientContent/isBusy",
    }),
    patientContentTableColumns() {
      return TABLE_COLUMNS.PATIENT_COLUMNS;
    },
  },
  methods: {
    ...mapActions({
      getPatient: "patientContent/getPatient",
      getListAllDrug: "drugContent/getListAllDrug",
      getListRecord: "recordContent/getListRecord",
      getListService: "serviceContent/getListService",
    }),
  },
  created() {
    if (this.listPatient.length === 0) this.getPatient();
    if (this.listRecord.length === 0) this.getListRecord();
    if (this.ListService.length === 0) this.getListService();
    if (this.listAllDrug.length === 0) this.getListAllDrug();
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
.nav__top {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .nav__top-left {
    input {
      text-indent: 10px;
      &:focus-visible {
        border-color: var(--bg-color-main-hover);
        outline: none;
      }
    }
    button {
      @include button();
    }
  }
}
.patient__content {
  padding: 10px 15px;
}
</style>
