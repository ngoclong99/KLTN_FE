<template>
  <div>
    <CarouselImages></CarouselImages>
    <Covid19></Covid19>
    <TheServices></TheServices>
    <TheTeam></TheTeam>
    <TheHighlights></TheHighlights>
    <TheNewsHight></TheNewsHight>
    <TheContact></TheContact>
    <div
      class="zalo-chat-widget"
      data-oaid="3456251091488688550"
      data-welcome-message="Rất vui khi được hỗ trợ bạn!"
      data-autopopup="0"
      data-width="350"
      data-height="420"
    ></div>
  </div>
</template>

<script>
import CarouselImages from "../components/common/CarouselImages.vue";
import TheServices from "../components/publicPage/TheServices.vue";
import TheTeam from "../components/publicPage/TheTeam.vue";
import TheHighlights from "../components/publicPage/TheHighlights.vue";
import TheContact from "../components/publicPage/TheContact.vue";
import TheNewsHight from "../components/publicPage/TheNewsHight.vue";
import Covid19 from "./Covid19.vue";
export default {
  name: "Home",
  components: {
    CarouselImages,
    TheServices,
    TheTeam,
    TheHighlights,
    TheContact,
    TheNewsHight,
    Covid19
  },
};
</script>