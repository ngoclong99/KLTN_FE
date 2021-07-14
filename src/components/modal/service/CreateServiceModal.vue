<template>
  <div>
    <b-modal
      hide-footer
      scrollable
      size="ms"
      v-model="show"
      ok-only
      title="Create"
      @ok="handleOk"
      @hidden="handleOk"
    >
      <div class="row">
        <div class="col-lg-6 col-12">
          <b-form-group label="Name:" label-for="input-1">
            <b-form-input
              type="text"
              v-model="name"
              name="serviceName"
              v-validate="{
                required: true,
              }"
            ></b-form-input
          ></b-form-group>
          <label
            v-show="errors.has('serviceName')"
            class="error alert-danger"
            >{{ errors.first("serviceName") }}</label
          >
        </div>
        <div class="col-lg-6 col-12">
          <b-form-group label="Fees:" label-for="input-1">
            <b-form-input
              type="text"
              v-model="fees"
              name="serviceFees"
              v-validate="{
                required: true,
                regex: '[+-]?([0-9]*[.])?[0-9]+',
              }"
            ></b-form-input
          ></b-form-group>
          <label
            v-show="errors.has('serviceFees')"
            class="error alert-danger"
            >{{ errors.first("serviceFees") }}</label
          >
        </div>
      </div>
      <button
        type="button"
        class="btn btn-outline-primary mr-3"
        @click="createService"
        :disabled="isLoadingCreateService"
      >
        <font-awesome-icon
          v-show="isLoadingCreateService"
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
      fees: "",
      name: "",
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
      isLoadingCreateService: "serviceContent/isLoadingCreateService",
    }),
  },
  methods: {
    handleOk() {
      this.show = false;
      this.$emit("changeAccepts", this.show);
      this.fees = "";
      this.name = "";
    },
    createService() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return false;
        } else {
          this.$store.commit("serviceContent/setIsLoadingCreateService", true);
          this.$store.dispatch("serviceContent/createService", {
            fees: this.fees,
            name: this.name,
          });
        }
      });
    },
  },
  watch: {
    accepts() {
      this.show = this.accepts;
    },
    isLoadingCreateService() {
      if (this.isLoadingCreateService == false) this.handleOk();
    },
  },
};
</script>

<style scoped lang="scss"></style>
