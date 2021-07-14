<template>
  <div>
    <button
      type="button"
      class="btn btn-outline-primary mt-3"
      @click="createAccountGroups"
    >
      <font-awesome-icon icon="user-plus" class="dropbtn" />
      Group Drugs
    </button>
    <AddGroups :accepts="accepts" @changeAccepts="change"></AddGroups>
    <div class="prescription__content mt-2">
      <GroupDrugsTable
        :data="listAllDrug"
        :columns="doctorContentTableColumns"
        :isBusy="isBusy"
      ></GroupDrugsTable>
    </div>
  </div>
</template>

<script>
import AddGroups from "../../../modal/Drugs/AddGroups";
import GroupDrugsTable from "../../../table/GroupDrugsTable";
import TABLE_COLUMNS from "../../../../constants/table-column";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { GroupDrugsTable, AddGroups },
  data() {
    return {
      accepts: false,
    };
  },
  computed: {
    ...mapGetters({
      listAllDrug: "drugContent/listAllDrug",
      isBusy: "drugContent/isBusy",
    }),
    doctorContentTableColumns() {
      return TABLE_COLUMNS.STAFF_GROUP_DRUGS_COLUMNS;
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
      getListAllDrug: "drugContent/getListAllDrug",
    }),
  },
  created() {
    if (this.listAllDrug == 0) this.getListAllDrug();
  },
};
</script>

<style scoped lang="scss"></style>
