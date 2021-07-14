<template>
  <div>
    <b-modal
      id="modal-1"
      :title="title"
      size="sm"
      buttonSize="sm"
      okVariant="danger"
      okTitle="YES"
      cancelTitle="NO"
      footerClass="p-2"
      :hideHeaderClose="false"
      :centered="true"
      @ok="handleDelete"
    >
      <div class="d-block">{{ content }}</div>
    </b-modal>
  </div>
</template>

<script>
import { EventBus } from "../EventBus.js";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleDelete(){
      EventBus.$emit('handleDelete',this.query)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>