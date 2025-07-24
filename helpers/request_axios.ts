import type { AxiosResponse } from "axios";

export const request = async (
  uri: string,
  options: any = {}
): Promise<AxiosResponse> => {
  options.url = uri;
  const { api } = axiosBuilder() as any;
  return await api.request(options);
};

