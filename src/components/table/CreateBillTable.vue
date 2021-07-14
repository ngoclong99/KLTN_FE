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
