<template>
  <b-container fluid class="bv-example-row">
    <b-row><div class="title-top">Answer Suggestions</div> </b-row>
    <b-row>
      <MessageNotify :message="message" :type="type"></MessageNotify>
      <b-col cols="4" sm="3"><ListAccountZalo></ListAccountZalo></b-col>
      <b-col cols="8" sm="9">
        <ResponseTemplatesTable
          :data="listResponseSuggestions"
          :columns="delvContentTableColumns"
          :isBusy="isBusy"
          type="SUGGESTION"
        ></ResponseTemplatesTable
      ></b-col>
    </b-row>
  </b-container>
</template>

<script>
import ListAccountZalo from "./ListAccountZalo";
import ResponseTemplatesTable from "../../../table/ResponseTemplatesTable";
import TABLE_COLUMNS from "../../../../constants/table-column";
import { mapGetters, mapActions } from "vuex";
import MessageNotify from "../../../MessageNotify";
import { EventBus } from "../../../EventBus";
export default {
  components: {
    ResponseTemplatesTable,
    MessageNotify,
    ListAccountZalo,
  },
  computed: {
    ...mapGetters("responseSuggestion", [
      "listResponseSuggestions",
      "isBusy",
      "message",
      "type",
    ]),
    delvContentTableColumns() {
      return TABLE_COLUMNS.RESPONSE_SUGGESTIONS_COLUMNS;
    },
  },
  methods: {
    ...mapActions("responseSuggestion", [
      "getListResponseSuggestions",
      "deleteResponseSuggestion",
      "updateResponseSuggestion",
    ]),
  },
  created() {
    if (this.listResponseSuggestions.length === 0) {
      this.getListResponseSuggestions();
    }
    EventBus.$on("handleCreateSuggestion", (template) => {
      this.updateResponseSuggestion(template);
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
