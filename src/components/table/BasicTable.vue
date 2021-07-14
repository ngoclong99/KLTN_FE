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
        small
      >
        <!-- action CELL -->
        <template #cell(descriptionService)="row">
          <PatientDesServiceActionCell
            :data="row.item"
          ></PatientDesServiceActionCell>
        </template>
        <template #cell(imageService)="row">
          <PatientImageServiceActionCell
            :data="row.item"
          ></PatientImageServiceActionCell>
        </template>
        <template #cell(action_schedule_details)="row">
          <font-awesome-icon
            icon="spinner"
            class="icon-remove-1 ml-2"
            spin
            v-if="row.item.loadingStatus"
            :disabled="row.item.loadingStatus"
          />
          <b-form-select
            v-if="!row.item.loadingStatus"
            v-model="selected"
            :options="options"
            @change="changeStatus(row.item)"
            size="sm"
            class="selec"
          ></b-form-select>
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
import PatientDesServiceActionCell from "./tableCell/PatientDesServiceActionCell";
import PatientImageServiceActionCell from "./tableCell/PatientImageServiceActionCell";
export default {
  components: { PatientImageServiceActionCell, PatientDesServiceActionCell },
  data() {
    return {
      filter: null,
      filterOn: [],
      perPage: 10,
      currentPage: 1,

      selected: "",
      options: [
        { value: "", text: "Status" },
        { value: "WAITING", text: "Waiting" },
        { value: "CONFIRM", text: "Confirm" },
        { value: "REFUSE", text: "Refuse" },
      ],
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
  },
  computed: {
    rows() {
      return this.data.length;
    },
  },
  methods: {
    changeStatus(data) {
      const calendarID = data.id;
      const status = this.selected;
      const schedule = data;
      this.$bvModal
        .msgBoxConfirm("Are you sure change status ?", {
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
        })
        .then((value) => {
          if (value) {
            Object.assign(schedule, { loadingStatus: true });
            this.$store.dispatch("calendarContent/changeStatusSchedule", {
              calendarID: calendarID,
              status: status,
              data: schedule,
            });
          } else {
            return false;
          }
        })
        .catch((err) => {});
    },
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.icon-remove {
  place-self: center;
  margin: 0px 5px;
  color: var(--bg-color-main);
}
.icon-remove-1 {
  place-self: center;
  margin: 0px 5px;
  color: var(--bg-color-main);
}
.icon-remove-1:hover {
  color: black;
}
.icon-remove:hover {
  color: black;
  cursor: pointer;
}
.selec {
  display: inline-block !important;
}
.custom-select {
  width: 100px;
}
</style>
