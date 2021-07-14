<template>
  <div>
    <div class="wrapper__prescription container-fluid" v-if="showModal">
      <div class="row">
        <div class="col-lg-5 col-md-5 col-12">
          <DrugGroup :data="this.data"></DrugGroup>
        </div>
        <div class="col-lg-7 col-md-7 col-12">
          <Prescription :data="this.data"></Prescription>
          <div class="mt-3 mb-5">
            <button
              type="button"
              class="btn btn-outline-primary mr-3"
              @click="createPrescription"
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
import Prescription from "../pageUser/doctor/examination/Prescription";
import DrugGroup from "../pageUser/doctor/examination/DrugGroup";
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
    Prescription,
    DrugGroup,
  },
  data() {
    return {
      showModal: this.sendShowModel,
    };
  },
  computed: {
    ...mapGetters({ isLoading: "drugContent/isLoading" }),
  },
  methods: {
    handleUser() {
      this.showModal = false;
      this.$emit("changeUser", this.showModal);
      this.$store.commit("drugContent/resetListResultDrug");
    },
    createPrescription() {
      const prescription = this.data;
      this.$store.commit("recordContent/setIsLoadingPrescription", {
        isLoadingRecord: true,
        prescription: prescription,
      });
      this.$store.dispatch("drugContent/createPrescription", {
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
