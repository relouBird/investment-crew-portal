// Définition des types d'événements (optionnel, mais recommandé)
export type EventPayment = {
  id: string;
  status: number;
};

export type EventTransfer = {
  id: string;
  status: number;
};

// Fonction...
type FunctionEventPayment = (data: EventPayment) => void;
type FunctionEventTransfer = (data: EventTransfer) => void;

export type EventsProps = {
  "payment:started": FunctionEventPayment | EventPayment;
  "transfer:started": FunctionEventTransfer | EventTransfer;
  "payment:status": void;
  "transfer:status": void;
};
