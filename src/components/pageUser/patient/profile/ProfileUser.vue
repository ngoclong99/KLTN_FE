<template>
  <div id="profile" class="container-fluid">
    <div v-if="showText" class="title-top">profile</div>
    <div v-if="!showText" class="title-top">edit profile</div>
    <div class="row">
      <div class="profile-user col-lg-8 col-12">
        <div class="profile-user__content container">
          <div class="row">
            <!-- Full Name -->
            <div class="col-12 min-heght">
              <div class="row">
                <div class="col-4 text-right">
                  <label for="inputfullName" class="label_top-text"
                    >Full Name:</label
                  >
                </div>
                <div class="col-8 text-left">
                  <label
                    v-bind:value="user.fullName"
                    class="form-control-lable"
                    v-if="showText"
                  >
                    {{ user.fullName }}
                  </label>
                  <b-form-input
                    v-if="!showText"
                    id="inputfullName"
                    v-model="tempUser.fullName"
                    name="fullName"
                    lazy-formatter
                    :formatter="overElement"
                    v-validate="{
                      required: true,
                      regex: /^([a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i,
                    }"
                  ></b-form-input>
                  <label
                    v-show="BlurElement && errors.has('fullName')"
                    class="error alert-danger"
                    for="inputFullName"
                    >{{ errors.first("fullName") }}
                  </label>
                </div>
              </div>
            </div>
            <!-- Phone -->
            <div class="col-12 min-heght">
              <div class="row">
                <div class="col-4 text-right">
                  <label for="inputfullName" class="label_top-text"
                    >Phone Number:</label
                  >
                </div>
                <div class="col-8 text-left">
                  <label
                    v-bind:value="user.phoneNumber"
                    class="form-control-lable"
                    v-if="showText"
                  >
                    {{ user.phoneNumber }}
                  </label>
                  <b-form-input
                    v-if="!showText"
                    id="inputPhone"
                    v-model="tempUser.phoneNumber"
                    name="Phone Number"
                    placeholder="Your Phone Number"
                    lazy-formatter
                    :formatter="overElement"
                    v-validate="{
                      required: true,
                      regex: /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,
                    }"
                  ></b-form-input>
                  <label
                    v-show="BlurElement && errors.has('Phone Number')"
                    class="error alert-danger"
                    for="inputPhone"
                    >{{ errors.first("Phone Number") }}
                  </label>
                </div>
              </div>
            </div>
            <!-- Email -->
            <div class="col-12 min-heght">
              <div class="row">
                <div class="col-4 text-right">
                  <label for="inputfullName" class="label_top-text"
                    >Email:</label
                  >
                </div>
                <div class="col-8 text-left">
                  <label
                    v-bind:value="user.email"
                    class="form-control-lable"
                    v-if="showText"
                  >
                    {{ user.email }}
                  </label>
                  <b-form-input
                    id="inputEmail"
                    v-if="!showText"
                    v-model="tempUser.email"
                    name="Email"
                    placeholder="Your Email"
                    lazy-formatter
                    :formatter="overElement"
                    v-validate="{
                      regex: '^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$',
                    }"
                  ></b-form-input>
                  <label
                    v-show="BlurElement && errors.has('Email')"
                    class="error alert-danger"
                    for="inputEmail"
                    >{{ errors.first("Email") }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Gender -->
            <div class="col-12 min-heght">
              <div class="row">
                <div class="col-4 text-right">
                  <label for="inputfullName" class="label_top-text"
                    >Gender:</label
                  >
                </div>
                <div class="col-8 text-left">
                  <label
                    v-bind:value="user.gender"
                    class="form-control-lable"
                    v-if="showText"
                  >
                    {{ user.gender }}
                  </label>
                  <b-form-group v-if="!showText">
                    <div class="d-flex">
                      <b-form-radio
                        v-model="tempUser.gender"
                        name="some-radios"
                        value="Male"
                        >Male</b-form-radio
                      >
                      <b-form-radio
                        class="ml-3"
                        v-model="tempUser.gender"
                        name="some-radios"
                        value="FeMale"
                        >Female</b-form-radio
                      >
                    </div>
                  </b-form-group>
                </div>
              </div>
            </div>

            <div class="col-12 min-heght">
              <div class="row">
                <div class="col-4 text-right">
                  <label class="label_top-text">Address:</label>
                </div>
                <div class="col-8 text-left">
                  <label
                    v-bind:value="user.address"
                    class="form-control-lable"
                    v-if="showText"
                  >
                    {{ user.address }}
                  </label>
                  <b-form-textarea
                    v-if="!showText"
                    rows="1"
                    max-rows="6"
                    id="inputAddress"
                    v-model="tempUser.address"
                    name="Address"
                    placeholder="Your Address"
                    lazy-formatter
                    :formatter="overElement"
                  ></b-form-textarea>
                </div>
              </div>
            </div>
            <div class="col-6 mt-3 text-right">
              <b-button
                variant="primary mr-3"
                :class="showText ? 'none' : ''"
                @click.prevent="handleUpdate"
              >
                <font-awesome-icon
                  v-show="isLoading"
                  icon="spinner"
                  class="icon-form-m"
                  spin
                />
                Update
              </b-button>
              <b-button variant="outline-primary" @click="changeStatusText">
                {{ !showText ? "Cancel" : "Update" }}
              </b-button>
            </div>
            <div class="col-6 mt-3 text-left">
              <b-button
                variant="outline-primary"
                @click="changePassword"
                :disabled="loadingPass"
              >
                <font-awesome-icon
                  v-show="loadingPass"
                  icon="spinner"
                  class="icon-form-m"
                  spin
                />
                Change Password
              </b-button>
            </div>
            <b-modal
              v-model="modalShow"
              title="Change Password"
              @show="resetModal"
              @hidden="resetModal"
              @ok="handleOk"
            >
              <div>
                <b-form-group label="Current Password" label-for="name-input">
                  <b-form-input
                    id="name-input"
                    v-model="currentPassword"
                    v-validate="{
                      required: true,
                      regex: '^\\S*$',
                      min: 6,
                    }"
                    name="pass"
                  ></b-form-input>
                </b-form-group>
                <label
                  v-show="errors.has('pass')"
                  class="error alert-danger input-group"
                  >{{ errors.first("pass") }}</label
                >
              </div>
              <div>
                <b-form-group label="New Password" label-for="name-input">
                  <b-form-input
                    v-model="newPassword"
                    v-validate="{
                      required: true,
                      regex: '^\\S*$',
                      min: 6,
                    }"
                    name="newPass"
                  ></b-form-input>
                </b-form-group>
                <label
                  v-show="errors.has('newPass')"
                  class="error alert-danger input-group"
                  >{{ errors.first("newPass") }}</label
                >
              </div></b-modal
            >
            <div class="col-12 mt-3 text-center">
              <div v-if="message" :class="`alert ${type}`">
                {{ message }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-avarta col-lg-4 col-12 text-center">
        <img :src="user.avatar" class="" alt="avatar" />
        <div class="senImage">
          <div>
            <input type="file" @change="previewImages" accept="image/*" />
          </div>
          <div>
            <progress id="progress" :value="uploadValue" max="100"></progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase";
import axios from "axios";
export default {
  data() {
    return {
      loadingPass: false,
      modalShow: false,
      currentPassword: "",
      newPassword: "",

      showText: true,
      BlurElement: false,
      images: null,

      imageData: null,
      uploadValue: 0,

      tempUser: {
        userName: "",
        password: "",
        email: "",
        gender: "",
        address: "",
        fullName: "",
        phoneNumber: "",
        avatar: "",
      },
    };
  },
  computed: {
    ...mapGetters("profile", ["user", "isLoading", "message", "type"]),
  },
  methods: {
    ...mapActions("profile", ["getProfile", "updateProfile"]),
    overElement(value) {
      this.BlurElement = true;
      return value;
    },
    handleUpdate() {
      this.updateProfile(this.tempUser);
    },
    changeStatusText() {
      (this.tempUser.userName = this.user.userName),
        (this.tempUser.password = this.user.password),
        (this.tempUser.email = this.user.email),
        (this.tempUser.gender = this.user.gender),
        (this.tempUser.address = this.user.address),
        (this.tempUser.fullName = this.user.fullName),
        (this.tempUser.phoneNumber = this.user.phoneNumber),
        (this.tempUser.avatar = this.user.avatar);
      this.showText = !this.showText;
    },
    previewImages(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
      this.$nextTick(() => {
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
      });
    },
    changePassword() {
      this.modalShow = !this.modalShow;
    },
    handleOk() {
      this.loadingPass = true;
      axios
        .put(
          "https://clinicspringboot.herokuapp.com/api/v1/auth/changePassword",
          {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.loadingPass = false;
          alert("Change Success");
          console.log(res);
        })
        .catch((err) => {
          this.loadingPass = false;
          alert("Change fail");
          console.log(err);
        });
    },
    resetModal() {
      this.newPassword = "";
      this.currentPassword = "";
    },
  },
  created() {
    this.getProfile();
  },
  watch: {
    images() {
      console.log("object");
    },
  },
};
</script>

<style lang="scss" scoped>
.min-heght {
  min-height: 50px;
}
.none {
  display: none;
}

#__BVID__16 + div:nth-child(1) {
  display: flex;
}
.error {
  padding: 5px 0px;
  margin: 5px 0px;
}
#profile {
  --height-menuTop: 60px;
  height: calc(100% - var(--height-menuTop));
  .profile-user {
    position: relative;
    width: 100%;
    border-radius: 5px;
    background-color: var(--color-white);
    .profile-user__content {
      margin-top: 30px;
    }
  }
}
.profile-user__title {
  margin: 0 auto;
  width: 30%;
  height: 50px;
  line-height: 50px;
  border: 1px solid;
  padding-left: 2%;
  background-color: var(--bg-color-title);
  border-radius: 5px;
  text-align: center;
  color: var(--color-white);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px;
  font-size: var(--font-text-content-m);
  text-transform: uppercase;
  font-weight: bold;
  font-style: italic;
  letter-spacing: 1px;
}
.profile-avarta {
  margin-top: 30px;
  width: 100%;
  overflow: hidden;
  img {
    max-width: 70%;
    min-width: 250px;
    min-height: 300px;
    border: 5px #6b6b6b;
    border-style: double;
    border-radius: 5px;
  }
  .senImage {
    max-width: 60%;
    margin: 0 auto;
    margin-top: 10px;
  }
}
.title-top {
  position: relative;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 36px;
  font-weight: bold;
  color: var(--bg-color-main);
  text-transform: capitalize;
  text-align: center;
  display: inline-block;
  padding: 8px 32px;
  background-color: var(--bg-color-title);
  color: white;
  border-radius: 10px;
}
</style>
