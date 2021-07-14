<template>
  <input type="date" id="day" name="day" v-model="dateDefault" />
</template>
<script>
import { EventBus } from "../../EventBus";

export default {
  watch: {
    dateDefault() {
      let date = this.dateDefault;
      EventBus.$emit("dateDefault", date);
    },
  },
  data() {
    return {
      dateDefault: "",
    };
  },
};
</script>
<style lang="scss" scoped>
#day {
  border: none;
  &:focus {
    outline: none;
  }
}
@mixin icon {
  color: var(--bg-color-main);
  cursor: pointer;
  &:hover {
    color: black;
  }
}

.icon-user {
  @include icon();
}
.icon-edit {
  @include icon();
  margin-left: 10px;
}
</style>
