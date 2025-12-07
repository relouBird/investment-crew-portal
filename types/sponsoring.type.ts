export interface SponsoringModel {
  id?: number | string;
  sponsor_id: string;
  initials: string;
  name: string;
  email: string;
  firstDeposit: boolean;
}

export interface SponsoringModelResponse {
  message: string;
  data: SponsoringModel[];
}
