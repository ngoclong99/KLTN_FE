<template>
  <div class="container-fluid" id="login">
    <div class="row">
      <div class="wrap-form">
        <form class="form-login col-sm-12 col-md-12 col-lg-12 form-mefore">
          <div class="">
            <div v-if="message" :class="`alert ${type}`">
              {{ message }}
            </div>
          </div>
          <h1 class="h3 mb-3 font-weight-normal input-group">Login</h1>
          <div class="input-group">
            <font-awesome-icon
              icon="user"
              class="iconForm input-group-prepend"
            />
            <input
              :disabled="isLoading"
              v-model="account.username"
              type="text"
              id="inputUserNameIn"
              name="UserName"
              class="form-control"
              placeholder="User Name"
              v-validate="{ required: true, alpha_num: true }"
            />
          </div>
          <label
            v-show="errors.has('UserName')"
            class="error alert-danger input-group"
            for="inputUserNameIn"
            >{{ errors.first("UserName") }}</label
          >
          <div class="input-group">
            <font-awesome-icon
              icon="unlock"
              class="iconForm input-group-prepend"
            />
            <input
              :disabled="isLoading"
              type="password"
              id="inputPasswordIn"
              name="Password"
              class="form-control"
              placeholder="Password"
              v-validate="{
                required: true,
                regex: '^\\S*$',
                min: 6,
              }"
              v-model="account.password"
            />
          </div>
          <label
            v-show="errors.has('Password')"
            class="error alert-danger input-group"
            for="inputPasswordIn"
            >{{ errors.first("Password") }}</label
          >
          <div class="flex-capcha">
            <my-captcha
              :callSuccess="captchaOk"
              color="blue"
              resolve="text"
              class="mb-2 position-relative"
            ></my-captcha>
            <div class="">
              <div
                @click="showForgetInpu = !showForgetInpu"
                class="text-capitalize mb-2 position-relative show"
              >
                Can’t access your account?
              </div>
              <div class="forget input-group mb-2" v-if="showForgetInpu">
                <b-form-input
                  v-model="sendEmail"
                  placeholder="Enter your email"
                  v-validate="{
                    required: true,
                    regex: '^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$',
                  }"
                  name="email"
                ></b-form-input>
                <button
                  type="button"
                  class="ml-3 btn btn-outline-primary"
                  @click="forgetPass"
                  :disabled="errors.has('email') && sendEmail == ''"
                >
                  Send
                </button>
                <label
                  v-show="errors.has('email') && showForgetInpu"
                  class=" alert-danger input-group"
                  >{{ errors.first("email") }}</label
                >
              </div>
            </div>
          </div>

          <button
            class="
              input-group
              btn btn-lg btn-primary btn-block
              justify-content-center
            "
            type="submit"
            @click.prevent="loginUserAPI"
            :disabled="isLoading"
          >
            <font-awesome-icon
              v-show="isLoading"
              icon="spinner"
              class="icon-form-m"
              spin
            />
            <span class="text-form-m">Login</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import myCaptcha from "vue-captcha";
import axios from "axios";
import account from "../models/account";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    "my-captcha": myCaptcha,
  },
  data() {
    return {
      isLoading: false,
      account: new account("", ""),
      showForgetInpu: false,
      sendEmail: "",
      btndis: true,
      checkCapcha: false,
    };
  },
  computed: {
    ...mapGetters("alert", ["message", "type"]),
  },
  methods: {
    ...mapMutations("alert", [
      "setMessageSuccess",
      "setMessageError",
      "clearMessage",
    ]),
    loginUserAPI() {
      if (this.checkCapcha == false) alert("Please input capcha");
      else {
        this.isLoading = true;
        this.$validator.validateAll().then((isValid) => {
          if (!isValid) {
            this.isLoading = false;
          } else {
            this.showForgetInpu = false;
            axios({
              method: "post",
              url: "https://clinicspringboot.herokuapp.com/api/v1/auth/signIn",
              data: {
                userName: this.account.username,
                password: this.account.password,
              },
            })
              .then((response) => {
                this.showForgetInpu = false;
                if (response.data.accsessToken) {
                  this.isLoading = false;
                  localStorage.setItem("token", response.data.accsessToken);
                  localStorage.setItem("username", response.data.username);
                  localStorage.setItem("role", response.data.role);
                  this.$router.push("/" + response.data.username + "/proFile");
                }
              })
              .catch((error) => {
                this.setMessageError("Wrong username or password");
                setTimeout(() => {
                  this.clearMessage();
                }, 3000);
                this.isLoading = false;
                this.showForgetInpu = false;
              });
          }
        });
      }
    },
    forgetPass() {
      let email = this.sendEmail;
      axios({
        method: "post",
        url: `https://clinicspringboot.herokuapp.com/api/v1/mail/getPassword/${email}`,
        data: {},
      })
        .then((response) => {
          this.sendEmail = "";
          this.showForgetInpu = true;
          alert("Email sent succes");
        })
        .catch((error) => {
          alert("Email sent fail");
        });
    },
    captchaOk() {
      this.checkCapcha = true;
    },
  },
};
</script>
<style lang="scss" scoped>
a {
  color: var(--bg-color-main) !important;
}
.text-form-m {
  font-size: var(--font-text-content-m);
  margin: auto 5px;
}
.icon-form-m {
  margin: auto 0;
}
.flex-capcha {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}
.wrap-form {
  width: 100%;
  min-height: calc(100vh - 40px);
  background-image: url("../assets/heart.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  .alert_message {
    // display: inline-block;
    position: absolute;
    top: 161px;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 48%;
  }
  .form-login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 40%;
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
.form-mefore::before {
  position: absolute;
  content: "";
  top: -30px;
  bottom: -50px;
  left: -30px;
  right: -30px;
  background: rgba(255, 255, 255, 0.7);
}
.show {
  cursor: pointer;
  color: rgb(74, 97, 162) !important;
  display: inline-block;
  font-weight: bold;
  font-style: italic;
  &:hover {
    text-decoration: underline;
  }
}
</style>
