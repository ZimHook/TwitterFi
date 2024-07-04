import axios from "axios";

const request = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 0, // request timeout
});

const getJwt = () => {
  return localStorage.getItem("twitterfi_jwt");
};

request.defaults.baseURL = "https://api.tweetfi.cc/";

request.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + (getJwt() || "");
  return config;
});

request.interceptors.response.use(
  (res) => {
    return Promise.resolve(res.data);
  },
  (err) => {
    return Promise.resolve({ data: {}, code: -1 });
  }
);

export { request };
