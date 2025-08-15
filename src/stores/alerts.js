import { writable } from "svelte/store";


export const showAlert = writable(false);
export const alertMessage = writable("");
export const alertTitle = writable("");
export const alertType = writable("info");

export function triggerAlert(type = "info", title = "", message = "") {
  alertMessage.set(message);
  alertTitle.set(title);
  alertType.set(type);
  showAlert.set(true);

  setTimeout(() => {
    showAlert.set(false);
  }, 5000);
}
