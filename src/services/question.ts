import instance from "./ajax";
import { ResDataType } from "./ajax";

//获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const data = (await instance.get(`/api/question/${id}`)) as ResDataType;
  return data;
}

//创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const data = (await instance.post("/api/question")) as ResDataType;
  return data;
}
