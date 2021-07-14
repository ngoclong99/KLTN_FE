<template>
  <div class="prescription">
    <h4>list service</h4>
    <div class="container">
      <div class="row">
        <div class="col-12 height-auto">
          <BasicTable
            :data="ListResultService"
            :columns="patientDetailsTableColumns"
            :prescription="data"
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
import { mapGetters } from "vuex";

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
    ...mapGetters({
      ListResultService: "serviceContent/ListResultService",
    }),
    patientDetailsTableColumns() {
      return TABLE_COLUMNS.PATIENT_SERVICE_PRESCRIPTION_COLUMNS;
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
.height-auto {
  max-height: 400px;
  overflow-x: hidden;
}
</style>
