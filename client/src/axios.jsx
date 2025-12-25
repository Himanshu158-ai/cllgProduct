import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const original = error.config;

    if (error.response.status === 403 && !original._retry) {
      original._retry = true;

      await api.post("/refresh");

      return api(original);
    }

    return Promise.reject(error);
  }
);

export default api;
