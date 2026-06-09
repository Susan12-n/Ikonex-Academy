import axios from "axios";

const API = axios.create({
  baseURL: `${API_URL}/api`,
});

export default API;