import Vue from "vue";
import { HTTP } from "../../services";

const state = {
  events: [],
  listCalendar: [],
  allListSchedule: [],
  listCalendarDoctor: [],

  isBusy: false,
  isBusy1: false,
  isLoading: false,
  isLoading: false,
};

const getters = {
  events: (state) => state.events,
  allListSchedule: (state) => state.allListSchedule,
  listCalendar: (state) => state.listCalendar,
  listCalendarDoctor: (state) => {
    const confirm = state.listCalendarDoctor.filter((item) => {
      return item.status == "CONFIRM";
    });
    return confirm;
  },
  listCalendarWaiting: (state) => {
    state.listCalendar.forEach;
  },
  listCalendarById: (state) => (patientId) => {
    const schedule = state.listCalendar.find(
      (item) => item.patientId === patientId
    );
    return schedule;
  },
  isBusy: (state) => state.isBusy,
  isBusy1: (state) => state.isBusy1,
  isLoading: (state) => state.isLoading,
};

const mutations = {
  addEvent(state, events) {
    return (state.events = events);
  },
  listCalendarDoctorBy(state, data) {
    return (state.listCalendarDoctor = data);
  },
  listCalendar(state, data) {
    data.forEach((element) => {
      Object.assign(element, {
        _showDetails: false,
      });
    });
    return (state.listCalendar = data);
  },
  // removeSchedule: (state, payload) => {
  //   state.listCalendar.forEach((item) => {
  //     if (item.patientId == payload.data.patient.userName) {
  //       const index = item.listCalendar.findIndex(
  //         (item) => item.id === payload.id
  //       );
  //       item.listCalendar.splice(index, 1);
  //     }
  //   });
  // },
  changeStatusSchedule: (state, payload) => {
    // state.listCalendar.forEach((item) => {
    //   if (item.patientId == payload.data.patient.userName) {
    //     const index = item.listCalendar.find((item) => item.id === payload.id);
    //     Object.assign(index, { status: payload.status });
    //   }
    // });
    // Vue.nextTick(() => {
    //   const index = state.allListSchedule.findIndex(
    //     (item) => item.id === payload.id
    //   );
    //   if (index !== -1) state.allListSchedule.splice(index, 1);
    // });
  },
  changeStatusApprove: (state, payload) => {
    state.listCalendar.forEach((item) => {
      if (item.patientId == payload.data.patient.userName) {
        const index = item.listCalendar.find((item) => item.id === payload.id);
        Object.assign(index, { status: payload.status });
      }
    });
    Vue.nextTick(() => {
      const index = state.allListSchedule.findIndex(
        (item) => item.id === payload.id
      );
      if (index !== -1) state.allListSchedule.splice(index, 1);
    });
  },
  setAllListSchedule(state, data) {
    data.forEach((element) => {
      Object.assign(element, {
        _showDetails: false,
        isOK: false,
        isCancel: false,
      });
    });
    state.allListSchedule = data;
  },

  setIsBusy(state, isBusy) {
    state.isBusy = isBusy;
  },
  setIsBusy1(state, isBusy) {
    state.isBusy1 = isBusy;
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
};

const actions = {
  getSchedule({ commit }) {
    HTTP.get("/calendar/myAppointment", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("addEvent", response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },
  getScheduleDoctor({ commit }) {
    HTTP.get("/calendar/myAppointmentDoctor", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("listCalendarDoctorBy", response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },
  getAllListCalendar({ commit }) {
    commit("setIsBusy1", true);
    HTTP.get("calendar/getAllListCalendar", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("setAllListSchedule", response.data);
        commit("setIsBusy1", false);
      })
      .catch((error) => {
        commit("setIsBusy1", false);
        alert(error.response.data.message);
      });
  },
  getAllSchedule({ commit }) {
    commit("setIsBusy", true);
    HTTP.get("calendar/patientListAppointment", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("listCalendar", response.data);
        commit("setIsBusy", false);
      })
      .catch((error) => {
        commit("setIsBusy", false);

        alert(error.response.data.message);
      });
  },
  removeSchedule({ commit }, payload) {
    HTTP.put(
      `calendar/changeStatusIsDelete/${payload.id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit("removeSchedule", {
          data: payload.data,
          id: payload.id,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },
  changeStatusSchedule({ commit }, payload) {
    HTTP.put(
      "calendar/changeStatusBookCalendar",
      {
        calendarID: payload.calendarID,
        status: payload.status,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        Object.assign(payload.schedule, { loadingStatus: false });
        commit("changeStatusSchedule", {
          id: payload.calendarID,
          status: payload.status,
          data: payload.data,
        });
      })
      .catch((error) => {
        Object.assign(payload.schedule, { loadingStatus: false });
        alert(error.response.data.message);
      });
  },
  approveSchedule({ commit }, payload) {
    HTTP.put(
      `calendar/approveAppointment/${payload.id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit("changeStatusApprove", {
          data: payload.data,
          id: payload.id,
          status: payload.status,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },
  cancelSchedule({ commit }, payload) {
    HTTP.put(
      `calendar/approveAppointment/${payload.id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => {
        commit("changeStatusApprove", {
          data: payload.data,
          id: payload.id,
          status: payload.status,
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },
};

export const calendarContent = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
