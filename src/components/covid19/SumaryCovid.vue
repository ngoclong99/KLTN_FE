<template>
  <div>
    <b-row>
      <b-col>
        <ChartCommon
          :width="800"
          :options="options"
          :series="series"
        ></ChartCommon>
      </b-col>
      <b-col>
        <b-row>
          <b-form-select
            @change="getCountryData()"
            v-model="selected"
            :options="countries"
            class="mb-3"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>
        </b-row>
        <b-row
          ><h4 >{{ selected }}</h4></b-row
        >
        <b-row><img :src="countryFlag" alt="" /></b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import ChartCommon from "../chart/ChartCommon.vue";
export default {
  components: {
    ChartCommon,
  },
  data() {
    return {
      countries: [],
      selected: "Vietnam",
      selectedISO3: "",
      countryFlag: "",
      countryInfo: {},
      countryData: null,

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

      confirmed: [],
      deaths: [],
      recovered: [],
    };
  },
  methods: {
    async getCountryNames() {
      const { data } = await axios.get(
        "https://corona.lmao.ninja/v2/countries?sort=country"
      );
      this.globalData = data;
      this.countryData = data[this.selected];
      data.forEach((country) => {
        this.countries.push(country.country);
      });
    },
    async getCountryData() {
      const { data } = await axios.get(
        `https://corona.lmao.ninja/v2/countries/${this.selected}`
      );
      this.countryData = data;
      this.countryInfo = data.countryInfo;
      this.countryFlag = data.countryInfo.flag;
      this.selectedISO3 = data.countryInfo.iso3;
      this.getCountryHistory();
    },
    async getCountryHistory() {
      const { data } = await axios.get(
        `https://covidapi.info/api/v1/country/${this.selectedISO3}`
      );

      this.confirmed = [];
      this.deaths = [];
      this.recovered = [];

      for (let [key, value] of Object.entries(data.result)) {
        var arr0 = [];
        var arr1 = [];
        var arr2 = [];

        arr0[0] = key;
        arr0[1] = value.confirmed;
        this.confirmed.push(arr0);

        arr1[0] = key;
        arr1[1] = value.deaths;
        this.deaths.push(arr1);

        arr2[0] = key;
        arr2[1] = value.recovered;
        this.recovered.push(arr2);
      }
      this.setDataSeries();
    },
    setDataSeries() {
      this.series = [
        {
          name: "Comfirm",
          data: this.confirmed,
        },
        {
          name: "Deaths",
          data: this.deaths,
        },
        {
          name: "Recovered",
          data: this.recovered,
        },
      ];
    },
  },
  created() {
    this.getCountryNames();
    this.getCountryData();
  },
};
</script>

<style>
</style>