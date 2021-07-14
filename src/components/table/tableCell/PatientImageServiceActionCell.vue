<template>
  <div class="senImage">
    <div>
      <input type="file" @change="previewImage" accept="image/*" />
    </div>
    <div>
      <progress id="progress" :value="uploadValue" max="100"></progress>
    </div>
    <div v-if="imageData != null">
      <button
        type="button"
        @click="onUpload(data.id, $event)"
        class="btn btn-outline-primary"
      >
        Upload
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0,
    };
  },
  computed: {
    ...mapGetters({
      getResultService: "serviceContent/getResultService",
      ListResultService: "serviceContent/ListResultService",
    }),
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    onUpload(id, event) {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
            const service = this.getResultService(id);
            Object.assign(service, { imageXRay: url });
            this.$store.commit("serviceContent/editResultService", service);
          });
        }
      );
    },
  },
  watch: {
    picture() {
      console.log(this.ListResultService);
    },
  },
};
</script>
<style lang="scss" scoped>
.senImage {
  max-width: 200px;
}
</style>
