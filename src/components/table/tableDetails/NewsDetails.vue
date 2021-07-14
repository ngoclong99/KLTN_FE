<template>
  <b-card>
    <div class="wrapper__prescription container-fluid">
      <div class="row">
        <div class="col-12 mb-3">
          <h4>Title:</h4>
          <b-form-input
            type="text"
            v-model="title"
            v-validate="{
              required: true,
              regex: /^([a-zA-Z0-9.,:ếÀẾÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/,
            }"
            name="titleNews"
          ></b-form-input>
          <label v-show="errors.has('titleNews')" class="error alert-danger">{{
            errors.first("titleNews")
          }}</label>
        </div>
        <div class="col-lg-6 col-12">
          <h4>Images:</h4>
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
                @click="onUpload()"
                class="btn btn-outline-primary mb-3"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
        <div class="col-12">
          <ckeditor
            class="editor-instance mb-3"
            v-model="content"
            v-validate="{
              required: true,
            }"
            name="ContentNews"
          ></ckeditor>
          <label
            v-show="errors.has('ContentNews')"
            class="error alert-danger"
            >{{ errors.first("ContentNews") }}</label
          >
        </div>
      </div>
    </div>
    <div class="float-right">
      <b-button
        size="sm"
        class="mr-3"
        :disabled="this.data.item.loadingDetails"
        @click="changeNews"
      >
        <font-awesome-icon
          v-show="this.data.item.loadingDetails"
          icon="spinner"
          class="icon-form-m"
          spin
        />
        Save
      </b-button>
      <b-button size="sm" @click="cancelEdit">Cancel</b-button>
    </div>
  </b-card>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      content: this.data.item.content,
      title: this.data.item.title,
      images: this.data.item.images,
      id: this.data.item.id,

      imageData: null,
      uploadValue: 0,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({ isLoading: "newsContent/isLoading" }),
  },
  methods: {
    cancelEdit() {
      this.data.toggleDetails();
    },
    changeNews() {
      const news = this.data.item;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.$store.commit("newsContent/setIsLoading", false);
        } else {
          this.$store.dispatch("newsContent/updateNews", {
            id: this.id,
            content: this.content,
            title: this.title,
            images: this.images,
            news: news,
          });
        }
      });
    },
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
            this.images = url;
          });
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  .user-lable {
    font-size: 14px;
  }
  .user-input {
    max-width: 250px;
  }
}
.wrap-status {
  display: flex;
}
</style>
