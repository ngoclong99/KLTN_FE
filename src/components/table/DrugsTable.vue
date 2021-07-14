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
        <template #cell(actionDrugs)="row">
          <drugActionCell :data="row.item"></drugActionCell>
          <font-awesome-icon
            icon="spinner"
            class="icon-remove ml-2"
            spin
            v-show="row.item.loadingRemove"
            :disabled="row.item.loadingRemove"
          />
          <font-awesome-icon
            v-show="!row.item.loadingRemove"
            icon="trash-alt"
            class="icon-remove"
            @click="removeDrugs(row.item)"
          />
        </template>

        <!-- Details -->
        <template #row-details="row">
          <DrugActionDetail :data="row"></DrugActionDetail>
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
import drugActionCell from "./tableCell/drug/drugActionCell";
import DrugActionDetail from "./tableDetails/DrugActionDetail";
import PatientImageServiceActionCell from "./tableCell/PatientImageServiceActionCell";
export default {
  components: {
    PatientImageServiceActionCell,
    drugActionCell,
    DrugActionDetail,
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
  methods: {
    removeDrugs(value) {
      const id = value.id;
      let data = value;
      this.$bvModal
        .msgBoxConfirm("Are you sure delete ?", {
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
        })
        .then((value) => {
          if (value) {
            Object.assign(data, { loadingRemove: true });
            this.$store.dispatch("drugContent/removeDrugs", {
              id: id,
              data: data,
            });
          } else {
            return false;
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style scoped lang="scss">
.icon-remove {
  place-self: center;
  margin: 0px 5px;
  color: var(--bg-color-main);
}
.icon-remove:hover {
  color: black;
  cursor: pointer;
}
</style>
