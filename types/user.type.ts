export type LoginCredentialType = {
  email: string;
  password: string | null;
  remember?: boolean;
  guard: string;
};

export type RegisterCredentialType = {
  email: string;
  password: string;
  password_confirmation: string;
};

export type RegisterVerificationType = {
  email: string;
  password: string;
  otp: string;
};

export type ResetVerificationType = {
  email: string;
  otp: string;
};

type UserIdentity = {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
};

type NotificationsType = {
  email: boolean;
  push: boolean;
  betResults: boolean;
  promotions: boolean;
};

type AppMetadata = {
  provider: string;
  providers: string[];
};

export type UserMetaData = {
  firstName: string;
  lastName: string;
  generatedId: string;
  email: string;
  phone: string;
  country: string;
  twoFactorEnabled: boolean;
  notifications: NotificationsType;
  [key: string]: any; // Index signature pour permettre des propriétés supplémentaires
};


export type User = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetaData;
  identities: UserIdentity[];
  created_at: string;
  updated_at: string;
};

type Session = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: User;
};

export type UserData = {
  user: User;
  session: Session;
};

export type UserResponse = {
  message: string;
  data: UserData;
  verify: boolean;
};

export type UsersRegisterResponse = {
  message: string;
  data: RegisterCredentialType;
  verify?: boolean;
};
