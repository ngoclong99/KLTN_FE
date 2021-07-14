<template>
  <div>
    <b-modal
      id="modal-create"
      ref="modal"
      title="Add Text Response"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Add Query"
          label-for="query-input"
          invalid-feedback="Query is requied"
          :state="queryState"
        >
          <b-form-input
            ref="formQuery"
            id="query-input"
            v-model="query"
            :state="queryState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Add Answer"
          label-for="answer-input"
          invalid-feedback="Answer is requied"
          :state="answerState"
        >
          <b-form-input
            ref="formAnswer"
            id="answer-input"
            v-model="answer"
            :state="answerState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { EventBus } from "../EventBus.js";
export default {
  data() {
    return {
      query: "",
      answer: "",
      queryState: null,
      answerState: null,
    };
  },
  methods: {
    checkFormValidity() {
      const validFormQuery = this.$refs.formQuery.checkValidity();
      const validFormAnswer = this.$refs.formAnswer.checkValidity();
      this.queryState = validFormQuery;
      this.answerState = validFormAnswer;
      return validFormQuery && validFormAnswer;
    },
    resetModal() {
      this.query = "";
      this.answer = "";
      this.queryState = null;
      this.answerState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler

      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // post request
      var template = {
        query : this.query,
        answer : this.answer,
      }
      EventBus.$emit("handleCreateResponse",template);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-create");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>