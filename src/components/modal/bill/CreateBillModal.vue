<template>
  <div>
    <div
      class="wrapper__prescription container-fluid"
      v-if="showModal || this.data.loadingBill"
    >
      <div class="row">
        <div class="col-12">
          <PayService
            :data="this.data"
            @reciveService="reciveService"
          ></PayService>
          <div class="mt-3 mb-5 float-right">
            <button
              type="button"
              class="btn btn-outline-primary mr-3"
              @click="createBill"
              :disabled="this.data.loadingBill"
            >
              <font-awesome-icon
                v-show="this.data.loadingBill"
                icon="spinner"
                class="icon-form-m"
                spin
              />
              Create
            </button>
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PayService from "./PayService";
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
  components: {
    PayService,
  },
  data() {
    return {
      showModal: this.sendShowModel,
      listReciveService: [],

      healthInsurance: false,
      medicalRecordId: this.data.id,
      patientId: this.data.patientMR.userName,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "billContent/isLoading",
    }),
  },
  methods: {
    handleUser() {
      this.showModal = false;
      this.$emit("changeUser", this.showModal);
      this.$store.commit("serviceContent/resetListResultService");
    },
    createBill() {
      const bill = this.data;
      this.$store.dispatch("billContent/createBill", {
        healthInsurance: this.healthInsurance,
        listServiceUsed: this.listReciveService,
        medicalRecordId: this.medicalRecordId,
        patientId: this.patientId,
        router: this.$router,
        bill: bill,
      });
    },
    reciveService(payload) {
      const newL = payload.service.map((item) => {
        return {
          serviceId: item.id,
        };
      });
      this.healthInsurance = payload.status;
      this.listReciveService = newL;
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
.wrapper__prescription {
  position: absolute;
  top: 10px;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 10;
  background-color: white;
}
</style>
