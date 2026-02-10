import Button from "@mui/material/Button";

const style = {
  textTransform: "capitalize",
  fontSize: "18px",
  padding: "16px",
  fontWeight: 500,
  lineHeight: "120%",
  border: "1px solid var(--lightBlue)",
  borderRadius: "12px",
  width: "100%",
};

export const AuthButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button variant="contained" color="primary" sx={style} onClick={onClick}>
      Войти
    </Button>
  );
};
