import axios from "axios";
import { useStore } from "../store/useStore";

export const API = axios.create({
  baseURL: "https://org-ave-jimmy-learners.trycloudflare.com",
});

API.interceptors.request.use((config) => {
  const { access } = useStore.getState();

  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});
