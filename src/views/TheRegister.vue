<template>
  <div class="container-fluid" id="register">
    <div class="row">
      <div class="wrap-form">
        <form class="form-register col-sm-12 col-md-12 col-lg-12 form-before">
          <div class=" ">
            <div v-if="message" :class="`alert ${type}`">
              {{ message }}
            </div>
          </div>
          <h1 class="h3 mb-3 font-weight-normal input-group">Register</h1>
          <!-- UserName -->
          <div class="input-group">
            <font-awesome-icon
              icon="user"
              class="iconForm input-group-prepend"
            />
            <input
              v-model="user.userName"
              type="text"
              id="inputUserNameRe"
              name="UserName"
              class="form-control"
              placeholder="User Name *"
              v-validate="{ required: true, alpha_num: true }"
            />
          </div>
          <label
            v-show="errors.has('UserName')"
            class="error alert-danger input-group"
            for="inputUserNameRe"
            >{{ errors.first("UserName") }}</label
          >
          <!-- PassWord -->
          <div class="input-group">
            <font-awesome-icon
              icon="unlock"
              class="iconForm input-group-prepend"
            />
            <input
              type="password"
              id="inputPassword"
              name="Password"
              class="form-control"
              placeholder="Password *"
              v-model="user.password"
              v-validate="{
                required: true,
                regex: '^\\S*$',
                min: 6,
              }"
            />
          </div>
          <label
            v-show="errors.has('Password')"
            class="error alert-danger input-group"
            for="inputPassword"
            >{{ errors.first("Password") }}</label
          >
          <!-- Confirm PassWord -->
          <div class="input-group">
            <font-awesome-icon
              icon="unlock"
              class="iconForm input-group-prepend"
            />
            <input
              type="password"
              id="inputRePassword"
              name="Re-Enter Password"
              class="form-control"
              placeholder="Re-Enter Password *"
              v-validate="{
                required: true,
                regex: '^\\S*$',
                is: user.password,
              }"
            />
          </div>
          <label
            v-show="errors.has('Re-Enter Password')"
            class="error alert-danger input-group"
            for="inputRePassword"
            >{{ errors.first("Re-Enter Password") }}</label
          >
          <!-- FullName -->
          <div class="input-group">
            <font-awesome-icon
              icon="user"
              class="iconForm input-group-prepend"
            />
            <input
              v-model="user.fullName"
              type="text"
              id="inputFullName"
              name="FullName"
              class="form-control"
              placeholder="Full Name *"
              v-validate="{
                required: true,
                regex: /^([a-zA-Z0-9éẾÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i,
              }"
            />
          </div>
          <label
            v-show="errors.has('FullName')"
            class="error alert-danger input-group"
            for="inputFullName"
            >{{ errors.first("FullName") }}
          </label>
          <!-- Email -->
          <div class="input-group">
            <font-awesome-icon
              icon="envelope"
              class="iconForm input-group-prepend"
            />
            <input
              v-model="user.email"
              type="text"
              id="inputEmail"
              name="Email"
              class="form-control"
              placeholder="Email"
              v-validate="{
                regex: '^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$',
              }"
            />
          </div>
          <label
            v-show="errors.has('Email')"
            class="error alert-danger input-group"
            for="inputEmail"
            >{{ errors.first("Email") }}</label
          >
          <!-- Phone Number -->
          <div class="input-group">
            <font-awesome-icon
              icon="phone-volume"
              class="iconForm input-group-prepend"
            />
            <input
              type="text"
              id="inputPhoneNumber"
              name="PhoneNumber"
              class="form-control"
              placeholder="Phone Number *"
              v-model="user.phoneNumber"
              v-validate="{
                required: true,
                regex: /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,
              }"
            />
          </div>
          <label
            v-show="errors.has('PhoneNumber')"
            class="error alert-danger input-group"
            for="inputPhoneNumber"
            >{{ errors.first("PhoneNumber") }}</label
          >
          <!-- Address -->
          <div class="input-group">
            <font-awesome-icon
              icon="map-marker-alt"
              class="iconForm input-group-prepend"
            />
            <textarea
              v-model="user.address"
              id="inputAddress"
              name="Address"
              class="form-control"
              placeholder="Address"
              v-validate="{
                required: true,
              }"
            ></textarea>
            <label
              v-show="errors.has('Address')"
              class="error alert-danger input-group"
              >{{ errors.first("Address") }}</label
            >
          </div>
          <!-- gender -->
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="checkBoxMale"
              name="gender"
              :value="false"
              checked
              v-model="user.gender"
            />
            <label class="form-check-label" for="checkBoxMale">Male</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="checkBoxFemale"
              :value="true"
              name="female"
              v-model="user.gender"
            />
            <label class="form-check-label" for="checkBoxFemale">FeMale</label>
          </div>
          <my-captcha
            :callSuccess="captchaOk"
            color="blue"
            resolve="text"
            class="mb-2 position-relative float-right"
          ></my-captcha>
          <button
            class="
              input-group
              btn btn-lg btn-primary btn-block
              mt-2
              justify-content-center
            "
            type="submit"
            :disabled="isLoading"
            @click.prevent="handleRegisterSubmit"
          >
            <font-awesome-icon
              v-show="isLoading"
              icon="spinner"
              class="icon-form-m"
              spin
            />
            <span class="text-form-m">Register</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import myCaptcha from "vue-captcha";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      checkCapcha: false,
    };
  },
  components: {
    "my-captcha": myCaptcha,
  },
  computed: {
    ...mapGetters("alert", ["message", "type"]),
    ...mapGetters("auth", ["user", "isLoading"]),
  },
  methods: {
    captchaOk() {
      this.checkCapcha = true;
    },
    ...mapMutations("alert", [
      "setMessageSuccess",
      "setMessageError",
      "clearMessage",
    ]),
    ...mapActions("auth", ["register"]),
    ...mapMutations("auth", ["setIsLoading"]),
    handleRegisterSubmit() {
      if (this.checkCapcha == false) alert("Please input capcha");
      else {
        this.setIsLoading(true);
        this.$validator.validateAll().then((isValid) => {
          if (!isValid) {
            this.setIsLoading(false);
          } else {
            this.register(this.user);
            // this.$router.push({
            //   name: "HomePage",
            // });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-form-m {
  font-size: var(--font-text-content-m);
  margin: auto 5px;
}
.icon-form-m {
  margin: auto 0;
}
.wrap-form {
  width: 100%;
  min-height: calc(100vh - var(--height-header));
  background-image: url("../assets/heart.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  .alert_message {
    // display: inline-block;
    position: absolute;
    top: 161px;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 48%;
  }
  .form-register {
    max-width: 40%;
    margin: 50px auto;
    .input-group {
      margin-bottom: 20px;
      .form-control {
        border-radius: 5px !important;
      }
      .iconForm {
        position: absolute;
        z-index: 9999;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: rgb(74, 97, 162) !important;
      }
    }
  }
}
.form-before::before {
  position: absolute;
  content: "";
  top: -30px;
  bottom: -90px;
  left: -30px;
  right: -30px;
  background: rgba(255, 255, 255, 0.7);
  margin-bottom: 70px;
  border-radius: 10px;
}
</style>
