import type { RefillWalletType } from "~/types/wallet.type";

interface WalletFormDeposit {
  phone: string;
  amount: number;
  payment: string;
}

export function WalletDepositConversion(data: WalletFormDeposit) {
  return {
    transaction_number: "+237" + String(data.phone),
    amount: data.amount,
    service: data.payment,
  } as RefillWalletType;
}
