<template>
  <apexchart
    class="mt-5"
    v-if="series[0].data.length > 0"
    id="mychart"
    height="300"
    :width="width"
    type="area"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  props: {
    series: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style>
</style>