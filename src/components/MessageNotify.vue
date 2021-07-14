<template>
  <div class="mt-5 alert_message">
    <div v-if="message" :class="`alert ${type}`">
      {{ message }}
    </div>
  </div>
</template>
<script>
export default {
  props:{
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  }
};
</script>

<style lang="scss" scoped>
.alert_message{
  position: absolute;
  left: 65px;
}
</style>
