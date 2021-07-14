<template>
  <div>
    <VueMonthlyPicker
      @input="getData"
      id="example-datepicker"
      v-model="value"
      class="mb-2"
    >
    </VueMonthlyPicker>
    <div
      class="alert alert-info "
      :class="loading ? 'loading' : 'hiden'"
      v-show="loading"
    >
      <font-awesome-icon
        icon="spinner"
        class="icon-form-m"
        spin
      />
      Loading...
    </div>
    <div>
      <canvas id="myChart" :class="loading ? 'hiden' : 'show'"></canvas>
    </div>
  </div>
</template>
<script>
import VueMonthlyPicker from "vue-monthly-picker";
import axios from "axios";
import Chart from "chart.js";
import moment from "moment";
export default {
  components: { VueMonthlyPicker },
  data() {
    return {
      value: "",
      chart: null,
      city: "",
      dates: [],
      temps: [],
      loading: false,
      errored: false,
    };
  },
  methods: {
    getData: function() {
      const month = moment(this.value).format("YYYY-MM");
      this.loading = true;
      if (this.chart != null) {
        this.chart.destroy();
      }
      axios
        .get(
          `https://clinicspringboot.herokuapp.com/api/v1/bill/findThongke/${month}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          const listDay = [];
          for (let index = 1; index <= response.data.length; index++) {
            listDay.push(index);
          }
          this.dates = listDay;
          this.temps = response.data.map((list) => {
            return list.value;
          });
          var ctx = document.getElementById("myChart");
          this.chart = new Chart(ctx, {
            type: "line",
            data: {
              labels: this.dates,
              datasets: [
                {
                  label: "Monney",
                  backgroundColor: "rgba(54, 162, 235, 0.5)",
                  borderColor: "rgb(54, 162, 235)",
                  fill: false,
                  data: this.temps,
                },
              ],
            },
            options: {
              title: {
                display: true,
                text: "Statistical Month",
              },
            },
          });
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
  },
  created() {
    const date = new Date();
    this.value = moment(date).format("YYYY-MM");
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
#myChart {
  height: 450px !important;
}
.loading {
  height: 100vh;
}
.hiden {
  display: none;
}
.show {
  display: block;
}
#example-datepicker {
  max-width: 250px;
}
</style>
