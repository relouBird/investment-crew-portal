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
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type TransactionState = "done" | "pending" | "failed";

export interface TransactionResponse {
  message: string;
  data: TransactionModel;
}

export interface TransactionCheckResponse {
  message: string;
  transaction: TransactionModel;
  wallet: WalletModel;
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

// -----------------------COMPOSABLE-----------------------//

// Type pour les statistiques de transactions
export interface TransactionStats {
  totalDeposits: number;
  totalWins: number;
  totalPending: number;
  totalFailed: number;
}

// Type pour l'évolution
export interface EvolutionData {
  digit: number;
  amount: string; // car .toFixed(2) retourne une chaîne
  percentage: string; // car .toFixed(1) + '%' retourne une chaîne
  isPositive: boolean;
}

// Type principal du retour
export interface TransactionComposableResponse {
  balance: number; // solde du wallet
  transactionStats: TransactionStats;
  evolution: EvolutionData;
  transactions: TransactionModel[];
}
