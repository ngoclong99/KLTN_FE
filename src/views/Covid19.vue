<template>
  <div class="container mt-5 mb-5" id="">
    <div class="row">
      <h1>Summary Covid 19</h1>
      <hr />
      <b-tabs content-class="mt-3" class="mytabs">
        <b-tab title="Sumary" active>
          <ChartCommon :width="1150" :options="options" :series="series"></ChartCommon>
        </b-tab>
        <b-tab title="country">
          <SumaryCovid></SumaryCovid>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SumaryCovid from "../components/covid19/SumaryCovid.vue";
import ChartCommon from "../components/chart/ChartCommon.vue";
export default {
  components: {
    SumaryCovid,
    ChartCommon
  },
  data() {
    return {
      series: [
        {
          name: "Comfirm",
          data: [],
        },
        {
          name: "Deaths",
          data: [],
        },
        {
          name: "Recovered",
          data: [],
        },
      ],
      options: {
        colors: ["red", "purple", "green"],
        chart: {
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "datetime",
          min: new Date("2020 Jan 23").getTime(),
          tickAmount: 10,
        },
        tooltip: {
          x: {
            format: "yyyy-MM-dd",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.1,
            stops: [0, 100],
          },
        },
      },
    };
  },
  methods: {
    async setSumaryData() {
      const { data } = await axios.get(
        "https://covidapi.info/api/v1/global/count"
      );
      
      for (let [key, value] of Object.entries(data.result)) {
        var arr0 = [];
        var arr1 = [];
        var arr2 = [];

        arr0[0] = key;
        arr0[1] = value.confirmed;
        this.series[0].data.push(arr0);

        arr1[0] = key;
        arr1[1] = value.deaths;
        this.series[1].data.push(arr1);

        arr2[0] = key;
        arr2[1] = value.recovered;
        this.series[2].data.push(arr2);
      }
      
    },
  },
  created() {
    this.setSumaryData();
  },
};
</script>

<style scoped>
.tab-title-class {
  color: #af7a7a !important;
}
</style>