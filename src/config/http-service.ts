import axios from "axios";

const HttpService = axios.create({
  headers: {
    Accept: "application/json",
    "content-type": "application/json; charset=utf-8",
    crossDomain: true,
    "Access-Control-Allow-Origin": "*",
    // Authorization: store.getState()?.login?.token || "",
  },
});


HttpService.interceptors.response.use(
  (response) => {
    if (!response || !response.data || response?.data?.Status === false) {
      return Promise.reject(response);
    }
    return Promise.resolve(response);
  },

  (error) => {
    return Promise.reject(error);
  },
  { synchronous: true }
);

export default HttpService;
