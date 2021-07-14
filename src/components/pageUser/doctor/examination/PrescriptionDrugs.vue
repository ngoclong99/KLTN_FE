<template>
  <div class="prescription">
    <h4>list drugs</h4>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <BasicTable
            :data="listPrescription"
            :columns="patientDetailsTableColumns"
          >
          </BasicTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicTable from "../../../table/BasicTable";
import TABLE_COLUMNS from "../../../../constants/table-column";

export default {
  components: { BasicTable },
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    patientDetailsTableColumns() {
      return TABLE_COLUMNS.PATIENT_DETAILS_PRESCRIPTION_COLUMNS;
    },
    listPrescription() {
      const list = this.data.detailMRs[0].prescriptions;
      return list;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.prescription {
  box-shadow: 2px 3px 5px var(--bg-color-main);
  border: 1px solid var(--bg-color-main);
  h4 {
    text-transform: capitalize;
    display: block;
    text-align: center;
    font-weight: 700;
    color: var(--bg-color-main);
  }
}
</style>
