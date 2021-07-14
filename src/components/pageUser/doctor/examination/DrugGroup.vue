<template>
  <div class="row">
    <div class="loca-left">
      <div class="wrap-name">
        Drug Group
      </div>
      <div class="wrap-content">
        <div
          class="group-drug"
          v-for="(drugID, index) in listAllDrug"
          :key="index"
          @click="getGroupID(drugID.id)"
        >
          {{ drugID.name }}
        </div>
      </div>
    </div>
    <div class="loca-right">
      <div class="wrap-name">
        Drug Name
      </div>
      <div class="wrap-content">
        <div
          class="group-drug"
          v-for="(drug, index) in listDrugsDeleteFalse"
          :key="index"
          @click="sendDrug(drug)"
        >
          {{ drug.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listDrugsShow: [],
    };
  },
  computed: {
    ...mapGetters({
      listAllDrug: "drugContent/listAllDrug",
      getListDrugID: "drugContent/getListDrugID",
      listResultDrug: "drugContent/listResultDrug",
    }),
    listDrugsDeleteFalse() {
      return this.listDrugsShow.filter((item) => {
        return item.deleted == false;
      });
    },
  },
  methods: {
    getGroupID(id) {
      const listDrugs = this.getListDrugID(id);
      this.listDrugsShow = listDrugs;
    },
    sendDrug(drug) {
      const id = this.data.detailMRs[0].id;
      Object.assign(drug, { detailMRId: id, amount: 0 });
      this.$store.commit("drugContent/listResultDrug", drug);
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.loca-left {
  width: 40%;
  border-radius: 2px;
  text-indent: 15px;
  border: 1px solid var(--bg-color-main);
}
.loca-right {
  flex: 1;
  border-radius: 2px;
  text-indent: 15px;
  margin-left: 10px;
  border: 1px solid var(--bg-color-main);
}
.wrap-name {
  background-color: var(--bg-color-main);
  color: white;
  font-weight: 600;
  border-radius: 2px;
}
.wrap-content {
  max-height: 300px;
  overflow: auto;
  .group-drug {
    background-color: silver;
    padding: 5px 0px;
    margin: 5px 5px;
    cursor: pointer;
    border-radius: 2px;
    &:hover {
      background-color: var(--bg-color-main-hover);
    }
  }
}
</style>
