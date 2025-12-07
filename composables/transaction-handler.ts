import {
  CashIcon,
  CircleXIcon,
  CreditCardIcon,
  TransferInIcon,
  TrendingDown2Icon,
  TrendingDownIcon,
  TrendingUpIcon,
  TrophyIcon,
} from "vue-tabler-icons";
import {
  TRANSACTION_STATUS_TYPE,
  TRANSACTION_TYPE,
  type TransactionModel,
  type TransactionState,
} from "~/types/transaction.type";

const transactionComposable = (transactions: Ref<TransactionModel[]>) => {
  const failedTransactions = transactions.value.filter(
    (trans) => trans.status == TRANSACTION_STATUS_TYPE.FAILED
  );

  const awaitingTransactions = transactions.value.filter(
    (trans) => trans.status == TRANSACTION_STATUS_TYPE.PENDING
  );

  const doneTransactions = transactions.value.filter(
    (trans) => trans.status == TRANSACTION_STATUS_TYPE.DONE
  );

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

  // Statistiques calculées
  const balance = computed(() => {
    let balance = 0;
    transactions.value.forEach((transaction) => {
      if (transaction.status == TRANSACTION_STATUS_TYPE.DONE) {
        switch (transaction.type) {
          case TRANSACTION_TYPE.DEPOSIT:
            balance += transaction.amount;
            break;
          case TRANSACTION_TYPE.WITHDRAWAL:
            balance -= transaction.amount;
            break;
          case TRANSACTION_TYPE.GAIN:
            balance += transaction.amount;
            break;
          case TRANSACTION_TYPE.LOSS:
            balance -= transaction.amount;
            break;
        }
      }
    });

    return balance;
  });

  const transactionStats = computed(() => {
    const stats = {
      totalDeposits: 0,
      totalWins: 0,
      totalPending: 0,
      totalFailed: 0,
    };

    transactions.value.forEach((transaction) => {
      const amount = transaction.amount;

      switch (transaction.status) {
        case TRANSACTION_STATUS_TYPE.DONE:
          stats.totalDeposits += amount;
          break;
        case TRANSACTION_STATUS_TYPE.PENDING:
          stats.totalPending += amount;
          break;
        case TRANSACTION_STATUS_TYPE.FAILED:
          stats.totalFailed += amount;
          break;
      }
    });

    transactions.value.forEach((tx) => {
      if (
        tx.type === TRANSACTION_TYPE.GAIN
      ) {
        stats.totalWins += tx.amount;
      }
    });

    return stats;
  });

  const evolution = computed(
    // Calculer l'évolution du solde sur les 30 derniers jours
    () => {
      let totalIncome = 0;
      let totalExpenses = 0;

      transactions.value.forEach((tx) => {
        if (
          tx.type === TRANSACTION_TYPE.DEPOSIT ||
          tx.type === TRANSACTION_TYPE.GAIN
        ) {
          totalIncome += tx.amount;
        } else {
          totalExpenses += tx.amount;
        }
      });

      const evolution = totalIncome - totalExpenses;
      const percentage = (evolution / (totalIncome + totalExpenses)) * 100 || 0;

      return {
        amount: evolution.toFixed(2),
        percentage: percentage.toFixed(1) + "%",
        isPositive: evolution >= 0,
        icon: evolution >= 0 ? TrendingUpIcon : TrendingDownIcon,
        color: evolution >= 0 ? "success" : "error",
      };
    }
  );

  return {
    // Montants
    balance,
    transactionStats,
    evolution,
    // Filtres
    awaitingTransactions,
    doneTransactions,
    failedTransactions,
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
