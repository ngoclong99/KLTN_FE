<template>
  <div class="prescription">
    <h4>prescription</h4>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="group-prescription">
            <label class="prescription-key">Name:</label>
            <b-form-input
              disabled
              class="prescription-key-name"
              size="sm"
              :value="data.patientMR.fullName"
            ></b-form-input>
          </div>
        </div>
        <div class="col-6">
          <div class="group-prescription">
            <label class="prescription-key">Age:</label>
            <b-form-input
              disabled
              class="prescription-key-name"
              size="sm"
              :value="data.detailMRs[0].age"
            ></b-form-input>
          </div>
        </div>
        <div class="col-6">
          <div class="group-prescription">
            <label class="prescription-key">Weight:</label>
            <b-form-input
              disabled
              class="prescription-key-name"
              size="sm"
              :value="data.detailMRs[0].weight"
            ></b-form-input>
          </div>
        </div>
        <div class="col-6">
          <div class="group-prescription">
            <label class="prescription-key">Height:</label>
            <b-form-input
              disabled
              class="prescription-key-name"
              size="sm"
              :value="data.detailMRs[0].height"
            ></b-form-input>
          </div>
        </div>
        <div class="col-12">
          <div class="group-prescription">
            <label class="prescription-key">Diagnostic:</label>
            <b-form-input
              disabled
              class="prescription-key-name"
              size="sm"
              :value="data.detailMRs[0].diagnostic"
            ></b-form-input>
          </div>
        </div>
        <div class="col-12 height-auto">
          <div
            class="row mb-3"
            v-for="(durg, index) in listResultDrug"
            :key="index"
          >
            <div class="col-8">
              <span>{{ index + 1 }}.</span>
              <div class="prescription-1__info">
                <b-form-input
                  class="info-input-1 mb-2"
                  size="sm"
                  :value="durg.name"
                  disabled
                ></b-form-input>
                <b-form-textarea
                  :value="durg.description"
                  class="info-input-1"
                  debounce="500"
                  rows="5"
                  disabled
                  @input="changeDrugDes(durg.id, $event)"
                ></b-form-textarea>
              </div>
            </div>
            <div class="col-3 col-betw">
              <span
                >Amount:
                <b-form-input
                  class="input-2"
                  size="sm"
                  value="0"
                  @input="changeDrugAmount(durg.id, $event)"
                  name="amountNum"
                  v-validate="{
                    required: true,
                    max_value: 100,
                    min_value: 0,
                    regex: /^([0-9.,\s]+)$/i,
                  }"
                ></b-form-input>
                <label
                  v-show="errors.has('amountNum')"
                  class="error alert-danger"
                  >{{ errors.first("amountNum") }}</label
                >
              </span>
              <span
                >Unit:
                <b-form-input
                  class="input-2"
                  size="sm"
                  disabled
                  :value="durg.unit"
                ></b-form-input>
              </span>
              <span
                >Indication:
                <b-form-input
                  class="input-2"
                  size="sm"
                  disabled
                  :value="durg.drugContent"
                ></b-form-input>
              </span>
            </div>
            <div class="col-1">
              <font-awesome-icon
                icon="times"
                class="icon-3 icon-delete"
                @click="removeDrug(durg.id)"
              />
            </div>
            <!-- Thay đổi input -->
            <div class="col-12 mt-2">
              <b-form-textarea
                class="info-input-1"
                debounce="500"
                rows="2"
                @input="changeDrugDes(durg.id, $event)"
                placeholder="Advice "
              ></b-form-textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      listResultDrug: "drugContent/listResultDrug",
      getResultDrug: "drugContent/getResultDrug",
    }),
  },
  methods: {
    changeDrugDes(id, event) {
      const drug = this.getResultDrug(id);
      const value = event;
      Object.assign(drug, { advice: value });
      this.$store.commit("drugContent/editResultDrug", drug);
    },
    changeDrugAmount(id, event) {
      const drug = this.getResultDrug(id);
      const value = event;
      Object.assign(drug, { amount: value });
      this.$store.commit("drugContent/editResultDrug", drug);
    },
    removeDrug(id) {
      this.$store.commit("drugContent/removeDrug", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-delete{
  cursor: pointer;
}
.col-betw {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.prescription {
  box-shadow: 2px 3px 5px var(--bg-color-main);
  border: 1px solid var(--bg-color-main);
  h4 {
    text-transform: capitalize;
    display: block;
    text-align: center;
    font-weight: 700;
    color: var(--bg-color-main);
  }
  .group-prescription {
    display: flex;
    margin-bottom: 10px;
    .prescription-key {
      min-width: 100px;
    }
    .prescription-value {
      flex: 1;
    }
  }
  .height-auto {
    max-height: 280px;
    overflow: auto;
  }
}
</style>
