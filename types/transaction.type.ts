import type { WalletModel } from "./wallet.type";

export enum TRANSACTION_STATUS_TYPE {
  DONE = "done",
  PENDING = "pending",
  FAILED = "failed",
}

export enum TRANSACTION_TYPE {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  TRANSFER = "transfer",
  GAIN = "bet_win",
  LOSS = "bet_loss",
}

export interface TransactionModel {
  id?: string;
  transaction_id: string;
  creator_id: string;
  description: string;
  amount: number;
  type: "deposit" | "withdrawal" | "transfer" | "bet_win" | "bet_loss";
  status: TransactionState;
  created_at: string | Date;
}

export type TransactionState = "done" | "pending" | "failed";

export interface TransactionResponse {
  message: string;
  data: TransactionModel;
}

export interface TransactionsResponse {
  message: string;
  data: TransactionModel[];
}

export interface TransactionCheckResponse {
  message: string;
  wallet: WalletModel;
  transaction: TransactionModel;
}
