import { HTTP } from "../../services";
import User from "../../models/user";

const state = {
  user: new User(),
  isLoading: null,
  message: "",
  type: ""
};

const getters = {
  user: (state) => state.user,
  isLoading: (state) => state.isLoading,
  message: (state) => state.message,
  type: (state) => state.type,
};

const mutations = {
  setUserProfile(state, userResponse) {
    const textGender = userResponse.gender ? "Male" : "FeMale";
    state.user.fullName = userResponse.fullName;
    state.user.email = userResponse.email;
    state.user.phone = userResponse.phone;
    state.user.gender = textGender;
    state.user.address = userResponse.address;
    state.user.phoneNumber = userResponse.phoneNumber;
    state.user.avatar = userResponse.avatar;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setSuccess(state) {
    state.message = "Update success";
    state.type = "alert-success";
  },
  setError(state) {
    state.message = "Update fail";
    state.type = 'alert-danger';
  },
  setClear(state) {
    state.message = "";
    state.type = "";
  },
};

const actions = {
  getProfile({ commit }) {
    HTTP.get("auth/me", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        commit("setUserProfile", response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  },
  updateProfile({ commit }, profile) {
    commit("setLoading", true)
    if (profile.gender === "Male") {
      profile.gender = true
    }
    else profile.gender = false;
    console.log(profile)
    HTTP.put("auth/editMe", profile,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        if (profile.gender === true) {
          profile.gender = "Male"
        }
        else profile.gender = "FeMale";
        commit("setUserProfile", profile);
        commit("setLoading", false)
        commit("setSuccess");
        setTimeout(() => {
          commit("setClear");
        }, 3000);

      })
      .catch((error) => {
        commit("setLoading", false)
        commit("setError");
        setTimeout(() => {
          commit("setClear");
        }, 3000);
        console.log(error.response.data);
      });
  }
};

export const profile = {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
