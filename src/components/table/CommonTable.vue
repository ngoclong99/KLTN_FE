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
            :busy="isBusy"
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
      :busy="isBusy"
    >
      <!--ACtion CELL -->
      <template #cell(showCase)="row">
        <CaseCell :data="row.item"></CaseCell>
      </template>
      <template #cell(patientAction)="row">
        <PatientInfoActionCell :data="row.item"></PatientInfoActionCell>
        <PatientRecordActionCell :data="row.item"></PatientRecordActionCell>
      </template>
      <template #cell(setSchudule)="row">
        <SetSchedule :data="row.item"></SetSchedule>
      </template>
      <template #cell(fullNameInfor)="row">
        <div :id="`popover-1-${row.item.userName}`">
          {{ row.item.fullName }}
        </div>
        <b-popover
          :target="`popover-1-${row.item.userName}`"
          triggers="hover focus"
        >
          <strong>Specialized:</strong> {{ row.item.specialized }}
          <br />
          <strong>Experience: </strong>{{ row.item.experience }} year
          <br />
          <strong>Gender: </strong>{{ row.item.gender ? "FeMale" : "Male" }}
        </b-popover>
      </template>
      <template #cell(selectTime)="row">
        <SetTimeSchedule :data="row.item"></SetTimeSchedule>
      </template>
      <template #cell(selectDate)="row">
        <SetDaySchedule :data="row.item"></SetDaySchedule>
      </template>
      <template #cell(actionRecord)="row">
        <PatientInfoRecordActionCell
          :data="row.item"
        ></PatientInfoRecordActionCell>
        <PatientPrescriptionActionCell
          :data="row.item"
        ></PatientPrescriptionActionCell>
        <PatientCreateBillActionCell
          :data="row.item"
        ></PatientCreateBillActionCell>
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
import CaseCell from "./tableCell/CaseCell";
import PatientInfoActionCell from "./tableCell/PatientInfoActionCell";
import PatientInfoRecordActionCell from "./tableCell/PatientInfoRecordActionCell";
import PatientRecordActionCell from "./tableCell/PatientRecordActionCell";
import PatientRecordInfoActionCell from "./tableCell/PatientRecordInfoActionCell";
import PatientPrescriptionActionCell from "./tableCell/PatientPrescriptionActionCell";
import SetSchedule from "./tableCell/SetSchedule";
import SetTimeSchedule from "./tableCell/SetTimeSchedule";
import SetDaySchedule from "./tableCell/SetDaySchedule";
import PatientCreateBillActionCell from "./tableCell/PatientCreateBillActionCell";

export default {
  components: {
    CaseCell,
    PatientInfoActionCell,
    SetSchedule,
    SetTimeSchedule,
    SetDaySchedule,
    PatientRecordActionCell,
    PatientRecordInfoActionCell,
    PatientPrescriptionActionCell,
    PatientInfoRecordActionCell,
    PatientCreateBillActionCell,
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
