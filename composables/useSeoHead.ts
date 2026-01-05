import {useNavigation} from "~/composables/useNavigation";

/**
 * Composable universel pour gérer les metas avec les bons préfixes.
 * Utilise useHead() + useSeoMeta() combinés.
 */

export function useSeoHead(options: {
    title?: string;
    subtitle?: string;
    description?: string;
    forcePrefix?: boolean;
}) {

    const {formatSeoMeta} = useNavigation();
    const { title, subtitle, description } = formatSeoMeta(options);

    useHead({
        title,
        meta: [
            { name: "subtitle", content: subtitle },
        ],
    });

    useSeoMeta({
        title,
        ogTitle: title,
        description,
        ogDescription: description,
    });

    return { title, subtitle, description };
}
