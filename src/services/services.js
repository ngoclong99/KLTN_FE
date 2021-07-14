import axios from "axios";

const API_URL = "https://clinicspringboot.herokuapp.com/api/v1/";
export const HTTP = axios.create({
  baseURL: API_URL,
});


