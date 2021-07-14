<template>
  <div>
    <b-modal
      hide-footer
      scrollable
      size="lg"
      v-model="show"
      ok-only
      title="Create"
      @ok="handleOk"
      @hidden="handleOk"
    >
      <div class="row">
        <div class="col-lg-6 col-12">
          <b-form-group label="DrugGroupID:" label-for="input-1">
            <b-form-select
              v-model="drugGroupId"
              name="groupID"
              :options="listGroupDrug"
              v-validate="{
                required: true,
              }"
            ></b-form-select>
          </b-form-group>
          <label v-show="errors.has('groupID')" class="error alert-danger">{{
            errors.first("groupID")
          }}</label>
        </div>
        <div class="col-lg-6 col-12">
          <b-form-group label="Drug Name:" label-for="input-1">
            <b-form-input
              type="text"
              v-model="name"
              name="drugName"
              v-validate="{
                required: true,
              }"
            ></b-form-input
          ></b-form-group>
          <label v-show="errors.has('drugName')" class="error alert-danger">{{
            errors.first("drugName")
          }}</label>
        </div>
        <div class="col-lg-6 col-12">
          <b-form-group label="Ingredient:" label-for="input-1">
            <b-form-input
              type="text"
              v-model="ingredient"
              name="drugIng"
              v-validate="{
                required: true,
              }"
            ></b-form-input
          ></b-form-group>
          <label v-show="errors.has('drugIng')" class="error alert-danger">{{
            errors.first("drugIng")
          }}</label>
        </div>
        <div class="col-lg-6 col-12">
          <b-form-group label="Unit:" label-for="input-1">
            <b-form-input
              type="text"
              v-model="unit"
              name="drugUnit"
              v-validate="{
                required: true,
                alpha_spaces: true,
              }"
            ></b-form-input
          ></b-form-group>
          <label v-show="errors.has('drugUnit')" class="error alert-danger">{{
            errors.first("drugUnit")
          }}</label>
        </div>
        <div class="col-12">
          <b-form-group label="Drug Content:" label-for="input-1">
            <b-form-textarea
              v-model="drugContent"
              rows="2"
              name="drugContent"
              v-validate="{
                required: true,
              }"
            ></b-form-textarea>
          </b-form-group>
          <label
            v-show="errors.has('drugContent')"
            class="error alert-danger"
            >{{ errors.first("drugContent") }}</label
          >
        </div>
        <div class="col-12">
          <b-form-group label="Description:" label-for="input-1">
            <b-form-textarea
              v-model="description"
              rows="2"
              name="drugDes"
              v-validate="{
                required: true,
              }"
            ></b-form-textarea>
          </b-form-group>
          <label v-show="errors.has('drugDes')" class="error alert-danger">{{
            errors.first("drugDes")
          }}</label>
        </div>
      </div>
      <button
        type="button"
        class="btn btn-outline-primary mr-3"
        @click="createDrugs"
        :disabled="isLoading"
      >
        <font-awesome-icon
          v-show="isLoading"
          icon="spinner"
          class="icon-form-m"
          spin
        />
        Create
      </button>
      <button type="button" class="btn btn-outline-primary" @click="handleOk">
        Cancel
      </button>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      show: this.accepts,
      drugGroupId: null,
      ingredient: "",
      name: "",
      unit: "",
      description: "",
      drugContent: "",
    };
  },
  props: {
    accepts: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      isLoading: "drugContent/isLoading",
      listAllDrug: "drugContent/listAllDrug",
    }),
    listGroupDrug() {
      let listID = this.listAllDrug;
      const arr = listID.map((item) => {
        return {
          value: item.id,
          text: item.name,
        };
      });
      return arr;
    },
  },
  methods: {
    handleOk() {
      this.show = false;
      this.$emit("changeAccepts", this.show);
      this.description = "";
      this.drugContent = "";
      this.drugGroupId = "";
      this.ingredient = "";
      this.name = "";
      this.unit = "";
    },
    createDrugs() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.$store.commit("drugContent/setIsLoading", false);
        } else {
          this.$store.dispatch("drugContent/createDrugs", {
            description: this.description,
            drugContent: this.drugContent,
            drugGroupId: this.drugGroupId,
            ingredient: this.ingredient,
            name: this.name,
            unit: this.unit,
          });
        }
      });
    },
  },
  watch: {
    accepts() {
      this.show = this.accepts;
    },
    isLoading() {
      if (this.isLoading == false) this.handleOk();
    },
  },
};
</script>

<style scoped lang="scss"></style>
