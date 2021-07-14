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
      <template #cell(createBill)="row">
        <div class="flex-row">
          <CreateBillActionCell
            :data="row.item"
            class="ml-2"
          ></CreateBillActionCell>
        </div>
      </template>
      <template #cell(statusPayment)="row">
        <div class="flex-row">
          <DetailActionCell :data="row.item" class="ml-2"></DetailActionCell>
          <BlockActionCell :data="row.item" class="ml-2"></BlockActionCell>
        </div>
      </template>
      <template #cell(statusUnPayment)="row">
        <div class="flex-row">
          <DetailActionCell :data="row.item" class="ml-2"></DetailActionCell>
          <UnBlockActionCell :data="row.item" class=""></UnBlockActionCell>
        </div>
      </template>
      <!-- Detail Table Dow-->
      <!-- <ServiceInfolActionCell :data="row.item"></ServiceInfolActionCell> -->
      <template #row-details="row">
        <BillActionDetail :data="row"></BillActionDetail>
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
import ServiceInfolActionCell from "./tableCell/bill/ServiceInfolActionCell";
import BlockActionCell from "./tableCell/bill/BlockActionCell";
import DetailActionCell from "./tableCell/bill/DetailActionCell";
import UnBlockActionCell from "./tableCell/bill/UnBlockActionCell";
import CreateBillActionCell from "./tableCell/bill/CreateBillActionCell";
import BillActionDetail from "./tableDetails/BillActionDetail";
export default {
  components: {
    BillActionDetail,
    CreateBillActionCell,
    ServiceInfolActionCell,
    BlockActionCell,
    UnBlockActionCell,
    DetailActionCell,
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
    changeStatus(item) {
      const id = item.id;
      this.$store.dispatch("billContent/setStatusBill", id);
    },
  },
};
</script>

<style scoped>
.flex-row {
  display: flex;
}
</style>
