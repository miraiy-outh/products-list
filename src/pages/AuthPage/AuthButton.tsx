import type { CSSProperties } from "@mui/material";
import Button from "@mui/material/Button";

const style: CSSProperties = {
  textTransform: "capitalize",
  fontSize: "18px",
  padding: "16px",
  fontWeight: 500,
  lineHeight: "120%",
  border: "1px solid var(--lightBlue)",
  borderRadius: "12px",
  width: "100%",
};

export const AuthButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={style}
      onClick={onClick}
      disabled={disabled}
    >
      Войти
    </Button>
  );
};
