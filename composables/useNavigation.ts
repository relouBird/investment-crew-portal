// composables/useRouteHistory.ts
import { useRouter } from "vue-router";
import type { SeoMetaOptions } from "~/types";

export function useNavigation() {
  const router = useRouter();
  const routeHistory = ref<string[]>([]);
  const currentRouteIndex = ref(-1);

  // Surveiller les changements de route
  watch(
    () => router?.currentRoute.value.fullPath,
    (newRoute, oldRoute) => {
      if (oldRoute && newRoute !== oldRoute) {
        routeHistory.value.push(oldRoute);
        currentRouteIndex.value = routeHistory.value.length - 1;
      }
    },
    { immediate: true }
  );

  // Récupérer la dernière route
  function getLastRoute(): string | null {
    if (routeHistory.value.length > 0) {
      return routeHistory.value[routeHistory.value.length - 1];
    }
    return null;
  }

  // Récupérer la route N positions avant
  function getRouteAt(index: number): string | null {
    const targetIndex = routeHistory.value.length - 1 - index;
    if (targetIndex >= 0 && targetIndex < routeHistory.value.length) {
      return routeHistory.value[targetIndex];
    }
    return null;
  }

  // Retourner à une route spécifique
  function goToPreviousRoute(fallback: string = "/"): void {
    const lastRoute = getLastRoute();
    if (lastRoute) {
      router.push(lastRoute);
      // Retirer de l'historique après navigation
      routeHistory.value.pop();
    } else {
      router.push(fallback);
    }
  }

  /**
   * Helper pour formater les métadonnées SEO avec préfixes cohérents.
   *
   * - Préfixe toujours `Lekruu - ...` pour le titre.
   * - Préfixe toujours `companyName - ...` pour subtitle et description.
   * - Si `forcePrefix = false`, le helper détecte si c’est déjà préfixé.
   */
  function formatSeoMeta({
    title = null,
    subtitle = null,
    description = null,
    forcePrefix = false,
  }: SeoMetaOptions) {
    const brandName = "Investia";

    // --- Helpers internes
    const hasPrefix = (value: string, prefix: string) =>
      value?.trim().toLowerCase().startsWith(prefix.toLowerCase());

    const prefixValue = (
      value: string | null,
      prefix: string
    ): string | null => {
      if (!value) return null;
      if (forcePrefix) return `${prefix} - ${value}`;
      return hasPrefix(value, prefix) ? value : `${prefix} - ${value}`;
    };

    // --- Construction
    const formattedTitle = title ? prefixValue(title, brandName) : brandName;
    const formattedSubtitle = subtitle
      ? prefixValue(subtitle, brandName)
      : brandName || undefined;

    const formattedDescription = description || formattedSubtitle || undefined;

    return {
      title: formattedTitle,
      subtitle: formattedSubtitle,
      description: formattedDescription,
    };
  }

  return {
    routeHistory,
    getLastRoute,
    getRouteAt,
    goToPreviousRoute,
    formatSeoMeta,
  };
}
