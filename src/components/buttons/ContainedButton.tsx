import type { CSSProperties } from "@mui/material";
import Button from "@mui/material/Button";

const style: CSSProperties = {
  gap: "15px",
  textTransform: "capitalize",
  fontSize: "14px",
  fontFamily: `"Cairo", Arial, sans-serif`,
  padding: "10px 20px",
  fontWeight: 500,
  lineHeight: "120%",
  border: "none",
  borderRadius: "6px",
  width: "fit-content",
  height: "42px",
};

type TProps = {
  onClick: () => void;
  text?: string;
  icon?: React.ReactNode;
};

export const ContainedButton = ({ text, onClick, icon }: TProps) => {
  return (
    <Button variant="contained" onClick={onClick} sx={style}>
      {icon}
      {text}
    </Button>
  );
};
