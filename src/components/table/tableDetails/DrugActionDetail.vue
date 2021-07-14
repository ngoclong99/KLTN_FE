<template>
  <b-card>
    <div class="row">
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">Drugs ID:</label>
          <b-form-input
            class="user-input"
            size="sm"
            disabled
            v-model="id"
          ></b-form-input>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">GroupID:</label>
          <b-form-input
            class="user-input"
            size="sm"
            disabled
            v-model="drugGroupId"
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
            name="drugName"
            v-validate="{
              required: true,
            }"
          ></b-form-input>
        </div>
        <label v-show="errors.has('drugName')" class="error alert-danger">{{
          errors.first("drugName")
        }}</label>
      </div>
      <div class="col-md-6 col-12">
        <div class="wrap">
          <label class="user-lable">Unit:</label>
          <b-form-input
            class="user-input"
            size="sm"
            v-model="unit"
            name="drugUnit"
            v-validate="{
              required: true,
              alpha_spaces: true,
            }"
          ></b-form-input>
        </div>
        <label v-show="errors.has('drugUnit')" class="error alert-danger">{{
          errors.first("drugUnit")
        }}</label>
      </div>
      <div class="col-12">
        <div class="wrap">
          <label class="user-lable mr-4">Ingredient:</label>
          <b-form-textarea
            v-model="ingredient"
            rows="2"
            name="drugIng"
            v-validate="{
              required: true,
            }"
          ></b-form-textarea>
        </div>
        <label v-show="errors.has('drugIng')" class="error alert-danger">{{
          errors.first("drugIng")
        }}</label>
      </div>
      <div class="col-12">
        <div class="wrap">
          <label class="user-lable mr-4">Drug Content:</label>
          <b-form-textarea
            v-model="drugContent"
            rows="2"
            name="drugContent"
            v-validate="{
              required: true,
            }"
          ></b-form-textarea>
        </div>
        <label v-show="errors.has('drugContent')" class="error alert-danger">{{
          errors.first("drugContent")
        }}</label>
      </div>
      <div class="col-12">
        <div class="wrap">
          <label class="user-lable mr-4">Description:</label>
          <b-form-textarea
            id="textarea"
            v-model="description"
            rows="3"
            name="drugDes"
            v-validate="{
              required: true,
            }"
          ></b-form-textarea>
        </div>
        <label v-show="errors.has('drugDes')" class="error alert-danger">{{
          errors.first("drugDes")
        }}</label>
      </div>
    </div>
    <div class="float-right">
      <b-button size="sm" class="mr-3" @click="changeGroupDrugs">
        Save
      </b-button>
      <b-button size="sm" @click="cancelEdit">Cancel</b-button>
    </div>
  </b-card>
</template>
<script>
import BasicTable from "../BasicTable";
import TABLE_COLUMNS from "../../../constants/table-column";
export default {
  components: {
    BasicTable,
  },
  data() {
    return {
      description: this.data.item.description,
      drugContent: this.data.item.drugContent,
      drugGroupId: this.data.item.drugGroupId,
      id: this.data.item.id,
      ingredient: this.data.item.ingredient,
      name: this.data.item.name,
      unit: this.data.item.unit,
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
      const list = this.data.item.drugs;
      return list;
    },
  },
  methods: {
    cancelEdit() {
      this.data.toggleDetails();
    },
    changeGroupDrugs() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return false;
        } else {
          this.$store.dispatch("drugContent/setDrugs", {
            description: this.description,
            drugContent: this.drugContent,
            drugGroupId: this.drugGroupId,
            id: this.id,
            ingredient: this.ingredient,
            name: this.name,
            unit: this.unit,
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
