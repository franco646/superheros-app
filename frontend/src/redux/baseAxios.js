import axios from "axios";

let BASE_URL;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:8080";
}

const axe = axios.create({
  baseURL: BASE_URL,
});

export default axe;
