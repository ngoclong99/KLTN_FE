<template>
  <div>
    <div class="d-flex justify-content-between">
      <!-- Search -->
      <b-form-group>
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
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
    <div class="d-flex justify-content-between">
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
        :busy="isBusy"
        small
      >
        <!-- action CELL -->
        <template #cell(groupDrugs)="row">
          <actionCell :data="row.item"></actionCell>
        </template>

        <!-- Details -->
        <template #row-details="row">
          <GroupDrugActionDetail :data="row"></GroupDrugActionDetail>
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
  </div>
</template>

<script>
import actionCell from "./tableCell/drug/actionCell";
import PatientImageServiceActionCell from "./tableCell/PatientImageServiceActionCell";
import GroupDrugActionDetail from "./tableDetails/GroupDrugActionDetail";
export default {
  components: {
    PatientImageServiceActionCell,
    actionCell,
    GroupDrugActionDetail,
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
    isBusy: {
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
