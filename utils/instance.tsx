import axios from "axios";

export const instance = axios.create({
  baseURL: "https://deploy.bssm.kro.kr/api",
});
