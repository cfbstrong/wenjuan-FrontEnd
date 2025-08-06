import instance from "./ajax";
import { ResDataType } from "./ajax";

type SeacrchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  //用于分页
  page: number;
  pageSize: number;
};

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

//获取问卷列表
export async function getQuestionListService(
  seacrchOption: Partial<SeacrchOption> = {}
): Promise<ResDataType> {
  const data = (await instance.get(`/api/question`, {
    params: seacrchOption,
  })) as ResDataType;
  return data;
}

//更新单个问卷
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const data = instance.patch(`/api/question/${id}`, {
    opt,
  }) as ResDataType;
  return data;
}

//复制问卷
export async function duplicateQuestionService(
  id: string
): Promise<ResDataType> {
  const data = (await instance.post(
    `/api/question/duplicate/${id}`
  )) as ResDataType;
  return data;
}

//批量删除问卷
export async function deleteQuestionService(
  ids: string[]
): Promise<ResDataType> {
  const data = (await instance.delete(`/api/question`, {
    data: {
      ids,
    },
  })) as ResDataType;
  return data;
}
