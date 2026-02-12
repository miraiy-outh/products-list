import axios from "axios";
import { toast } from "react-toastify";

const URL = "https://dummyjson.com";

export const instanceApi = axios.create({
  baseURL: URL,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

export const handleHttpError = (status: number) => {
  switch (status) {
    case 400:
      toast.error("Некорректный запрос. Проверьте введённые данные.");
      break;
    case 401:
      toast.error("Ваша сессия истекла. Пожалуйста, авторизуйтесь еще раз.");
      break;
    case 403:
      toast.error("Недостаточно прав для этого действия.");
      break;
    case 404:
      toast.error("Запрашиваемая информация не найдена.");
      break;
    case 500:
      toast.error(
        "Непредвиденная ошибка сервера. Пожалуйста, попробуйте позже.",
      );
      break;
    case 502:
      toast.error("Сервис временно недоступен. Пожалуйста, попробуйте позже.");
      break;
    case 503:
      toast.error("Сервис находится на техническом обслуживании.");
      break;
    default:
      toast.error(
        `Произошла ошибка (${status}). Пожалуйста, попробуйте позже.`,
      );
  }
};
