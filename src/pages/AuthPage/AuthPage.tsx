import Card from "@mui/material/Card";
import { AuthButton } from "./AuthButton";
import { IconButton, Paper, type CSSProperties } from "@mui/material";
import styles from "./styles.module.css";
import { TextInput } from "../../components/inputs/TextInput/TextInput";
import { useState } from "react";
import { UserIcon } from "../../components/icons/UserIcon";
import { ClearIcon } from "../../components/icons/ClearIcon";
import { LogoIcon } from "../../components/icons/LogoIcon";
import { AuthCheckbox } from "./AuthCheckbox";
import { DividerWithText } from "./DividerWithText";
import { PasswordInput } from "../../components/inputs/PasswordInput";

const paperStyle: CSSProperties = {
  padding: "6px 16px",
  borderRadius: "40px",
  border: "none",
  boxShadow: "0 24px 32px rgba(0,0,0,0.04)",
  width: "527px",
};
// добавить градиент у border
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
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loginError, setLoginError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleAuth = () => {
    const isLoginEmpty = !login?.trim();
    const isPasswordEmpty = !password?.trim();

    setLoginError(isLoginEmpty);
    setPasswordError(isPasswordEmpty);

    if (isLoginEmpty || isPasswordEmpty) return;
  };

  const handleNavigateToRegistration = () => {
    // переход на страницу создания аккаунта
  };

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
                id="login"
                error={loginError}
                setError={setLoginError}
                value={login}
                icon={<UserIcon />}
                endIcon={
                  login ? (
                    <IconButton onClick={() => setLogin("")} edge="end">
                      <ClearIcon />
                    </IconButton>
                  ) : undefined
                }
                setValue={setLogin}
              />
              <PasswordInput
                error={passwordError}
                setError={setPasswordError}
                value={password}
                setValue={setPassword}
              />
            </div>
            <AuthCheckbox value={isChecked} setValue={setIsChecked} />
            <AuthButton onClick={handleAuth} />
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
