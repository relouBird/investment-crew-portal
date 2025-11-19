export type PAYMENT_METHOD = "cm.mtn" | "cm.orange";
// export type PAYMENT_METHOD = "MTN" | "ORANGE";

export interface WalletInterface {
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

export interface UserWalletTransaction {
  id: number;
  transaction_id: string;
  creator_id: string;
  amount: number;
  type: "deposit" | "withdrawal" | "transfer";
  status: "done" | "pending" | "failed";
  created_at: string | Date;
}

export interface WalletTransactionInitInterface extends RefillWalletType {
  transaction_id: string;
}

export interface WalletResponse {
  message: string;
  data: WalletInterface;
}

export interface TransactionInitResponse {
  message: string;
  data: WalletTransactionInitInterface;
}

export interface TransactionResponse {
  message: string;
  wallet: WalletInterface;
  transaction: UserWalletTransaction;
}