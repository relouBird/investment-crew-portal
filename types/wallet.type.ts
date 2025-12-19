import type { TransactionModel } from "./transaction.type";

export type PAYMENT_METHOD =
  | "cm.mtn"
  | "cm.orange"
  | "cm.mobile"
  | "paypal"
  | "card";
// export type PAYMENT_METHOD = "MTN" | "ORANGE";

export interface WalletModel {
  id: number;
  funds: number;
  growth: number;
  total_wins: number;
  created_at: string;
}

export interface RefillWalletType {
  transaction_number: string;
  service: PAYMENT_METHOD;
  amount: number;
}

export interface WalletTransactionInitInterface extends RefillWalletType {
  transaction_id: string;
  transaction_details: TransferResponse;
}

export interface WalletResponse {
  message: string;
  data: WalletModel;
}

export interface WalletTransactionInitResponse {
  message: string;
  data: WalletTransactionInitInterface;
}

//---------------------------------------
//--------------NOTCHPAY-----------------
//---------------------------------------

export type TransferResponse = {
  status: string;
  message: string;
  code: number;
  transfer: Transfer;
};

export type Transfer = {
  amount: number;
  amount_total: number;
  fee: number;
  converted_amount: number;
  business: Business;
  beneficiary: Beneficiary;
  description: string;
  reference: string;
  status: string;
  currency: string;
  initiated_at: string;
  updated_at: string;
};

export type Business = {
  id: string;
  country: string;
  email: string;
  phone: string;
  poster: null | string;
  name: string;
};

export type Beneficiary = {
  id: string;
  phone: string;
  name: null | string;
  email: null | string;
  country: string;
  channel: Channel;
  receiver: Receiver;
};

export type Channel = {
  name: string;
  type: string;
  id: TransferChannel;
};

export type TransferChannel = Exclude<PAYMENT_METHOD, "card">;

export type Receiver = {
  number: string;
};
