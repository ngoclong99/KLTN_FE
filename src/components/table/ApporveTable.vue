<template>
  <!-- Chưa xong -->
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
            :busy="isBusy1"
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
      :busy="isBusy1"
    >
      <!--ACtion CELL -->
      <template #cell(action_approve)="row">
        <div class="flex-row">
          <DetailsActionCell :data="row.item"></DetailsActionCell>
          <font-awesome-icon
            icon="spinner"
            class="icon-1 ml-2"
            spin
            v-show="row.item.isOK"
            :disabled="row.item.isOK"
          />
          <font-awesome-icon
            v-show="!row.item.isOK && !row.item.isCancel"
            icon="check-circle"
            class="icon-1 ml-2"
            @click="approveSchedule(row.item)"
          />
          <font-awesome-icon
            icon="spinner"
            class="icon-1 ml-2"
            spin
            v-show="row.item.isCancel"
            :disabled="row.item.isCancel"
          />
          <font-awesome-icon
            v-show="!row.item.isCancel && !row.item.isOK"
            icon="times-circle"
            class="icon-1 ml-2"
            @click="cancelSchedule(row.item)"
          />
        </div>
      </template>
      <!-- Detail Table Dow-->
      <template #row-details="row">
        <b-card>
          <div class="row">
            <div class="col-lg-6 col-12">
              <b-form-group label="ID:" label-for="input-1">
                <b-form-input
                  disabled
                  type="text"
                  :value="row.item.id"
                ></b-form-input
              ></b-form-group>
            </div>
            <div class="col-lg-6 col-12">
              <b-form-group label="Doctor:" label-for="input-1">
                <b-form-input
                  disabled
                  type="text"
                  :value="row.item.doctor.fullName"
                ></b-form-input
              ></b-form-group>
            </div>
            <div class="col-lg-6 col-12">
              <b-form-group label="PatientID:" label-for="input-1">
                <b-form-input
                  disabled
                  type="text"
                  :value="row.item.patient.userName"
                ></b-form-input
              ></b-form-group>
            </div>
            <div class="col-lg-6 col-12">
              <b-form-group label="Full Name:" label-for="input-1">
                <b-form-input
                  disabled
                  type="text"
                  :value="row.item.patient.fullName"
                ></b-form-input
              ></b-form-group>
            </div>
            <div class="col-lg-6 col-12">
              <b-form-group label="Title Calendar:" label-for="input-1">
                <b-form-input
                  disabled
                  type="text"
                  :value="row.item.titleCalendar"
                ></b-form-input
              ></b-form-group>
            </div>
            <div class="col-lg-6 col-12">
              <b-form-group label="Status:" label-for="input-1">
                <b-form-input
                  disabled
                  type="text"
                  :value="row.item.status"
                ></b-form-input
              ></b-form-group>
            </div>
            <div class="col-12">
              <b-form-group label="Description:" label-for="input-1">
                <b-form-textarea
                  disabled
                  :value="row.item.description"
                  rows="2"
                  max-rows="6"
                ></b-form-textarea
              ></b-form-group>
            </div>
          </div>
        </b-card>
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
import moment from "moment";
import DetailsActionCell from "./tableCell/schedule/DetailsActionCell";
import ScheduleDetails from "./tableDetails/ScheduleDetails";
export default {
  components: {
    ScheduleDetails,
    DetailsActionCell,
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
    isBusy1: {
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
    approveSchedule(value) {
      const id = value.id;
      const data = value;
      this.$bvModal
        .msgBoxConfirm("Are you sure change status ?", {
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
        })
        .then((value) => {
          if (value) {
            Object.assign(data, { isOK: true });
            this.$store.dispatch("calendarContent/approveSchedule", {
              id: id,
              data: data,
              status: "CONFIRM",
            });
          } else {
            return false;
          }
        });
    },
    cancelSchedule(value) {
      const id = value.id;
      const data = value;
      this.$bvModal
        .msgBoxConfirm("Are you sure change status ?", {
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
        })
        .then((value) => {
          if (value) {
            Object.assign(data, { isCancel: true });
            this.$store.dispatch("calendarContent/cancelSchedule", {
              id: id,
              data: data,
              status: "REFUSE",
            });
          } else {
            return false;
          }
        });
    },
  },
};
</script>

<style scoped>
.icon-1 {
  color: var(--bg-color-main);
}
.icon-1:hover {
  color: black;
  cursor: pointer;
}
</style>
