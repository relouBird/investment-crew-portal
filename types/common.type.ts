import type { AxiosResponse } from "axios";

export type ServiceProps = {
  create?: (payload: any) => AxiosResponse | any;
  update?: (model: any, payload: any) => AxiosResponse | any;
  archive?: (model: any, payload: any) => AxiosResponse | any;
  remove?: (model: any, payload: any) => AxiosResponse | any;

  find?: (model: any, query: any) => AxiosResponse | any;
  fetch?: (query: any) => AxiosResponse | any;
  fetchAll?: () => AxiosResponse | any;

  createMany?: (payload: any) => AxiosResponse;
  updateMany?: (payload: any) => AxiosResponse;
  archiveMany?: (payload: any) => AxiosResponse;
  removeMany?: (payload: any) => AxiosResponse;

  [key: string]: any; // Index signature pour permettre des propriétés supplémentaires
};
