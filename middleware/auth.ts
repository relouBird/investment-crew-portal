import useAuthStore from "~/stores/auth.store";
import { defineNuxtRouteMiddleware, navigateTo } from "#app";

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();
  const dat = new Date(auth.expired_at ? auth.expired_at : "");
  const dateNow = new Date();
  console.log("now =>", dateNow.toUTCString());
  console.log("Expire_at =>", dat.toUTCString());
  if (auth.expired_at && Date.now() > auth.expired_at) {
    return navigateTo("/auth/login");
  } else if (!auth.expired_at) {
    return navigateTo("/auth/login");
  }
});
