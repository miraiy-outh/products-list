import axios from "axios";
import { toast } from "react-toastify";

const URL = "https://dummyjson.com";
export const AUTH_TOKEN_KEY = "authToken";

export const saveToken = (token: string | undefined, remember: boolean) => {
  console.log("saveToken", token);

  if (token === undefined) return;

  if (remember) {
    console.log("remember");
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

export const getToken = () => {
  return (
    localStorage.getItem(AUTH_TOKEN_KEY) ||
    sessionStorage.getItem(AUTH_TOKEN_KEY)
  );
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = getToken();

  console.log("isAuthenticated", token);
  if (!token) return false;

  try {
    const res = await axios.get(`${URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return !!res.data;
  } catch (err: any) {
    console.error("Token check failed:", err.response?.data || err.message);
    removeToken();
    return false;
  }
};

export const login = async (
  username: string,
  password: string,
  remember: boolean,
) => {
  try {
    const res = await axios.post(
      `${URL}/auth/login`,
      {
        username,
        password,
        expiresInMins: 30,
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const token = res.data.accessToken;
    console.log("token 1", token);
    if (token) saveToken(token, remember);
    console.log("Login response:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("Login error", err.response?.data || err.message);
    throw err;
  }
};

export const handleHttpError = (status: number) => {
  switch (status) {
    case 400:
      toast.error("Некорректный запрос. Проверьте введённые данные.");
      break;
    case 401:
      toast.error("Ваша сессия истекла. Пожалуйста, авторизуйтесь еще раз.");
      removeToken();
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
