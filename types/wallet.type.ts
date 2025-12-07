import type { TransactionModel } from "./transaction.type";

export type PAYMENT_METHOD = "cm.mtn" | "cm.orange";
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
}

export interface WalletResponse {
  message: string;
  data: WalletModel;
}

export interface WalletTransactionInitResponse {
  message: string;
  data: WalletTransactionInitInterface;
}