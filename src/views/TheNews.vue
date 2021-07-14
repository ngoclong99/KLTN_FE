<template>
  <div class="container mt-5 mb-5" id="blog">
    <div class="row justify-content-center">
      <h1 class="mb-5">News</h1>
      <div
        class="col-sm-6 col-md-6 col-lg-4 height-news"
        v-for="(news, index) in allListNewsTrue"
        :key="index"
      >
        <router-link
          :to="{
            name: 'NewsDetails',
            params: { id: news.id },
          }"
        >
          <b-card
            class="new-card mb-3"
            :img-src="news.images"
            img-top
            tag="article"
            img-height="180px"
            style="max-width: 30rem; "
          >
            <p class="name-new">{{ news.title }}</p>
          </b-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      allListNewsTrue: "newsContent/allListNewsTrue",
    }),
  },
  methods: {
    ...mapActions({
      getAllNewsTrue: "newsContent/getAllNewsTrue",
    }),
  },
  created() {
    if (this.allListNewsTrue.length === 0) this.getAllNewsTrue();
  },
};
</script>

<style lang="scss" scoped>
.new-card {
  max-width: 100% !important;
  height: 300px;
}
.name-new {
  font-size: var(--font-text-content-m);
  color: var(--bg-color-main);
  font-weight: 700;
  &:hover {
    color: rgb(86, 33, 231);
  }
}
.height-news {
  height: 350px;
  min-height: 350px;
  max-height: 350px;
  overflow: auto;
}
</style>
