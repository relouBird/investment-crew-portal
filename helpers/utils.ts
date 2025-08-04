export function areObjectsDifferent(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): boolean {
  const keys = Object.keys(obj1);

  for (const key of keys) {
    if (obj1[key] !== obj2[key]) {
      return true; // au moins une différence
    }
  }

  return false; // tout est identique
}

export function formatDateFirstType(dateString: Date | string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateThirdType(dateString: Date | string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

export function formatDateSecondType(date: string): string {
  const dateF = new Date(date);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateF);
}

export function timeSince(date: Date | string): string {
  const now = new Date();
  const inputDate = typeof date === "string" ? new Date(date) : date;

  const seconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

  if (seconds < 60) return `${seconds} s`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} d`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} m`;

  const years = Math.floor(months / 12);
  return `${years}y`;
}

// Methods
export const formatBalance = (amount: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
