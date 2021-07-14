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
      <template #cell(action_service)="row">
        <div class="flex-row">
          <ServiceActionCell :data="row.item"></ServiceActionCell>
          <font-awesome-icon
            v-show="row.item.loading"
            icon="spinner"
            class="icon-remove ml-2"
            spin
          />
          <b-form-checkbox
            v-show="!row.item.loading"
            switch
            class="ml-2"
            @change="changeStatus(row.item)"
            v-model="row.item.status"
          ></b-form-checkbox>
        </div>
      </template>
      <!-- Detail Table Dow-->
      <template #row-details="row">
        <ServiceActionDetail :data="row"></ServiceActionDetail>
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
import { mapGetters } from "vuex";
import ServiceActionCell from "./tableCell/service/ServiceActionCell";
import ServiceActionDetail from "./tableDetails/ServiceActionDetail";
export default {
  components: {
    ServiceActionDetail,
    ServiceActionCell,
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
    ...mapGetters({
      getService: "serviceContent/getService",
    }),
  },
  methods: {
    changeStatus(value) {
      value.status = !value.status;
      const id = value.id;
      const status = value.status;
      const service = this.getService(id);
      this.$bvModal
        .msgBoxConfirm("Are you sure change status ?", {
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
        })
        .then((value) => {
          if (value) {
            Object.assign(service, { loading: true, status: !status });
            this.$store.commit("serviceContent/changeStatusService", service);
            this.$store.dispatch("serviceContent/setStatusService", {
              id: id,
              service: service,
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

<style scoped>
.flex-row {
  display: flex;
}
.icon-remove {
  place-self: center;
  color: var(--bg-color-main);
}
</style>
