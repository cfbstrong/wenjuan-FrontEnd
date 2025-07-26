import instance from "./ajax";
import { ResDataType } from "./ajax";

export async function getQuestionService(id: string): Promise<ResDataType> {
  const data = (await instance.get(`/api/question/${id}`)) as ResDataType;
  return data;
}
