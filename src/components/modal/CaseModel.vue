<template>
  <div>
    <b-modal
      scrollable
      size="lg"
      v-model="show"
      ok-only
      title="Details"
      @ok="handleOk"
      @hidden="handleOk"
    >
      <div class="row">
        <div class="input-group col-6">
          <div class="input-group-prepend">
            <button class="btn" type="button">ID:</button>
          </div>
          <input
            type="text"
            :value="data.id"
            class="form-control"
            placeholder=""
            disabled
          />
        </div>
        <div class="input-group col-6">
          <div class="input-group-prepend">
            <button class="btn" type="button">Doctor:</button>
          </div>
          <input
            type="text"
            :value="data.detailMRs[0].doctorDMR.fullName"
            class="form-control"
            placeholder=""
            disabled
          />
        </div>
        <div class="input-group col-6">
          <div class="input-group-prepend">
            <button class="btn" type="button">Patient:</button>
          </div>
          <input
            type="text"
            :value="data.detailMRs[0].patientName"
            class="form-control"
            placeholder=""
            disabled
          />
        </div>
        <div class="input-group col-6">
          <div class="input-group-prepend">
            <button class="btn" type="button">Date:</button>
          </div>
          <input
            type="text"
            :value="date"
            class="form-control"
            placeholder=""
            disabled
          />
        </div>
        <div class="input-group col-6">
          <div class="input-group-prepend">
            <button class="btn" type="button">Diagnostic:</button>
          </div>
          <input
            type="text"
            :value="data.detailMRs[0].diagnostic"
            class="form-control"
            placeholder=""
            disabled
          />
        </div>
        <div class="input-group col-6">
          <div class="input-group-prepend">
            <button class="btn" type="button">Title:</button>
          </div>
          <input
            type="text"
            :value="data.title"
            class="form-control"
            placeholder=""
            disabled
          />
        </div>
        <div class="input-group col-6">
          <div class="input-group-prepend">
            <button class="btn" type="button">Severity:</button>
          </div>
          <input
            type="text"
            :value="data.severity"
            class="form-control"
            placeholder=""
            disabled
          />
        </div>
        <div class="input-group col-6">
          <div class="input-group-prepend">
            <button class="btn" type="button">Year:</button>
          </div>
          <input
            type="text"
            :value="data.yearOfIllness"
            class="form-control"
            placeholder=""
            disabled
          />
        </div>

      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      show: this.accepts,
      date: moment(this.data.createdAt).format("DD-MM-YYYY"),
    };
  },
  props: {
    accepts: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleOk() {
      this.show = false;
      this.$emit("changeAccepts", this.show);
    },
  },
  watch: {
    accepts() {
      this.show = this.accepts;
    },
  },
};
</script>

<style></style>
