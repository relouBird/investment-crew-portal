import useAuthStore from "~/stores/auth.store";
import { defineNuxtRouteMiddleware, navigateTo } from "#app";

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();
  if (auth.expired_at && Date.now() < auth.expired_at) {
    return navigateTo("/");
  }
});
