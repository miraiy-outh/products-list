import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

export const TableCheckbox = styled(Checkbox)(() => ({
  padding: 0,
  width: 22,
  height: 22,
  "& .MuiSvgIcon-root": {
    borderRadius: 4,
    width: 22,
    height: 22,
    backgroundColor: "white",
    border: "1px solid #B2B3B9",
  },
  "& .MuiSvgIcon-root path": {
    display: "none",
  },
  "&.Mui-checked .MuiSvgIcon-root": {
    backgroundColor: "var(--accent2)",
    border: "none",
  },
}));
