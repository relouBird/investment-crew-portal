type NotificationStoreType = {
  color: "error" | "success";
  message: string | null;
  timeout: number;
  visible: boolean;
  options: any;
};
export const useNotificationStore = defineStore("notification-store", {
  state: () =>
    <NotificationStoreType>{
      color: "error",
      message: null,
      timeout: 5000,
      visible: false,
      options: {},
    },
  getters: {
    getNotification(state) {
      return state;
    },

    isVisible(state) {
      return state.visible;
    },
  },
  actions: {
    close() {
      this.visible = false;
    },
    show() {
      this.visible = true;
    },
    setNotification(config: any) {
      this.message = config.message ?? "";
      this.color = config.color ?? "success";
      this.timeout = config.timeout ?? 5000;
      // this.visible = config.visible ?? true;
      if ("options" in config) {
      }
    },
  },
});
