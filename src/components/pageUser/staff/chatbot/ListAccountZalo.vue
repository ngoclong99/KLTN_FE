<template>
  <div class="mt-5">
    <b-list-group style="max-width: 300px">
      <b-list-group-item
        v-for="item in listAcc"
        :key="item.zalo_id"
        class="d-flex align-items-center"
      >
        <b-avatar
          variant="info"
          :src="item.avatar"
          class="mr-3"
        ></b-avatar>
        <span class="mr-auto">{{item.display_name}}</span>
        <b-badge>9</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("responseSuggestion", ["listAcc"]),
  },
};
</script>

<style lang="scss" scoped>
</style>
