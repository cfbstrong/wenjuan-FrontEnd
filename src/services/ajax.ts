import axios from "axios";
import { message } from "antd";
import { getToken } from "../utils/user-token";

const instance = axios.create({
  timeout: 100000,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

instance.interceptors.response.use((response) => {
  const resData = (response.data || {}) as ResType;
  const { errno, msg, data } = resData;
  if (errno !== 0) {
    if (msg) {
      message.error(msg);
    }
    throw new Error(msg);
  } else {
    return data as any;
  }
});

export default instance;

export type ResType = {
  errno: number;
  msg?: string;
  data?: ResDataType;
};

export type ResDataType = {
  [key: string]: any;
};
