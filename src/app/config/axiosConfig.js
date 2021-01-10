import axios from "axios";

const baseUrl = "http://134.209.64.28:8080/";

axios.defaults.baseURL = baseUrl;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["X-Frame-Options"] = "sameorigin";
