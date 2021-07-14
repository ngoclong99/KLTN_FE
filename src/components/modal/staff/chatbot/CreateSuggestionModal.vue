<template>
  <div>
    <b-modal
      id="modal-create-suggestion"
      ref="modal"
      title="Add Response Suggestion"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Query"
          label-for="query-input"
        >
          <b-form-input
            id="query-input"
            v-model="query"
            required
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Answer"
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
import { EventBus } from "../../../EventBus.js";
export default {
  data() {
    return {
      answer: "",
      answerState: null,
    };
  },
  props: {
    query: {
      type: String,
      required: true,
    },
  },
  methods: {
    checkFormValidity() {
      const validFormAnswer = this.$refs.formAnswer.checkValidity();
      this.answerState = validFormAnswer;
      return validFormAnswer;
    },
    resetModal() {
      this.answer = "";
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
        query: this.query,
        answer: this.answer,
      };
      EventBus.$emit("handleCreateSuggestion", template);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-create-suggestion");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>