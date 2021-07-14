<template>
  <div class="container-fluid bg-b">
    <div class="row">
      <div class="container mt-5 mb-5">
        <div class="row">
          <h1 class="text-center">Why Choose Our Clinic?</h1>
          <hr />
          <div class="hightLights">
            <div
              class="col-sm-6 col-md-6 col-lg-3"
              v-for="(hightLight, index) in listHightLights"
              :key="index"
            >
              <div class="hightLight text-center">
                <div class="rounded-circle icon__hightLight">
                  <i :class="hightLight.icon" class="icon-heightLight"></i>
                  <font-awesome-icon
                    :icon="hightLight.icon"
                    class="icon-heightLight"
                  />
                </div>
                <p class="title__hightLight">{{ hightLight.title }}</p>
                <p class="des__hightLight">
                  {{ hightLight.des }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listHightLights: {
        hightLight1: {
          icon: "stethoscope",
          title: "More experience",
          des:
            "Every year, more than a million people come to Mayo Clinic for care. Our highly specialized experts are deeply experienced in treating rare and complex conditions.",
        },
        hightLight2: {
          icon: "question",
          title: "The right answers",
          des:
            "Successful treatment starts with an accurate diagnosis, and our experts take the time to get it right. A team of specialists will listen to your needs and evaluate your condition from every angle to make the very best plan for you.",
        },
        hightLight3: {
          icon: "hand-holding-medical",
          title: "Seamless care",
          des:
            "At Mayo Clinic, every aspect of your care is coordinated and teams of experts work together to provide exactly the care you need. What might take months elsewhere can often be done in days here.",
        },
        hightLight4: {
          icon: "stethoscope",
          title: "Expertise",
          des:
            "Mayo Clinic experts are some of the best in the world. In the U.S. News & World Report rankings of top hospitals, Mayo Clinic is consistently ranked among the top hospitals in the nation.",
        },
      },
    };
  },
};
</script>

<style  lang='scss'>
.hightLights {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .hightLight {
    $height-icon: 60px;
    .icon__hightLight {
      margin: 10px auto;
      width: $height-icon;
      height: $height-icon;
      background-color: var(--bg-color-main);
      .icon-heightLight {
        height: $height-icon;
        line-height: $height-icon;
        font-size: var(--font-text-title);
        color: var(--color-white);
      }
    }
    .title__hightLight {
      font-size: var(--font-text-content-m);
      font-weight: bold;
      color: var(--bg-color-main);
    }
    .des__hightLight {
      font-size: var(--font-text-content);
      color: var(--color-black);
    }
    &:hover .icon__hightLight {
      animation: icon-circle 1s linear;
    }
    @keyframes icon-circle {
      0% {
        transform: rotateY(0deg);
      }
      100% {
        transform: rotateY(-360deg);
      }
    }
  }
}
</style>
