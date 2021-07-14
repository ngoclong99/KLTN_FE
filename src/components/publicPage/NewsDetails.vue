<template>
  <div class="container">
    <div class="wrap">
      <div class="row">
        <div class="col-12">
          <h1 class="font-italic">News</h1>
          <h4>{{ getNewsInArray.title }}</h4>
          <div class="news-auther">
            <font-awesome-icon
              icon="user-circle"
              class="news-auther__icon"
              size="lg"
            />
            <div class="news-auther__text">{{ getNewsInArray.createdBy }}</div>
            <div class="news-auther__text ml-2 mr-2">-</div>
            <div class="news-auther__text">{{ newsDate }}</div>
          </div>

          <img
            class="news__image"
            :class="getNewsInArray.images == null ? 'hiddenImg' : ''"
            :src="getNewsInArray.images"
            alt="Image"
          />
          <p class="mt-3" v-html="getNewsInArray.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters({
      allListNewsTrue: "newsContent/allListNewsTrue",
    }),
    getNewsInArray() {
      return this.allListNewsTrue.find((item) => item.id === this.id);
    },
    newsDate() {
      return moment(this.getNewsInArray.createdAt).format("DD-MM-YYYY");
    },
  },
  methods: {
    ToText(HTML) {
      var input = HTML;
      return this.HTML.r;
      // .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
      // .replace(/<[^>]+?>/g, "")
      // .replace(/\s+/g, " ")
      // .replace(/ /g, " ")
      // .replace(/>/g, " ");
    },
  },
};
</script>
<style lang="scss" scoped>
.hiddenImg {
  display: none;
}
.wrap {
  background: #fff;
  -webkit-box-shadow: 0 2px 3px #ddd;
  box-shadow: 0 2px 3px #ddd;
  padding: 20px;
  margin: 8px -20px 30px;
  h4 {
    color: #333333;
    font-family: Tno;
    font-size: 28px;
    font-weight: 700;
    line-height: 40px;
    margin: 18.76px 0px;
  }
  .news-auther {
    color: #333333;
    line-height: 20px;
    margin: 0px 0px 18px;
    .news-auther__icon {
      color: #888888;
      margin-right: 10px;
      display: inline;
    }
    .news-auther__text {
      display: inline;
      font-family: Tno;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      height: 20px;
      text-transform: capitalize;
    }
  }
  .news__image {
    max-height: 300px;
  }
}
</style>
