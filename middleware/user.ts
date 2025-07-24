import useAuthStore from "~/stores/auth.store";
import { defineNuxtRouteMiddleware, navigateTo } from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  console.log("route actuelle =>", to.path);
  if (
    to.path.includes("enterprise") &&
    auth.type != "Manager" &&
    auth.type != "enterprise"
  ) {
    console.log("case 1");
    return navigateTo("/");
  } else if (
    !to.path.includes("enterprise") &&
    (auth.type == "enterprise" || auth.type == "Manager")
  ) {
    console.log("case 2");
    return navigateTo("/enterprise");
  } else if (
    to.path.includes("enterprise") &&
    to.path.includes("configuration") &&
    auth.is_configuring == false
  ) {
    console.log("case 3");
    return navigateTo("/enterprise");
  } else if (
    to.path.includes("enterprise") &&
    !to.path.includes("configuration") &&
    auth.is_configuring == true
  ) {
    console.log("case 4");
    return navigateTo("/enterprise/configuration/first-step");
  }
});
