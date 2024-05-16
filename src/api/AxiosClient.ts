import axios from "axios";

export const API_URL = "http://103.176.149.253:8088";

const axiosClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = "";

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return error;
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      // try {
      //   const rs = await axiosClient.post("auth/token/refresh/", {
      //     refresh: refreshToken,
      //   });
      //   console.log("rs", rs);
      //   return axiosClient(originalConfig);
      // } catch (_error) {
      //   return Promise.reject(_error);
      // }
    }

    return err.response;
  }
);

export default axiosClient;
