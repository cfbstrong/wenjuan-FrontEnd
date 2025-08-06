import instance from "./ajax";
import { ResDataType } from "./ajax";

export async function getUserInfoService(): Promise<ResDataType> {
  const data = (await instance.get("/api/user/info")) as ResDataType;
  return data;
}

export async function loginService(
  username: string,
  password: string
): Promise<ResDataType> {
  const data = (await instance.post("/api/user/login", {
    username,
    password,
  })) as ResDataType;
  return data;
}

export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const data = (await instance.post("/api/user/register", {
    username,
    password,
    nickname: nickname ? nickname : username,
  })) as ResDataType;
  return data;
}
