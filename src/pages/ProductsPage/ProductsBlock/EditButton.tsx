import type { CSSProperties } from "@mui/material";
import Button from "@mui/material/Button";
import { PlusIcon } from "../../../components/icons/PlusIcon";

const style: CSSProperties = {
  border: "none",
  borderRadius: "23px",
  padding: "1.5px 14px",
  width: "fit-content",
  height: "27px",
};

export const EditButton = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  return (
    <Button variant="contained" onClick={handleClick} sx={style}>
      <PlusIcon />
    </Button>
  );
};
