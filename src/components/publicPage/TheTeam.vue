<template>
  <div class="container mt-5 mb-5" id="about">
    <div class="row">
      <h1 class="">our team</h1>
      <hr />
      <hooper :settings="hooperSettings" class="peoples">
        <slide
          v-for="(people, index) in ListDoctorTrue"
          :key="index"
          :index="index"
        >
          <div class="people">
            <img :src="people.avatar" />
            <div class="info">
              <p class="info-name">Name: {{ people.fullName }}</p>
              <p class="info-exp">Experiences: {{ people.experience }} year</p>
              <p class="info-des">Specialized: {{ people.specialized }}</p>
              <p class="info-des">Gender: {{ people.gender ? 'FeMale' : 'Male' }}</p>
              <p class="info-des">Phone: {{ people.phoneNumber }}</p>
            </div>
          </div>
        </slide>
      </hooper>
    </div>
  </div>
</template>

<script>
// Slide team
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Hooper,
    Slide,
  },
  data() {
    return {
      hooperSettings: {
        wheelControl: false,
        itemsToShow: 1,
        infiniteScroll: true,
        hoverPause: true,
        autoPlay: true,
        playSpeed: 2000,
        breakpoints: {
          600: {
            itemsToShow: 1,
          },
          800: {
            itemsToShow: 2,
          },
          960: {
            itemsToShow: 2,
          },
          1264: {
            itemsToShow: 3,
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      ListDoctorTrue: "accountContent/ListDoctorTrue",
    }),
  },
  methods: {
    ...mapActions({
      getListAccountDoctorTrue: "accountContent/getListAccountDoctorTrue",
    }),
  },
  created() {
    if (this.ListDoctorTrue.length == 0) this.getListAccountDoctorTrue();
  },
};
</script>

<style lang="scss">
.peoples {
  $height-people: 260px;
  height: $height-people;
  &:focus {
    outline: none;
  }
  .people {
    margin: 0 6px;
    height: 100%;
    position: relative;
    transition: all 2s;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
    .info {
      position: absolute;
      top: 260px;
      transition: all 0.5s linear;
      height: 100%;
      width: 100%;
      padding: 20px;
      overflow: auto;
      background: radial-gradient(
        circle,
        rgba(85, 83, 83, 0.5) 9%,
        rgba(107, 126, 200, 0.5) 100%
      );
      p {
        color: var(--color-white);
        font-size: 18px;
        span {
          font-weight: bold;
        }
      }
    }
    &:hover .info {
      transform: translateY(-260px);
      background: radial-gradient(
        circle,
        rgba(85, 83, 83, 0.5) 9%,
        rgba(107, 126, 200, 0.5) 100%
      );
    }
  }
}
</style>
