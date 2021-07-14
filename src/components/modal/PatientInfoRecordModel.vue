<template>
  <div>
    <b-modal
      hide-footer
      scrollable
      size="lg"
      v-model="showModal"
      ok-only
      @ok="handleUser"
      @hidden="handleUser"
    >
      <div class="wrapper">
        <div class="wrapper__content container">
          <div class="row">
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">phone number:</div>
              <p class="info-content">{{ detailMRs.phoneNumber }}</p>
            </div>
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">full name:</div>
              <p class="info-content">{{ data.patientMR.fullName }}</p>
            </div>
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">email:</div>
              <p class="info-content">{{ data.patientMR.email }}</p>
            </div>
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">gender:</div>
              <p class="info-content">
                {{ data.patientMR.gender ? "FeMale" : "Male" }}
              </p>
            </div>
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">Title:</div>
              <p class="info-content">{{ data.title }}</p>
            </div>
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">Diagnostic:</div>
              <p class="info-content">{{ detailMRs.diagnostic }}</p>
            </div>
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">Width:</div>
              <p class="info-content">{{ detailMRs.weight }}</p>
            </div>
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">Height:</div>
              <p class="info-content">{{ detailMRs.height }}</p>
            </div>
            <div class="col-12 wrapper__content-info">
              <div class="info-label">Note:</div>
              <p class="info-content">{{ detailMRs.note }}</p>
            </div>
          </div>
          <div class="row justify-content-end">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="handleUser"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <template #modal-title>
        <h4>Details</h4>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    sendShowModel: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    detailMRs() {
      return this.data.detailMRs[0];
    },
  },
  data() {
    return {
      showModal: this.sendShowModel,
    };
  },
  methods: {
    handleUser() {
      this.showModal = false;
      this.$emit("changeUser", this.showModal);
    },
  },
  watch: {
    sendShowModel() {
      this.showModal = this.sendShowModel;
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  .wrapper__content {
    .wrapper__content-info {
      margin-bottom: 10px;
      .info-label {
        font-weight: bold;
        font-size: 18px;
        text-transform: capitalize;
        color: var(--bg-color-main);
      }
    }
  }
}
</style>
