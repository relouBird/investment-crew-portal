import mitt from 'mitt';
import type { EventsProps } from '~/types';

// Création de l'instance mitt
const emitter = mitt<EventsProps>()

  // Pluging bus d'événements global
export default defineNuxtPlugin((nuxtApp) => {


    // Ajoute l'instance à l'app Nuxt pour un accès global
    nuxtApp.provide('emitter', emitter)
});