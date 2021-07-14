<template>
  <div>
    <b-modal
      hide-footer
      scrollable
      size="sm"
      v-model="show"
      ok-only
      title="Create"
      @ok="handleOk"
      @hidden="handleOk"
    >
      <div class="row">
        <div class="col-12">
          <b-form-group label="Groups Name:" label-for="input-1">
            <b-form-input
              type="text"
              class="width-100"
              v-model="name"
              name="groupName"
              v-validate="{
                required: true,
                regex: /^([a-zA-Z0-9ếÀẾÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/,
              }"
            ></b-form-input
          ></b-form-group>
          <label v-show="errors.has('groupName')" class="error alert-danger">{{
            errors.first("groupName")
          }}</label>
        </div>
      </div>
      <button
        type="button"
        class="btn btn-outline-primary mr-3"
        @click="createGroups"
        :disabled="isLoading"
      >
        <font-awesome-icon
          v-show="isLoading"
          icon="spinner"
          class="icon-form-m"
          spin
        />
        Create
      </button>
      <button type="button" class="btn btn-outline-primary" @click="handleOk">
        Cancel
      </button>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      show: this.accepts,
      name: "",
    };
  },
  props: {
    accepts: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      isLoading: "drugContent/isLoading",
    }),
  },
  methods: {
    handleOk() {
      this.show = false;
      this.$emit("changeAccepts", this.show);
      this.name = "";
    },
    createGroups() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.$store.commit("drugContent/setIsLoading", false);
        } else {
          this.$store.dispatch("drugContent/createGroupsDrugs", {
            name: this.name,
          });
        }
      });
    },
  },
  watch: {
    accepts() {
      this.show = this.accepts;
    },
    isLoading() {
      if (this.isLoading == false) this.handleOk();
    },
  },
};
</script>

<style scoped lang="scss">
.width-100 {
  flex: 1;
}
</style>
