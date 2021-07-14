<template>
  <div>
    <b-form-textarea
      id="textarea"
      placeholder="Enter something..."
      max-rows="6"
      @input="changeDesService(data.id, $event)"
    ></b-form-textarea>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getResultService: "serviceContent/getResultService",
    }),
  },
  methods: {
    changeDesService(id, event) {
      const service = this.getResultService(id);
      const value = event;
      Object.assign(service, { description: value });
      this.$store.commit("serviceContent/editResultService", service);
    },
  },
};
</script>
<style lang="scss" scoped></style>
