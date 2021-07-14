<template>
  <div>
    <button
      type="button"
      class="btn btn-outline-primary mt-3"
      @click="createAccountDoctor"
    >
      <font-awesome-icon icon="user-plus" class="dropbtn" />
      Doctor
    </button>
    <CreateDoctor :accepts="accepts" @changeAccepts="change"></CreateDoctor>

    <div class="prescription__content">
      <AccountTable
        :data="ListAccountDoctor"
        :columns="doctorContentTableColumns"
        :isBusy="isBusy"
      ></AccountTable>
    </div>
  </div>
</template>

<script>
import CreateDoctor from "../../modal/CreateDoctor";
import AccountTable from "../../table/AccountTable";
import TABLE_COLUMNS from "../../..//constants/table-column";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AccountTable,
    CreateDoctor,
  },
  data() {
    return {
      accepts: false,
    };
  },
  computed: {
    ...mapGetters({
      ListAccountDoctor: "accountContent/ListAccountDoctor",
      ListAccountStaff: "accountContent/ListAccountDoctor",
      ListAccountPatient: "accountContent/ListAccountDoctor",
      isBusy: "accountContent/isBusy",
    }),

    doctorContentTableColumns() {
      return TABLE_COLUMNS.ACCOUNT_DOCTOR_COLUMNS;
    },
  },
  methods: {
    createAccountDoctor() {
      this.accepts = !this.accepts;
    },
    ...mapActions({
      getListAccountDoctor: "accountContent/getListAccountDoctor",
      getListAccountStaff: "accountContent/getListAccountStaff",
      getListAccountPatient: "accountContent/getListAccountPatient",
    }),
    change(value) {
      value !== false ? (this.accepts = false) : (this.accepts = value);
    },
  },
  created() {
    if (this.ListAccountDoctor.length === 0) this.getListAccountDoctor();
    if (this.ListAccountStaff.length === 0) this.getListAccountStaff();
    if (this.ListAccountPatient.length === 0) this.getListAccountPatient();
  },
};
</script>

<style scoped lang="scss"></style>
