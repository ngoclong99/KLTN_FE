<template>
  <div class="container-fluid">
    <div class="row">
      <div class="title-top">Response Tempates</div>
      <MessageNotify :message="message" :type="type"></MessageNotify>
      <ResponseTemplatesTable
        class="col-12"
        :data="listResponseTemplates"
        :columns="delvContentTableColumns"
        :isBusy="isBusy"
        type="TEMPLATE"
      ></ResponseTemplatesTable>
    </div>
  </div>
</template>

<script>
import ResponseTemplatesTable from "../../../table/ResponseTemplatesTable";
import TABLE_COLUMNS from "../../../../constants/table-column";
import { mapGetters, mapActions } from "vuex";
import { EventBus } from "../../../EventBus";
import MessageNotify from "../../../MessageNotify";
export default {
  components: {
    ResponseTemplatesTable,
    MessageNotify,
  },
  computed: {
    ...mapGetters("responseTemplate", [
      "listResponseTemplates",
      "isBusy",
      "message",
      "type",
    ]),
    delvContentTableColumns() {
      return TABLE_COLUMNS.TEMPLATE_RESPONSE_COLUMNS;
    },
  },
  methods: {
    ...mapActions("responseTemplate", [
      "getListResponseTemplates",
      "deleteResponseTemplate",
      "createResponseTemplate",
    ]),
  },
  created() {
    if (this.listResponseTemplates.length === 0) {
      this.getListResponseTemplates();
    }
    EventBus.$on("handleDelete", (query) => {
      this.deleteResponseTemplate(query);
    });
    EventBus.$on("handleCreateResponse", (template) => {
      this.createResponseTemplate(template);
    });
  },
};
</script>

<style lang="scss" scoped>
.title-top {
  position: relative;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 36px;
  font-weight: bold;
  color: var(--bg-color-main);
  padding: 8px 32px;
  background-color: var(--bg-color-title);
  color: white;
  border-radius: 10px;
}
</style>
