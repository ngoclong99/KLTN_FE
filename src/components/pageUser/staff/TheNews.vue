<template>
  <div class="container-fluid prescription__content">
    <button
      type="button"
      class="btn btn-outline-primary mt-3"
      @click="createNews"
    >
      <font-awesome-icon icon="user-plus" class="dropbtn" />
      News
    </button>
    <CreateNews :sendShowModel="typeUser" @changeUser="changeUser"></CreateNews>
    <div class="">
      <NewsTable
        :data="allListNews"
        :columns="newsContentTableColumns"
        :isBusy="isBusy"
      ></NewsTable>
    </div>
  </div>
</template>

<script>
import CreateNews from "../../modal/news/CreateNews";
import NewsTable from "../../table/NewsTable";
import TABLE_COLUMNS from "../../..//constants/table-column";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    NewsTable,
    CreateNews,
  },
  data() {
    return { typeUser: false };
  },
  computed: {
    newsContentTableColumns() {
      return TABLE_COLUMNS.STAFF_NEWS_COLUMNS;
    },
    ...mapGetters({
      isBusy: "newsContent/isBusy",
      allListNews: "newsContent/allListNews",
    }),
  },
  methods: {
    createNews() {
      this.typeUser = !this.typeUser;
    },
    changeUser(value) {
      value !== false ? (this.typeUser = false) : (this.typeUser = value);
    },
    ...mapActions({
      getAllNews: "newsContent/getAllNews",
    }),
  },
  created() {
    if (this.allListNews == 0) this.getAllNews();
  },
};
</script>

<style scoped lang="scss">
.prescription__content {
  position: relative;
}
</style>
