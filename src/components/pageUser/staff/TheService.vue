<template>
  <div class="container-fluid">
    <button
      type="button"
      class="btn btn-outline-primary mt-3"
      @click="createAccountPatient"
    >
      <font-awesome-icon icon="user-plus" class="dropbtn" />
      Service
    </button>

    <CreateService :accepts="accepts" @changeAccepts="change"></CreateService>

    <div class="prescription__content">
      <ServiceTable 
        :data="allListService"
        :columns="serviceContentTableColumns"
        :isBusy="isBusy"
      ></ServiceTable>
    </div>
  </div>
</template>

<script>
import CreateService from "../../modal/service/CreateServiceModal";
import ServiceTable from "../../table/ServiceTable";
import TABLE_COLUMNS from "../../..//constants/table-column";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    ServiceTable,
    CreateService,
  },
  data() {
    return {
      accepts: false,
    };
  },
  computed: {
    ...mapGetters({
      allListService: "serviceContent/allListService",
      isBusy: "serviceContent/isBusy",
    }),
    serviceContentTableColumns() {
      return TABLE_COLUMNS.STAFF_SERVICE_COLUMNS;
    },
  },
  methods: {
    createAccountPatient() {
      this.accepts = !this.accepts;
    },
    change(value) {
      value !== false ? (this.accepts = false) : (this.accepts = value);
    },
    ...mapActions({
      getAllListService: "serviceContent/getAllListService",
    }),
  },
  created() {
    if (this.allListService.length === 0) this.getAllListService();
  },
};
</script>

<style scoped lang="scss"></style>
