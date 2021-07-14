<template>
  <div class="mt-2">
    <div class="d-flex justify-content-between">
      <!-- Search -->
      <b-form-group>
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
            :busy="isBusyDetails"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <!-- Pagination -->
      <b-pagination
        v-model="currentPage"
        :per-page="perPage"
        pills
        :total-rows="rows"
        size="sm"
        aria-controls="line-table"
      ></b-pagination>
    </div>
    <!-- Table -->
    <b-table
      :filter="filter"
      striped
      hover
      id="line-table"
      :per-page="perPage"
      :current-page="currentPage"
      :items="data"
      :fields="columns"
      small
      :busy="isBusyDetails"
    >
      <!--ACtion CELL -->
      <template #cell(actionRecord)="row">
        <PatientPrescriptionInfoActionCell
          :data="row.item"
        ></PatientPrescriptionInfoActionCell>
        <!-- <PatientCreateBillActionCell
          :data="row.item"
        ></PatientCreateBillActionCell> -->
      </template>
      <!-- Detail Table Dow-->
      <template #row-details="row">
        <PatientPrescriptionInfoActionDetail
          :data="row"
        ></PatientPrescriptionInfoActionDetail>
      </template>

      <!-- busy table -->
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import PatientPrescriptionInfoActionCell from "./tableCell/PatientPrescriptionInfoActionCell";
import PatientPrescriptionInfoActionDetail from "./tableDetails/PatientPrescriptionInfoActionDetail";
// import PatientCreateBillActionCell from "./tableCell/PatientCreateBillActionCell";
export default {
  components: {
    PatientPrescriptionInfoActionDetail,
    PatientPrescriptionInfoActionCell,
    // PatientCreateBillActionCell,
  },
  data() {
    return {
      filter: null,
      filterOn: [],
      perPage: 10,
      currentPage: 1,
    };
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    isBusyDetails: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    rows() {
      return this.data.length;
    },
  },
};
</script>

<style></style>
