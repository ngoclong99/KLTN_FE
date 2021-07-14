<template>
  <div class="row">
    <div class="loca-left">
      <div class="wrap-name">
        Service
      </div>
      <div class="wrap-content">
        <div
          class="group-drug"
          v-for="(service, index) in ListService"
          :key="index"
          @click="addService(service)"
        >
          {{ service.name }}
        </div>
      </div>
    </div>
    <div class="loca-right">
      <div class="wrap-name">
        Service for You
      </div>
      <div class="wrap-content">
        <div
          class="group-drug"
          v-for="(service, index) in ListResultService"
          :key="index"
        >
          {{ service.name }}
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
    return {};
  },
  computed: {
    ...mapGetters({
      ListService: "serviceContent/ListService",
      ListResultService: "serviceContent/ListResultService",
    }),
  },
  methods: {
    addService(value) {
      const service = value;
      const detailMRId = this.data.detailMRs[0].id;
      Object.assign(service, { detailMRId: detailMRId, description: "" });
      this.$store.commit("serviceContent/ListResultService", service);
    },
  },
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
