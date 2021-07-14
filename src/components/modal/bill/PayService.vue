<template>
  <div class="row">
    <div class="col-md-5 col-12">
      <div class="prescription height-service">
        <h4>Payment</h4>
        <div
          class="service"
          v-for="(service, index) in ListService"
          :key="index"
          @click="addService(service)"
        >
          <span>{{ service.name }}</span>
          <span class="float-right">
            {{
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                currencySign: "accounting",
              }).format(service.fees)
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-7 col-12">
      <div class="prescription">
        <h4>Bill</h4>
        <div class="container">
          <CreateBillTable
            class="height-service"
            :data="filterStaffFinalService"
            :columns="patientDetailsTableColumns"
            :prescription="data"
          >
          </CreateBillTable>
          <div>
            <p class="float-right mr-3">
              Total:
              <span>{{
                statusBill
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      currencySign: "accounting",
                    }).format(totalMonney - totalMonney * 0.3)
                  : new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      currencySign: "accounting",
                    }).format(totalMonney)
              }}</span>
            </p>
          </div>
          <div class="check">
            <b-form-group label="Health Insurance" @change="sendListService">
              <b-form-radio
                v-model="statusBill"
                name="some-radios"
                :value="true"
                >Yes</b-form-radio
              >
              <b-form-radio
                v-model="statusBill"
                name="some-radios"
                :value="false"
                >No</b-form-radio
              >
            </b-form-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateBillTable from "../../table/CreateBillTable";
import TABLE_COLUMNS from "../../../constants/table-column";
import { mapGetters } from "vuex";

export default {
  components: { CreateBillTable },
  data() {
    return {
      statusBill: false,
      staffService: [],
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totalMonney() {
      var monney = 0;
      this.filterStaffFinalService.forEach((item) => {
        monney += item.fees;
      });
      return monney;
    },
    ...mapGetters({
      ListResultService: "billContent/ListRecordService",
      ListService: "billContent/ListService",
    }),
    patientDetailsTableColumns() {
      return TABLE_COLUMNS.STAFF_RESULT_SERVICE_COLUMNS;
    },
    // Từ ListResultService - > filterRecordService
    filterRecordService() {
      const list = this.ListResultService.map((element) => {
        return element.detailMRs[0].detailServiceUsed;
      });
      return list[0];
    },
    // Từ ( filterRecordService, ListService ) -> DS dịch vụ BS selecter
    filterFinalService() {
      const record = this.filterRecordService;
      const service = this.ListService;
      let relust = record.map((e, i) => {
        const temp = service.find((element) => element.id === e.service.id);
        return temp;
      });
      return relust;
    },
    filterStaffFinalService() {
      const staff = this.staffService;
      const doctor = this.filterFinalService;
      const newList = staff.concat(doctor);
      return Array.from(new Set(newList));
    },
  },
  methods: {
    sendListService() {
      const statusbill = this.statusBill;
      const service = this.filterStaffFinalService;
      this.$emit("reciveService", {
        statusbill: statusbill,
        service: service,
      });
    },
    addService(service) {
      this.staffService.push(service);
    },
  },
  watch: {
    filterStaffFinalService() {
      const status = this.statusBill;
      const service = this.filterStaffFinalService;
      this.$emit("reciveService", {
        status: status,
        service: service,
      });
    },
    statusBill() {
      const status = this.statusBill;
      const service = this.filterStaffFinalService;
      this.$emit("reciveService", {
        status: status,
        service: service,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
}
.service {
  max-height: 400px;
  overflow: auto;
  background-color: var(--bg-color-main);
  margin: 10px;
  padding: 8px 16px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: var(--bg-color-main-hover);
  }
}
.height-service {
  max-height: 350px;
  overflow: auto;
}
</style>
