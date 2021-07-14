<template>
  <div class="mt-5">
    <div class="d-flex justify-content-between">
      <!-- Search -->
      <b-form-group>
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
          ></b-form-input>
          <b-input-group-append>
            <b-button variant="primary" :disabled="!filter" @click="filter = ''"
              >Clear</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <!-- Pagination -->
      <b-pagination
        v-model="currentPage"
        :per-page="perPage"
        pills
        :total-rows="rows"
        size="sm"
        aria-controls="chatbot-table"
      ></b-pagination>
    </div>
    <!-- Table -->
    <b-table
      @row-clicked="handleShowInfo"
      :filter="filter"
      hover
      striped
      id="chatbot-table"
      :per-page="perPage"
      :current-page="currentPage"
      :items="data"
      :fields="columns"
      small
      :busy.sync="isBusy"
      ref="table"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(action_temp)="row">
        <!-- button delete -->
        <font-awesome-icon
          id="popover-delete"
          icon="trash"
          class="icon-user mr-1"
          @click="showComfirmModal(row.item, row.index, $event.target)"
        />
        <!-- show info icon -->
        <b-popover target="popover-delete" triggers="hover" placement="top">
          Delete template
        </b-popover>
        <!-- button delete -->
        <font-awesome-icon
          id="popover-edit"
          icon="edit"
          class="icon-user mr-1"
          v-if="!isTemplateTable"
          @click="showEditModal(row.item, row.index, $event.target)"
        />
        <!-- show info edit -->
        <b-popover target="popover-edit" triggers="hover" placement="top">
          Edit template
        </b-popover>
      </template>

      <template #row-details>
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <ul>
                <li>gender : {{ infoZalo.user_gender }}</li>
                <li>name : {{ infoZalo.display_name }}</li>
                <li>
                  birth date :
                  {{
                    new Date(infoZalo.birth_date * 1000).toLocaleDateString()
                  }}
                </li>
              </ul></b-col
            >
            <b-col
              ><b-img fluid :src="infoZalo.avatar" alt="Image 1"></b-img
            ></b-col>
          </b-row>
        </b-container>
      </template>
    </b-table>
    <ConfirmModal
      :query="query"
      :title="title"
      :content="content"
    ></ConfirmModal>
    <CreateResponseModal></CreateResponseModal>
    <CreateSuggestionModal :query="query"></CreateSuggestionModal>
    <b-button
      class="btn_add"
      pill
      variant="primary"
      @click="showCreateModal"
      v-if="isTemplateTable"
      >Create</b-button
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ConfirmModal from "../modal/ConfirmModal";
import CreateResponseModal from "../modal/CreateResponseModal";
import CreateSuggestionModal from "../modal/staff/chatbot/CreateSuggestionModal";
export default {
  components: {
    ConfirmModal,
    CreateResponseModal,
    CreateSuggestionModal,
  },
  data() {
    return {
      filter: null,
      filterOn: [],
      perPage: 8,
      currentPage: 1,

      title: "",
      content: "",
      query: "",

      isTemplateTable: null,
    };
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    isBusy: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters("responseSuggestion", ["infoZalo"]),
    rows() {
      return this.data.length;
    },
  },
  methods: {
    ...mapActions("responseSuggestion", ["handleShowInfo"]),
    showComfirmModal(item, index, button) {
      this.query = item.query;
      this.title = `Do you want delete record ?`;
      this.content = `Message : '${item.query}'`;
      this.$root.$emit("bv::show::modal", "modal-1", "button");
    },
    showCreateModal() {
      this.$root.$emit("bv::show::modal", "modal-create", "button");
    },
    showEditModal(item, index, button) {
      this.query = item.query;
      this.$root.$emit("bv::show::modal", "modal-create-suggestion", "button");
    },
  },
  created() {
    switch (this.type) {
      case "TEMPLATE":
        this.isTemplateTable = true;
        break;
      case "SUGGESTION":
        this.isTemplateTable = false;
        break;
    }
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  display: inline-block;
}
@mixin icon {
  color: var(--bg-color-main);
  cursor: pointer;
  &:hover {
    color: black;
  }
}

.icon-user {
  @include icon();
}
.icon-edit {
  @include icon();
  margin-left: 10px;
}
.btn_add {
  position: absolute;
  right: 40px;
}
</style>
