// Définition des types d'événements (optionnel, mais recommandé)
export type EventPayment = {
  id: string;
  status: number;
};
// Fonction...
type FunctionEventPayment = (data: EventPayment) => void;

export type EventsProps = {
  "payment:started": FunctionEventPayment | EventPayment;
  "payment:status": void;
};
