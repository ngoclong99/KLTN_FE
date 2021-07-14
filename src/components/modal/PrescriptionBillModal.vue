<template>
  <div>
    <div class="wrapper__prescription container-fluid" v-if="showModal">
      <div class="row">
        <div class="col-lg-4 col-md-4 col-12">
          <AddService :data="this.data"></AddService>
        </div>
        <div class="col-lg-8 col-md-8 col-12">
          <PrescriptionService :data="this.data"></PrescriptionService>
          <div class="mt-3 mb-5">
            <button
              type="button"
              class="btn btn-outline-primary mr-3"
              @click="createService"
              :disabled="data.isLoadingRecord"
            >
              <font-awesome-icon
                icon="spinner"
                class="icon-form-m"
                spin
                v-show="data.isLoadingRecord"
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
import PrescriptionService from "../pageUser/doctor/examination/PrescriptionService";
import AddService from "../pageUser/doctor/examination/AddService";
import { mapGetters } from "vuex";
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
    PrescriptionService,
    AddService,
  },
  data() {
    return {
      showModal: this.sendShowModel,
    };
  },
  computed: {
    ...mapGetters({
      ListFinalService: "serviceContent/ListFinalService",
      isLoading: "serviceContent/isLoading",
    }),
  },
  methods: {
    handleUser() {
      this.showModal = false;
      this.$emit("changeUser", this.showModal);
      this.$store.commit("serviceContent/resetListResultService");
    },
    createService() {
      const list = this.ListFinalService;
      const prescription = this.data;
      this.$store.dispatch("serviceContent/createPayService", {
        router: this.$router,
        data: list,
        prescription: prescription,
      });
      this.$store.commit("recordContent/setIsLoadingPrescription", {
        isLoadingRecord: true,
        prescription: prescription,
      });
    },
  },
  watch: {
    sendShowModel() {
      this.showModal = this.sendShowModel;
    },
    isLoading() {
      if (this.isLoading == false) this.handleUser();
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
