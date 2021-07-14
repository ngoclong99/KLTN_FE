<template>
  <div class="container-fluid" id="home">
    <div class="row">
      <b-carousel
        class="slide-Images"
        id="carousel-1"
        v-model="slide"
        :interval="3000"
        controls
        indicators
        img-alt="Image"
      >
        <b-carousel-slide
          class="slide-Images__image"
          v-for="(img, index) in listImages"
          :img-src="require(`../../assets/` + img)"
          :key="index"
        ></b-carousel-slide>
      </b-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Img number
      slide: 0,
      // Status Img
      sliding: null,
      listImages: ["slide-home-1.jpg", "slide-home-2.jpg", "slide-home-3.jpg"],
    };
  },
};
</script>
<style lang="scss">
hr {
  width: 100%;
  margin-top: 0 !important;
  border-top: 3px solid var(--bg-color-main-hover) !important;
}
h1 {
  color: var(--bg-color-main);
  text-transform: uppercase;
  display: block;
  width: 100%;
  text-align: center;
  font-weight: bold !important;
}
.slide-Images {
  width: 100%;
  height: 450px;
  overflow: hidden;
  img {
    height: 450px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
}
@media (max-width: 450px) {
  .slide-Images {
    height: 25vh;
    img {
      height: 200px;
    }
  }
}
.slide-Images .carousel-indicators li {
  background-color: var(--color-black-m) !important;
  min-height: 10px !important;
  margin-left: 15px !important;
  width: 40px !important;
  &:focus {
    outline: none !important;
  }
}
</style>
