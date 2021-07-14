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
      <template #cell(accountDoctor)="row">
        <div class="flex-row">
          <AccountDoctorActionCell :data="row.item"></AccountDoctorActionCell>
          <b-form-checkbox
            switch
            class="ml-2"
            @change="changeStatus(row.item)"
            :checked="row.item.enable"
          ></b-form-checkbox>
        </div>
      </template>
      <template #cell(accountStaff)="row">
        <div class="flex-row">
          <AccountStaffActionCell :data="row.item"></AccountStaffActionCell>
          <b-form-checkbox
            switch
            class="ml-2"
            @change="changeStatus(row.item)"
            :checked="row.item.enable"
          ></b-form-checkbox>
        </div>
      </template>
      <template #cell(accountPatient)="row">
        <div class="flex-row">
          <AccountPatientActionCell :data="row.item"></AccountPatientActionCell>
          <b-form-checkbox
            switch
            class="ml-2"
            @change="changeStatus(row.item)"
            :checked="row.item.enable"
            v-if="role != 'ROLE_STAFF'"
          ></b-form-checkbox>
        </div>
      </template>
      <!-- Detail Table Dow-->
      <template #row-details="row">
        <AccountActionDetail :data="row"></AccountActionDetail>
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
import AccountDoctorActionCell from "./tableCell/AccountDoctorActionCell";
import AccountStaffActionCell from "./tableCell/AccountStaffActionCell";
import AccountPatientActionCell from "./tableCell/AccountPatientActionCell";
import AccountActionDetail from "./tableDetails/AccountActionDetail";
export default {
  components: {
    AccountActionDetail,
    AccountDoctorActionCell,
    AccountPatientActionCell,
    AccountStaffActionCell,
  },
  data() {
    return {
      role: localStorage.getItem("role"),
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
  methods: {
    changeStatus(item) {
      const id = item.userName;
      this.$store.dispatch("accountContent/setStatusAccount", id);
    },
  },
};
</script>

<style scoped>
.flex-row {
  display: flex;
}
</style>
