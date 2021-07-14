<template>
  <b-card>
    <div class="row">
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">ID:</label>
          <b-form-input
            disabled
            class="user-input"
            size="sm"
            v-model="id"
          ></b-form-input>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">Name:</label>
          <b-form-input
            class="user-input"
            size="sm"
            v-model="name"
            name="groupName"
            v-validate="{
              required: true,
            }"
          ></b-form-input>
        </div>
        <label v-show="errors.has('groupName')" class="error alert-danger">{{
          errors.first("groupName")
        }}</label>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">CreatedBy:</label>
          <b-form-input
            class="user-input"
            size="sm"
            disabled
            v-model="data.item.createdBy"
          ></b-form-input>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">CreatedBy:</label>
          <b-form-input
            class="user-input"
            size="sm"
            disabled
            v-model="createdAt"
          ></b-form-input>
        </div>
      </div>
      <div class="col-12">
        <div class="">
          <BasicTable :data="listDrugs" :columns="groupsDetailsTableColumns">
          </BasicTable>
        </div>
      </div>
    </div>
    <div class="float-right">
      <b-button size="sm" class="mr-3" @click="changeGroupDrugs">
        <font-awesome-icon
          v-show="isLoading"
          icon="spinner"
          class="icon-form-m"
          spin
        />
        Save
      </b-button>
      <b-button size="sm" @click="cancelEdit">Cancel</b-button>
    </div>
  </b-card>
</template>
<script>
import moment from "moment";
import BasicTable from "../BasicTable";
import TABLE_COLUMNS from "../../../constants/table-column";
import { mapGetters } from "vuex";
export default {
  components: {
    BasicTable,
  },
  data() {
    return {
      createdAt: moment(this.data.item.createdAt).format("DD-MMM-YYYY"),
      id: this.data.item.id,
      name: this.data.item.name,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    groupsDetailsTableColumns() {
      return TABLE_COLUMNS.STAFF_GROUP_DETAIL_DRUGS_COLUMNS;
    },
    listDrugs() {
      var list = this.data.item.drugs;
      var newL = list.filter((item) => {
        return item.deleted === false;
      });
      return newL;
    },
    ...mapGetters({
      isLoading: "drugContent/isLoading",
    }),
  },
  methods: {
    cancelEdit() {
      this.data.toggleDetails();
    },
    changeGroupDrugs() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.$store.commit("drugContent/setIsLoading", false);
        } else {
          this.$store.dispatch("drugContent/setGroupDrugs", {
            id: this.id,
            name: this.name,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  .user-lable {
    font-size: 14px;
  }
  .user-input {
    max-width: 250px;
  }
}
.wrap-status {
  display: flex;
}
</style>
