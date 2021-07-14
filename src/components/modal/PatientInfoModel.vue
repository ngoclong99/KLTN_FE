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
              <div class="info-label">user name:</div>
              <p class="info-content">{{ user.userName }}</p>
            </div>
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">phone number:</div>
              <p class="info-content">{{ user.phoneNumber }}</p>
            </div>
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">full name:</div>
              <p class="info-content">{{ user.fullName }}</p>
            </div>
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">email:</div>
              <p class="info-content">{{ user.email }}</p>
            </div>
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">date of birth:</div>
              <p class="info-content">{{ user.dateOfBirth }}</p>
            </div>
            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">gender:</div>
              <p class="info-content">{{ user.gender ? "Male" : "FeMale" }}</p>
            </div>

            <div class="col-md-6 col-12 wrapper__content-info">
              <div class="info-label">Address:</div>
              <p class="info-content">{{ user.address }}</p>
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
        <h4>Information</h4>
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
    user: {
      type: Object,
      required: true,
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
