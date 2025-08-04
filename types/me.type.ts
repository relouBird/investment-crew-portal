import type { UserMetaData } from "./user.type";

export interface ChangePasswordPayload {
  password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface UpdateInfosPayload {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
}

export type MeResponse = {
  message: string;
  data: UserMetaData;
  email: string;
};

export type MeUpdateResponse = {
  message: string;
  data: UserMetaData;
  email: boolean;
};
