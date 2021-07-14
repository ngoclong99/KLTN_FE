<template>
  <div>
    <button
      type="button"
      class="btn btn-outline-primary mt-3"
      @click="createAccountPatient"
    >
      <font-awesome-icon icon="user-plus" class="dropbtn" />
      Patient
    </button>
    <CreateAccountPatient
      :accepts="accepts"
      @changeAccepts="change"
    ></CreateAccountPatient>

    <div class="prescription__content">
      <AccountTable
        :data="ListAccountPatient"
        :columns="doctorContentTableColumns"
        :isBusy="isBusy"
      ></AccountTable>
    </div>
  </div>
</template>

<script>
import CreateAccountPatient from "../../modal/CreateAccountPatient";
import AccountTable from "../../table/AccountTable";
import TABLE_COLUMNS from "../../..//constants/table-column";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AccountTable,
    CreateAccountPatient,
  },
  data() {
    return {
      accepts: false,
    };
  },
  computed: {
    ...mapGetters({
      ListAccountDoctor: "accountContent/ListAccountDoctor",
      ListAccountStaff: "accountContent/ListAccountStaff",
      ListAccountPatient: "accountContent/ListAccountPatient",
      isBusy: "accountContent/isBusy",
    }),

    doctorContentTableColumns() {
      return TABLE_COLUMNS.ACCOUNT_PATIENT_COLUMNS;
    },
  },
  methods: {
    createAccountPatient() {
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
