export const blank = (value: any) => {
  if (value === null || value === undefined || value === "") return true;
  return Array.isArray(value) && value.length === 0;
};

export const isObject = (obj: any) =>
  obj !== null && !!obj && typeof obj === "object" && !Array.isArray(obj);

export const getIdForRequest = (
  model: any,
  primaryKey: string = "id"
): number | string => {
  return isObject(model) ? model[primaryKey] : model;
};

export const formatCurrency = (
  amount: number,
  isCurrency: boolean = true
): string => {
  return (
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount) + (isCurrency ? " &#x244;" : "")
  );
};

export const getMonthsPassed = (timestamp: string): string => {
  const givenDate = new Date(timestamp);
  const currentDate = new Date();

  if (isNaN(givenDate.getTime())) return "Date invalide";

  let yearsDiff = currentDate.getFullYear() - givenDate.getFullYear();
  let monthsDiff = currentDate.getMonth() - givenDate.getMonth();

  // Ajustement si le jour du mois n'est pas encore atteint
  if (currentDate.getDate() < givenDate.getDate()) {
    monthsDiff -= 1;
  }

  let totalMonths = yearsDiff * 12 + monthsDiff;

  if (totalMonths < 0) return "0 jour";

  // Si moins d'un mois complet, on calcule les jours
  if (totalMonths === 0) {
    const diffDays = Math.floor(
      (currentDate.getTime() - givenDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffDays <= 1 ? `${diffDays} jour` : `${diffDays} jours`;
  }

  if (totalMonths < 12) {
    return totalMonths === 1 ? "1 mois" : `${totalMonths} mois`;
  }

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  if (remainingMonths === 0) {
    return years === 1 ? "1 an" : `${years} ans`;
  } else {
    return `${years} an${years > 1 ? "s" : ""} et ${remainingMonths} mois`;
  }
};

export const formatAmount = (
  amount: any,
  options = {
    separator: "",
    currency: "XAF",
  }
) => {
  let { currency, separator } = options;

  amount = Number.isNaN(amount) || blank(amount) ? 0 : Number(amount);

  return (amount ?? 0).toLocaleString("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    // ...options
  });
};

export const formatDate = (
  date: Date | string | number | null | undefined,
  format: string = "dddd D MMMM YYYY",
  locale: string = "fr-FR"
): string => {
  // Gestion des valeurs nulles ou indéfinies
  if (!date) return "";

  // Conversion en objet Date
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  // Formats prédéfinis pour une utilisation facile
  const formatPresets: Record<string, Intl.DateTimeFormatOptions> = {
    // Formats complets
    full: { dateStyle: "full", timeStyle: "long" },
    long: { dateStyle: "long", timeStyle: "short" },
    medium: { dateStyle: "medium", timeStyle: "medium" },
    short: { dateStyle: "short", timeStyle: "short" },

    // Formats date seulement
    "full-date": { dateStyle: "full" },
    "long-date": { dateStyle: "long" },
    "medium-date": { dateStyle: "medium" },
    "short-date": { dateStyle: "short" },

    // Formats time seulement
    "full-time": { timeStyle: "full" },
    "long-time": { timeStyle: "long" },
    "medium-time": { timeStyle: "medium" },
    "short-time": { timeStyle: "short" },

    // Formats personnalisés courants
    "dddd D MMMM YYYY": {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
    "DD/MM/YYYY": {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
    "DD/MM/YYYY HH:mm": {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
    "YYYY-MM-DD": {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
    "DD MMM YYYY": {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
    "DD MMM": {
      day: "2-digit",
      month: "short",
    },
    "DD MMM YY": {
      day: "numeric",
      month: "short",
      year: "2-digit",
    },
    "HH:mm:ss": {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    },
    "HH:mm": {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
  };

  // Si le format correspond à un préréglage, l'utiliser
  if (formatPresets[format]) {
    return new Intl.DateTimeFormat(locale, formatPresets[format]).format(d);
  }

  // Support des formats personnalisés avec pattern matching
  const customOptions: Intl.DateTimeFormatOptions = {};
  let hour12: boolean | undefined = undefined;

  // Détection des options basée sur le format string
  if (format.includes("dddd")) customOptions.weekday = "long";
  else if (format.includes("ddd")) customOptions.weekday = "short";
  else if (format.includes("dd")) customOptions.weekday = "short";

  if (format.includes("MMMM")) customOptions.month = "long";
  else if (format.includes("MMM")) customOptions.month = "short";
  else if (format.includes("MM")) customOptions.month = "2-digit";
  else if (format.includes("M")) customOptions.month = "numeric";

  if (format.includes("DD")) customOptions.day = "2-digit";
  else if (format.includes("D")) customOptions.day = "numeric";

  if (format.includes("YYYY")) customOptions.year = "numeric";
  else if (format.includes("YY")) customOptions.year = "2-digit";

  if (format.includes("HH")) {
    customOptions.hour = "2-digit";
    customOptions.hour12 = false;
  } else if (format.includes("hh")) {
    customOptions.hour = "2-digit";
    customOptions.hour12 = true;
  } else if (format.includes("H")) {
    customOptions.hour = "numeric";
    customOptions.hour12 = false;
  } else if (format.includes("h")) {
    customOptions.hour = "numeric";
    customOptions.hour12 = true;
  }

  if (format.includes("mm")) customOptions.minute = "2-digit";
  else if (format.includes("m")) customOptions.minute = "numeric";

  if (format.includes("ss")) customOptions.second = "2-digit";
  else if (format.includes("s")) customOptions.second = "numeric";

  if (format.includes("A") || format.includes("a")) {
    customOptions.hour12 = true;
  }

  // Si des options de timezone sont détectées
  if (format.includes("Z") || format.includes("z")) {
    customOptions.timeZoneName = "short";
  }

  return new Intl.DateTimeFormat(locale, customOptions).format(d);
};
