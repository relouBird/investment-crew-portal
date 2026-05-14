import {
  CashIcon,
  CircleXIcon,
  CreditCardIcon,
  TransferInIcon,
  TrendingDown2Icon,
  TrophyIcon,
} from "vue-tabler-icons";
import {
  TRANSACTION_TYPE,
  type TransactionState,
} from "~/types/transaction.type";

const transactionComposable = () => {

  // Utilitaires pour l'affichage
  const getTransactionColor = (type: TRANSACTION_TYPE | string) => {
    const colors: Record<TRANSACTION_TYPE, string> = {
      [TRANSACTION_TYPE.DEPOSIT]: "success",
      [TRANSACTION_TYPE.WITHDRAWAL]: "orange",
      [TRANSACTION_TYPE.TRANSFER]: "info",
      [TRANSACTION_TYPE.GAIN]: "green",
      [TRANSACTION_TYPE.LOSS]: "error",
    };
    return colors[type as TRANSACTION_TYPE] || "grey";
  };

  const getTransactionIcon = (type: TRANSACTION_TYPE | string) => {
    const icons: Record<TRANSACTION_TYPE, any> = {
      [TRANSACTION_TYPE.DEPOSIT]: CreditCardIcon,
      [TRANSACTION_TYPE.WITHDRAWAL]: CashIcon,
      [TRANSACTION_TYPE.TRANSFER]: TransferInIcon,
      [TRANSACTION_TYPE.GAIN]: TrophyIcon,
      [TRANSACTION_TYPE.LOSS]: TrendingDown2Icon,
    };
    return icons[type as TRANSACTION_TYPE] || CircleXIcon;
  };

  const getTransactionLabel = (type: TRANSACTION_TYPE | string) => {
    const labels: Record<TRANSACTION_TYPE, string> = {
      [TRANSACTION_TYPE.DEPOSIT]: "Dépôt",
      [TRANSACTION_TYPE.WITHDRAWAL]: "Retrait",
      [TRANSACTION_TYPE.TRANSFER]: "Virement",
      [TRANSACTION_TYPE.GAIN]: "Gain",
      [TRANSACTION_TYPE.LOSS]: "Perte",
    };
    return labels[type as TRANSACTION_TYPE] || type;
  };

  const getAmountClass = (type: TRANSACTION_TYPE | string) => {
    return type === TRANSACTION_TYPE.DEPOSIT || type === TRANSACTION_TYPE.GAIN
      ? "text-success"
      : "text-error";
  };
  const getAmountSign = (type: TRANSACTION_TYPE | string) => {
    return type === TRANSACTION_TYPE.DEPOSIT || type === TRANSACTION_TYPE.GAIN
      ? "+ "
      : "- ";
  };

  const getStatusColor = (status: TransactionState) => {
    const colors: Record<TransactionState, string> = {
      done: "success",
      pending: "warning",
      failed: "error",
    };
    return colors[status] || "grey";
  };

  const getStatusLabel = (status: TransactionState) => {
    const labels: Record<TransactionState, string> = {
      done: "Terminé",
      pending: "En attente",
      failed: "Échoué",
    };
    return labels[status] || status;
  };


  return {
    // Getters
    getTransactionColor,
    getTransactionIcon,
    getTransactionLabel,
    getAmountClass,
    getAmountSign,
    getStatusColor,
    getStatusLabel,
  };
};

export default transactionComposable;
