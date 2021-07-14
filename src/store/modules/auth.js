import { HTTP } from "../../services";
import User from "../../models/user";
import router from "../../router/";

const token = localStorage.getItem("token");

const state = token
  ? {
      loggedIn: true,
      username: JSON.parse(atob(token.split(".")[1])).sub,
      token,
      user: new User(),
      isLoading: false,
      validate: null,
    }
  : {
      loggedIn: false,
      username: "",
      token: null,
      user: new User(),
      isLoading: false,
      validate: null,
    };

const getters = {
  loggedIn: (state) => state.loggedIn,
  username: (state) => state.username,
  token: (state) => state.token,
  user: (state) => state.user,
  isLoading: (state) => state.isLoading,
};

// Trạng thái của account
const mutations = {
  loginRequest(state, token, username) {
    state.status = { loggingIn: true };
    state.token = token;
    state.username = username;
  },
  loginSuccess(state, token, username) {
    state.status = { loggedIn: true };
    state.token = token;
    state.username = username;
  },
  loginFailure(state) {
    state.status = {};
    state.token = null;
    state.username = null;
  },
  logout(state) {
    state.status = {};
    state.username = null;
    state.token = null;
  },
  setIsLoading(state, isloading) {
    state.isLoading = isloading;
  },
};

const actions = {
  register({ commit }, user) {
    HTTP.post("auth/register", {
      userName: user.userName,
      password: user.password,
      email: user.email,
      gender: user.gender,
      address: user.address,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
    })
      .then((response) => {
        // this.$router.push("/login");
        router.push('/login');
        console.log(response.data.message);
      })
      .catch((error) => {
        // console.log(error.response);
        commit('alert/setMessageError', error.response.data.message, { root: true });
        setTimeout(() => {
          commit('alert/clearMessage', "",{ root: true });
        }, 3000);
        commit("setIsLoading", false);
      });
  },
};

export const auth = {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
