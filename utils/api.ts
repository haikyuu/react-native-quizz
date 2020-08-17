import axios from "axios";

const api = axios.create({
  baseURL: "https://opentdb.com/api.php",
});

export default api;
