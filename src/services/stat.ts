import instance from "./ajax";
import { ResDataType } from "./ajax";

export async function getQuestionStatListService(
  questionId: string,
  opt: {
    page: number;
    pageSize: number;
  }
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  const data = (await instance.get(url, {
    params: opt,
  })) as ResDataType;
  return data;
  // return (await instance.get(`/api/stat/${questionId}`, {
  //   params: opt,
  // })) as ResDataType;
}
