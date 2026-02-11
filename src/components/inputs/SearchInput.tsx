import { IconButton, OutlinedInput, type CSSProperties } from "@mui/material";
import { SearchIcon } from "../icons/SearchIcon";
import { ClearIcon } from "../icons/ClearIcon";

const inputStyle: CSSProperties = {
  gap: "8px",
  fontSize: "14px",
  color: "var(--text-color)",
  padding: "12px 20px",
  fontWeight: 300,
  fontFamily: `"Inter", Arial, sans-serif`,
  lineHeight: "24px",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "1023px",
  height: "48px",
  backgroundColor: "#F3F3F3",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#CFCFCF",
    borderWidth: "1px",
  },
  "& input::placeholder": {
    color: "#999999",
    opacity: 1,
    fontWeight: 300,
    fontSize: "14px",
  },
};

type TProps = {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const SearchInput = ({ value, setValue }: TProps) => {
  return (
    <OutlinedInput
      id={"search"}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder="Найти"
      startAdornment={<SearchIcon />}
      endAdornment={
        value && (
          <IconButton onClick={() => setValue("")} edge="end">
            <ClearIcon currentColor="#999999" />
          </IconButton>
        )
      }
      sx={inputStyle}
    />
  );
};
