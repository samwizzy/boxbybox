import axios from "axios";

const baseUrl = "http://134.209.64.28:8080/";

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["X-Frame-Options"] = "sameorigin";

// delete axios.defaults.headers.common["Authorization"];
// console.log(axios.defaults.headers.common, "axios.defaults.headers.common");
