import axios from "axios";

export default axios.create({
  baseURL: "https://api-cloud.browserstack.com/app-live/",
})