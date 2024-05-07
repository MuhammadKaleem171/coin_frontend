import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/",
  //latest code
});

const ResponseInterceptor = (response) => {
  return response.data;
};
const RequestInterceptor = (config) => {
  const token = window.localStorage.getItem("access_token");

  config.headers["authorization"] = "Bearer " + token;
  config.headers.Accept = "multipart/form-data";
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["ngrok-skip-browser-warning"] = true;
  return config;
};

axiosInstance.interceptors.request.use(RequestInterceptor);
axios.interceptors.response.use(
  function (response) {
    throw new axios.Cancel("Operation canceled by the user.");
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(ResponseInterceptor, (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      window.localStorage.removeItem("access_token");
    }
    if (axios?.isCancel(error)) {
      throw new axios.Cancel("Operation canceled by the user.");
    }

    return Promise.reject(error?.response?.data);
  } else if (error.request) {
    return Promise.reject(error);
  } else {
    return Promise.reject(error);
  }
});

export default axiosInstance;
