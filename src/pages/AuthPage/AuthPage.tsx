import Card from "@mui/material/Card";
import { AuthButton } from "./AuthButton";
import { Paper } from "@mui/material";
import styles from "./styles.module.css";

const paperStyle = {
  padding: "6px 16px",
  borderRadius: "40px",
  border: "none",
  boxShadow: "0 24px 32px rgba(0,0,0,0.04)",
  width: "527px",
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  padding: "48px",
  border: "1px solid #ededed",
  borderRadius: "34px",
  background: "linear-gradient(rgba(35, 35, 35, 0.03), rgba(35, 35, 35, 0))",
  boxShadow: "none",
};

export const AuthPage = () => {
  return (
    <div>
      <Paper variant="outlined" sx={paperStyle}>
        <Card sx={cardStyle}>
          <div className={styles.header}>
            <h1>Добро пожаловать!</h1>
            <p className={styles.subtitle}>Пожалуйста, авторизируйтесь</p>
          </div>
          <AuthButton />
        </Card>
      </Paper>
    </div>
  );
};
