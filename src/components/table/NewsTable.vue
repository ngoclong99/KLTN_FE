<template>
  <!-- Chưa xong -->
  <div class="mt-2">
    <div class="d-flex justify-content-between">
      <!-- Search -->
      <b-form-group>
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
            :busy="isBusy"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
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
        aria-controls="line-table"
      ></b-pagination>
    </div>
    <!-- Table -->
    <b-table
      :filter="filter"
      striped
      hover
      id="line-table"
      :per-page="perPage"
      :current-page="currentPage"
      :items="data"
      :fields="columns"
      small
      :busy="isBusy"
    >
      <!--ACtion CELL -->
      <template #cell(newsAction)="row">
        <div class="flex-row">
          <ServiceActionCell :data="row.item"></ServiceActionCell>
          <font-awesome-icon
            v-show="row.item.remove"
            icon="spinner"
            class="icon-remove"
            spin
          />
          <font-awesome-icon
            v-show="!row.item.remove"
            icon="trash-alt"
            class="icon-remove"
            @click="removeNews(row.item)"
          />
          <font-awesome-icon
            v-show="row.item.loading"
            icon="spinner"
            class="icon-remove"
            spin
          />
          <b-form-checkbox
            v-show="!row.item.loading"
            switch
            @change="changeStatus(row.item)"
            v-model="row.item.status"
          ></b-form-checkbox>
        </div>
      </template>
      <!-- Detail Table Dow-->
      <template #row-details="row">
        <NewsDetails :data="row"></NewsDetails>
      </template>
      <!-- busy table -->
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ServiceActionCell from "./tableCell/service/ServiceActionCell";
import NewsDetails from "./tableDetails/NewsDetails";
export default {
  components: {
    NewsDetails,
    ServiceActionCell,
  },
  data() {
    return {
      filter: null,
      filterOn: [],
      perPage: 10,
      currentPage: 1,
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
  },
  computed: {
    rows() {
      return this.data.length;
    },
    ...mapGetters({
      getNews: "newsContent/getNews",
    }),
  },
  methods: {
    changeStatus(data) {
      data.status = !data.status;
      const id = data.id;
      const news = this.getNews(id);
      this.$bvModal
        .msgBoxConfirm("Are you sure change status ?", {
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
        })
        .then((value) => {
          // if enter OK button
          if (value) {
            let temp = !news.status;
            Object.assign(news, { loading: true, status: temp });
            this.$store.commit("newsContent/changeStatusNews", news);
            this.$store.dispatch("newsContent/changeStatus", {
              id: id,
              news: news,
            });
          } else {
            return false;
          }
        })
        .catch((err) => {});
    },
    removeNews(value) {
      const id = value.id;
      const news = this.getNews(id);
      this.$bvModal
        .msgBoxConfirm("Are you sure delete ?", {
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
        })
        .then((value) => {
          if (value) {
            Object.assign(news, { remove: true });
            this.$store.commit("newsContent/changeStatusNews", news);
            this.$store.dispatch("newsContent/removeNews", {
              id: id,
              news: news,
            });
          } else {
            return false;
          }
        })
        .catch((err) => {});
    },
  },
  watch: {},
};
</script>

<style scoped>
.flex-row {
  display: flex;
}
.icon-remove {
  place-self: center;
  margin: 0px 5px;
  color: var(--bg-color-main);
}
.icon-remove:hover {
  color: black;
  cursor: pointer;
}
</style>
