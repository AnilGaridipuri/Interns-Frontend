import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ToastSuccessMessage = (msg) => {
  toast.success(msg);
};
export const ToastErrorMessage = (msg) => {
  toast.error(msg);
};
export const ToastDefaultMessage = (msg) => {
  toast(msg);
};
export const ToastInfoMessage = (msg) => {
  toast.info(msg);
};
export const ToastDangerMessage = (msg) => {
  toast.error(msg);
};
export const ToastWarnMessage = (msg) => {
  toast.warn(msg);
};
