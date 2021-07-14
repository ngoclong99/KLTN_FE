<template>
  <div>
    <div class="wrapper__prescription container-fluid" v-if="showModal">
      <div class="row">
        <div class="col-12 mb-3">
          <h4>Title:</h4>
          <b-form-input
            type="text"
            v-model="title"
            v-validate="{
              required: true,
              regex: /^([a-zA-Z0-9-'`:?ếÀẾÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i,
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
        <div class="col-12 mb-3">
          <button
            type="button"
            class="btn btn-outline-primary mr-3"
            :disabled="isShowModalCreate"
            @click="createAddNews"
          >
            <font-awesome-icon
              v-show="isShowModalCreate"
              icon="spinner"
              class="icon-form-m"
              spin
            />
            Create
          </button>
          <button
            type="button"
            class="btn btn-outline-primary "
            @click="handleUser"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  props: {
    sendShowModel: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showModal: this.sendShowModel,

      content: "",
      title: "",
      images: null,

      imageData: null,
      uploadValue: 0,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "newsContent/isLoading",
      isShowModalCreate: "newsContent/isShowModalCreate",
    }),
  },
  methods: {
    handleUser() {
      this.showModal = false;
      this.content = "";
      this.title = "";
      this.images = null;
      this.imageData = null;
      this.uploadValue = 0;
      this.$emit("changeUser", this.showModal);
    },
    createAddNews() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return false;
        } else {
          this.$store.commit("newsContent/setIsShowModalCreate", true);
          this.$store.dispatch("newsContent/createNews", {
            content: this.content,
            title: this.title,
            images: this.images,
          });
        }
      });
    },
    // Image
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
  watch: {
    sendShowModel() {
      this.showModal = this.sendShowModel;
    },
    isShowModalCreate() {
      if (this.isShowModalCreate == false) this.handleUser();
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper__prescription {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 10;
  background-color: white;
}
</style>
