import type mitt from "mitt";
import { EventsProps } from ".";

declare module "#app" {
  interface NuxtApp {
    $emitter: ReturnType<typeof mitt<EventsProps>>;
  }
}
