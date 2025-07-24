import { useNotificationStore } from "~/stores/notification.store";

type NotificationType = {
  color: "error" | "success";
  message: string | null;
  timeout?: number;
  visible: boolean;
};

/**
 * Notifie le frontend en passant par le store (notificationStore)
 * @param message
 * @param color
 * @param config
 */
export const notify = (
  options: NotificationType,
  color: string = "default",
  config: any = {}
) => {
  const useNotification = useNotificationStore();

  if (typeof options === "string") {
    config.message = options;
    config.color = color;
  }
  if (typeof options === "object") {
    config = { ...options };
  }

  useNotification.setNotification(config);

  return useNotification.show();
};
