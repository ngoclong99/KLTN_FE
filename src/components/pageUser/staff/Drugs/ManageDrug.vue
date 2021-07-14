<template>
  <div>
    <button
      type="button"
      class="btn btn-outline-primary mt-3"
      @click="createAccountGroups"
    >
      <font-awesome-icon icon="user-plus" class="dropbtn" />
      Drugs
    </button>
    <AddDrugs :accepts="accepts" @changeAccepts="change"></AddDrugs>
    <div class="prescription__content mt-2">
      <DrugsTable
        :data="listDrugDeleteF"
        :columns="drugsContentTableColumns"
        :isBusy="isBusy"
      ></DrugsTable>
    </div>
  </div>
</template>

<script>
import AddDrugs from "../../../modal/Drugs/AddDrugs";
import DrugsTable from "../../../table/DrugsTable";
import TABLE_COLUMNS from "../../../../constants/table-column";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { DrugsTable, AddDrugs },
  data() {
    return {
      accepts: false,
    };
  },
  computed: {
    ...mapGetters({
      listDrugDeleteF: "drugContent/listDrugDeleteF",
      listAllDrug: "drugContent/listAllDrug",
      isBusy: "drugContent/isBusy",
    }),
    drugsContentTableColumns() {
      return TABLE_COLUMNS.STAFF_DRUGS_COLUMNS;
    },
  },
  methods: {
    createAccountGroups() {
      this.accepts = !this.accepts;
    },
    change(value) {
      value !== false ? (this.accepts = false) : (this.accepts = value);
    },
    ...mapActions({
      getListDrugDeleteF: "drugContent/getListDrugDeleteF",
      getListAllDrug: "drugContent/getListAllDrug",
    }),
  },
  created() {
    if (this.listDrugDeleteF == 0) this.getListDrugDeleteF();
    if (this.listAllDrug == 0) this.getListAllDrug();
  },
};
</script>

<style scoped lang="scss"></style>
