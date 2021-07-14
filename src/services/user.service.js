// Lấy token
import { authHeader } from "../router/auth-header";
import axios from "axios";
import { HTTP } from "./services";

export const userService = {
  login,
  // logout,
  // getuser,
  // checktoken,
  // show,
  // createCampaign,
};

// Hàm Login API
function login(userName, password) {
  return HTTP
    .post("login", {
      userName: userName,
      password: password,
    })
    .then((response) => {
      if (response.data.token) {
        // Gắn giá trị response.data.token với viên " token "
        localStorage.setItem("token", response.data.token);
        console.log( response.data.token);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// function logout() {
//   axios.post(
//     apiUrl + "logout",
//     {},
//     {
//       headers: authHeader(),
//     }
//   );
// }

// function getuser() {
//   return axios
//     .post(
//       apiUrl + "auth",
//       {},
//       {
//         headers: authHeader(),
//       }
//     )
//     .then((response) => {
//       return response;
//     });
// }

// function checktoken() {
//   return axios
//     .post(
//       apiUrl + "checktoken",
//       {},
//       {
//         headers: authHeader(),
//       }
//     )
//     .then((response) => {
//       if (response) {
//         return true;
//       }
//     })
//     .catch(function(error) {
//       if (error.response) {
//         return false;
//       }
//     });
// }
// function show() {
//   return axios.get(apiUrl + "campaign", {
//     headers: authHeader(),
//   });
// }
// function createCampaign(
//   name,
//   startDate,
//   endDate,
//   selectedStatus,
//   budget,
//   bidAmount
// ) {
//   return axios.post(
//     apiUrl + "campaign",
//     {
//       name: name,
//       start_date: startDate,
//       end_date: endDate,
//       status: selectedStatus,
//       overall_budget: budget,
//       bid_amount: bidAmount,
//     },
//     {
//       headers: authHeader(),
//     }
//   );
// }
