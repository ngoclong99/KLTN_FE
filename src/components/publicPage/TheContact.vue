<template>
  <div class="container-fluid bg-b">
    <div class="row">
      <div class="container mt-5 mb-5" id="contact">
        <div class="row">
          <h1 class="">contact us</h1>
          <hr />
          <div class="contact">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <form class="form-contact">
                <div class="input-group">
                  <font-awesome-icon
                    icon="user"
                    class="icon input-group-prepend"
                  />
                  <input
                    type="text"
                    id="inputFullName"
                    class="form-control"
                    placeholder="Full Name *"
                    v-model="fullName"
                    name="fullName"
                    v-validate="{
                      required: true,
                    }"
                  />
                </div>
                <label
                  v-show="errors.has('fullName')"
                  class="error alert-danger"
                  for="inputFullName"
                  >{{ errors.first("fullName") }}</label
                >
                <div class="input-group">
                  <font-awesome-icon
                    icon="phone-volume"
                    class="icon input-group-prepend"
                  />
                  <input
                    type="text"
                    id="inputPhone"
                    name="phoneNumber"
                    class="form-control"
                    placeholder="Phone Number *"
                    v-model="phoneNumber"
                    v-validate="{
                      required: true,
                      numeric: true,
                    }"
                  />
                </div>
                <label
                  v-show="errors.has('phoneNumber')"
                  class="error alert-danger"
                  for="inputPhone"
                  >{{ errors.first("phoneNumber") }}</label
                >
                <div class="input-group">
                  <font-awesome-icon
                    icon="envelope"
                    class="icon input-group-prepend"
                  />
                  <input
                    type="text"
                    id="inputEmail"
                    class="form-control"
                    name="inputEmail"
                    placeholder="Email *"
                    v-model="email"
                    v-validate="{
                      required: true,
                      email: true,
                    }"
                  />
                </div>
                <label
                  v-show="errors.has('inputEmail')"
                  class="error alert-danger"
                  for="inputEmail"
                  >{{ errors.first("inputEmail") }}</label
                >
                <div class="input-group">
                  <font-awesome-icon
                    icon="question"
                    class="icon input-group-prepend"
                  />
                  <textarea
                    id="inputDes"
                    class="form-control"
                    placeholder="Describe"
                    v-model="describe"
                  />
                </div>
                <button
                  class="btn btn-lg btn-primary btn-block mt-3"
                  type="submit"
                  @click.prevent="submitContact"
                >
                  Submit
                </button>
              </form>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8203749679287!2d108.22070411417005!3d16.074808343559795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218307d81c91d%3A0xbc7c14cab8a09c8!2zxJDhuqFpIGjhu41jIER1eSBUw6Ju!5e0!3m2!1svi!2s!4v1617082666393!5m2!1svi!2s"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fullName: "",
      phoneNumber: null,
      email: "",
      describe: "",
      loading: false,
    };
  },
  methods: {
    submitContact() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
        } else {
          axios({
            method: "post",
            url: "https://laraveldemoapi.herokuapp.com/api/login",
            data: {
              fullName: this.fullName,
              phoneNumber: this.phoneNumber,
              email: this.email,
              describe: this.describe,
            },
          })
            .then(() => {
              console.log(this.$axios.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        console.log(isValid);
      });
    },
  },
};
</script>

<style lang='scss'>
.contact {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  iframe {
    width: 100%;
    height: 100%;
  }
}
.form-contact {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.icon {
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(108, 117, 125);
}
.input-group {
  margin-bottom: 10px;
}
.error {
  display: block;
}
@media (max-width: 767px) {
  iframe {
    margin-top: 20px;
    min-height: 300px;
  }
}
</style>
