import Card from "@mui/material/Card";
import { AuthButton } from "./AuthButton";
import { IconButton, Paper, type CSSProperties } from "@mui/material";
import styles from "./styles.module.css";
import { TextInput } from "../../components/inputs/TextInput/TextInput";
import { useEffect, useState } from "react";
import { UserIcon } from "../../components/icons/UserIcon";
import { ClearIcon } from "../../components/icons/ClearIcon";
import { LogoIcon } from "../../components/icons/LogoIcon";
import { AuthCheckbox } from "./AuthCheckbox";
import { DividerWithText } from "./DividerWithText";
import { PasswordInput } from "../../components/inputs/PasswordInput";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY, login } from "../../services/auth";
const paperStyle: CSSProperties = {
  padding: "6px 16px",
  borderRadius: "40px",
  border: "none",
  boxShadow: "0 24px 32px rgba(0,0,0,0.04)",
  width: "527px",
};

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  padding: "48px",
  border: "1px solid #ededed",
  borderRadius: "34px",
  boxShadow: "none",
  background: "linear-gradient(rgba(35, 35, 35, 0.03), rgba(35, 35, 35, 0))",
};

export const AuthPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loginError, setLoginError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (username === undefined || password === undefined) {
      setLoginError(username === undefined);
      setPasswordError(password === undefined);
      return;
    }

    setLoading(true);
    try {
      await login(username, password, isChecked);
      navigate("/products");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToRegistration = () => {
    // переход на страницу создания аккаунта
  };

  useEffect(() => {
    if (
      localStorage.getItem(AUTH_TOKEN_KEY) ||
      sessionStorage.getItem(AUTH_TOKEN_KEY)
    ) {
      navigate("/products", { replace: true });
    }
  }, []);
  return (
    <div className={styles.paperContainer}>
      <Paper variant="outlined" sx={paperStyle}>
        <Card sx={cardStyle}>
          <div className={styles.header}>
            <LogoIcon />
            <h1>Добро пожаловать!</h1>
            <p className={styles.subtitle}>Пожалуйста, авторизируйтесь</p>
          </div>
          <div className={styles.mainContent}>
            <div className={styles.inputsContainer}>
              <TextInput
                label="Логин"
                id="username"
                error={loginError}
                setError={setLoginError}
                value={username}
                icon={<UserIcon />}
                endIcon={
                  username ? (
                    <IconButton onClick={() => setUsername("")} edge="end">
                      <ClearIcon />
                    </IconButton>
                  ) : undefined
                }
                setValue={setUsername}
              />
              <PasswordInput
                error={passwordError}
                setError={setPasswordError}
                value={password}
                setValue={setPassword}
              />
            </div>
            <AuthCheckbox value={isChecked} setValue={setIsChecked} />
            <AuthButton onClick={handleAuth} disabled={loading} />
            <DividerWithText />
          </div>
          <p className={styles.text}>
            Нет аккаунта?{" "}
            <span
              className={styles.regText}
              onClick={handleNavigateToRegistration}
            >
              Создать
            </span>
          </p>
        </Card>
      </Paper>
    </div>
  );
};
