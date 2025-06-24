import axios from "axios";
import { store } from "../store";
import { setCredentials, logout } from "../store/userSlice";

const api = axios.create({
  baseURL: "https://transcript-summarizer-1.onrender.com/api/v1",
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const state = store.getState();
      const { _id, name, email, accessToken, refreshToken } = state.user;

      try {
        const response = await axios.post(
          "https://transcript-summarizer-1.onrender.com/api/v1/auth/refresh-token",
          { refreshToken }
        );

        store.dispatch(
          setCredentials({
            _id,
            name,
            email,
            refreshToken,
            accessToken: response.data.accessToken,
          })
        );

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return api(originalRequest);
      } catch (error) {
        store.dispatch(logout());
        return Promise.reject(error);
      }
    }

    return Promise.reject(err);
  }
);

// Add request interceptor to inject token
api.interceptors.request.use((config) => {
  const token = store.getState().user.accessToken;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete config.headers["Authorization"];
  }
  return config;
});

export default api;
