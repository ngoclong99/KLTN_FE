import moment from "moment";
import { HTTP } from "../../services";

const state = {
  listSDoctor: [],
  checkStatus: null,
  isBusy: false
};

const getters = {
  listSDoctor: (state) => state.listSDoctor,
  checkStatus: (state) => state.checkStatus,
  isBusy: (state) => state.isBusy,
};
const mutations = {
  listSDoctor(state, listDoctor) {
    const listDoctorAdd = listDoctor.map(function (doctor) {
      const add = Object.assign({}, doctor);
      add.status = true;
      return add;
    });
    state.listSDoctor = listDoctorAdd;
  },
  checkStatus(state, status) {
    state.checkStatus = status;
  },
  setIsBusy(state, isbusy) {
    state.isBusy = isbusy;
  }
};

const actions = {
  getListScheduleDoctor({ commit }) {
    commit("setIsBusy", true)
    HTTP.get("user/findAllDoctorAndIsDeleteFalse")
      .then((response) => {
        commit("setIsBusy", false)
        commit("listSDoctor", response.data);
      })
      .catch((error) => {
        commit("setIsBusy", false)
        console.log(error.response.data.message);
      });
  },
  getCalendarStatus({ commit }, data) {
    HTTP.post(
      "calendar/checkCalendarStatus",
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      },
      {
        doctorId: data.doctorId,
        startTime: data.startTime,
        endTime: data.endTime,
      }
    )
      .then((response) => {
        commit("checkStatus", response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  },
};

export const scheduleContent = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
